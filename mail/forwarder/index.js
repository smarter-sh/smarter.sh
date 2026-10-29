/*---------------------------------------------------------
 * Forwards mail that SES receives for @smarter.sh to the
 * inboxes in FORWARD_TO.
 *
 * SES saves each message to S3, then invokes this function
 * with the message's id. The function reads the raw message,
 * rewrites its sender, and sends it on with SES.
 *
 * The sender has to change: SES only sends from verified
 * identities, and a message forwarded with its original From
 * fails the sender's DMARC check at the destination. So From
 * becomes "<original name> via smarter.sh" <FORWARDER_ADDRESS>,
 * and Reply-To keeps the original sender, so that a reply goes
 * to them.
 *
 * Deployed by mail/terraform. See mail/README.md.
 *---------------------------------------------------------*/

// Headers that belong to the original delivery. SES writes its own, and a copied
// DKIM-Signature no longer matches the rewritten message.
const DROPPED_HEADERS = ['return-path', 'sender', 'message-id', 'dkim-signature']

export function readConfig(env) {
  const forwardTo = (env.FORWARD_TO || '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
  const config = {
    forwardTo,
    forwarder: (env.FORWARDER_ADDRESS || '').trim().toLowerCase(),
    bucket: env.MAIL_BUCKET || '',
    prefix: env.MAIL_PREFIX ?? 'inbox/',
    label: env.FORWARD_LABEL || 'smarter.sh',
  }
  if (!config.forwardTo.length || !config.forwarder || !config.bucket) {
    throw new Error('FORWARD_TO, FORWARDER_ADDRESS and MAIL_BUCKET must be set')
  }
  return config
}

// The header block ends at the first empty line. The message is handled as a latin1
// string, so every byte survives the round trip, whatever the message's encoding.
export function splitMessage(raw) {
  const match = /\r?\n\r?\n/.exec(raw)
  if (!match) return { header: raw, separator: '\r\n\r\n', body: '' }
  return {
    header: raw.slice(0, match.index),
    separator: match[0],
    body: raw.slice(match.index + match[0].length),
  }
}

// Each field keeps its original lines, including folded continuation lines, so that
// fields this function doesn't change are copied exactly.
export function parseHeaders(header) {
  const fields = []
  for (const line of header.split(/\r?\n/)) {
    if (/^[ \t]/.test(line) && fields.length) {
      fields[fields.length - 1].lines.push(line)
    } else if (line.includes(':')) {
      fields.push({
        name: line.slice(0, line.indexOf(':')).trim().toLowerCase(),
        lines: [line],
      })
    }
  }
  return fields
}

export function fieldValue(field) {
  const unfolded = field.lines.join('')
  return unfolded.slice(unfolded.indexOf(':') + 1).trim()
}

// Reads "Jane Doe" <jane@example.com>, Jane <jane@example.com> or jane@example.com.
export function parseAddress(value) {
  const angle = /^(.*)<([^>]+)>\s*$/.exec(value)
  if (!angle) return { name: '', address: value.replace(/\s*\(.*\)\s*$/, '').trim() }
  let name = angle[1].trim()
  if (name.startsWith('"') && name.endsWith('"') && name.length >= 2) {
    name = name.slice(1, -1).replace(/\\(.)/g, '$1')
  }
  return { name, address: angle[2].trim() }
}

export function formatFrom(original, forwarder, label) {
  const name = original?.name || original?.address || 'unknown sender'
  // An RFC 2047 encoded word (=?UTF-8?B?...?=) is not allowed inside quotes.
  if (/=\?[^?]+\?[bBqQ]\?[^?]*\?=/.test(name))
    return `${name} via ${label} <${forwarder}>`
  const quoted = `${name} via ${label}`.replace(/(["\\])/g, '\\$1')
  return `"${quoted}" <${forwarder}>`
}

export function rewriteMessage(raw, { forwarder, label }) {
  const { header, separator, body } = splitMessage(raw)
  const eol = separator.startsWith('\r') ? '\r\n' : '\n'
  const fields = parseHeaders(header)
  const fromField = fields.find((field) => field.name === 'from')
  const original = fromField ? parseAddress(fieldValue(fromField)) : null
  const hasReplyTo = fields.some((field) => field.name === 'reply-to')

  const lines = []
  for (const field of fields) {
    if (DROPPED_HEADERS.includes(field.name)) continue
    if (field === fromField) {
      lines.push(`From: ${formatFrom(original, forwarder, label)}`)
      if (!hasReplyTo) lines.push(`Reply-To: ${fieldValue(fromField)}`)
      continue
    }
    lines.push(...field.lines)
  }
  if (!fromField) lines.unshift(`From: ${formatFrom(null, forwarder, label)}`)

  return {
    raw: lines.join(eol) + separator + body,
    originalFrom: original?.address || '',
  }
}

// deps.getMessage(bucket, key) resolves to a Buffer, and deps.sendRaw({ source,
// destinations, data }) sends one. They are injected so tests run without AWS.
export function createHandler(deps, env = process.env) {
  return async (event) => {
    const config = readConfig(env)
    const ses = event?.Records?.[0]?.ses
    if (!ses) throw new Error('Not an SES receipt event')
    const { mail, receipt } = ses

    // SES scans each message (the receipt rule's scan_enabled). Failed messages stay
    // in S3 and are not forwarded.
    if (
      receipt.virusVerdict?.status === 'FAIL' ||
      receipt.spamVerdict?.status === 'FAIL'
    ) {
      console.log(`mail.forwarder: dropped ${mail.messageId}, spam or virus`)
      return { forwarded: false, reason: 'spam or virus', messageId: mail.messageId }
    }

    // Bounces of forwarded mail come back to the forwarder address. Forwarding them
    // again could loop, so they are kept in S3 only.
    const recipients = receipt.recipients.filter(
      (address) => address.toLowerCase() !== config.forwarder
    )
    if (!recipients.length) {
      console.log(`mail.forwarder: kept ${mail.messageId}, sent to the forwarder address`)
      return { forwarded: false, reason: 'forwarder address', messageId: mail.messageId }
    }

    const raw = await deps.getMessage(config.bucket, config.prefix + mail.messageId)
    const { raw: rewritten } = rewriteMessage(raw.toString('latin1'), config)
    await deps.sendRaw({
      source: config.forwarder,
      destinations: config.forwardTo,
      data: Buffer.from(rewritten, 'latin1'),
    })
    console.log(`mail.forwarder: forwarded ${mail.messageId}`)
    return { forwarded: true, messageId: mail.messageId }
  }
}

// The Lambda Node.js runtime includes the AWS SDK v3, so nothing is bundled. The
// imports are lazy so the tests, which inject their own deps, never load it.
const awsDeps = {
  async getMessage(bucket, key) {
    const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3')
    const response = await new S3Client({}).send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    )
    return Buffer.from(await response.Body.transformToByteArray())
  },
  async sendRaw({ source, destinations, data }) {
    const { SESClient, SendRawEmailCommand } = await import('@aws-sdk/client-ses')
    await new SESClient({}).send(
      new SendRawEmailCommand({
        Source: source,
        Destinations: destinations,
        RawMessage: { Data: data },
      })
    )
  },
}

export const handler = createHandler(awsDeps)
