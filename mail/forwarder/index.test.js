/**
 * @jest-environment node
 */
import {
  createHandler,
  formatFrom,
  parseAddress,
  parseHeaders,
  readConfig,
  rewriteMessage,
} from './index.js'

const env = {
  FORWARD_TO: 'me@example.com, team@example.org',
  FORWARDER_ADDRESS: 'forwarder@smarter.sh',
  MAIL_BUCKET: 'inbound-mail',
}
const options = { forwarder: 'forwarder@smarter.sh', label: 'smarter.sh' }

const message = [
  'Return-Path: <bounce@example.net>',
  'DKIM-Signature: v=1; a=rsa-sha256; d=example.net;',
  '\tb=abc123',
  'From: "Jane Doe" <jane@example.net>',
  'To: hello@smarter.sh',
  'Subject: A long subject',
  ' that is folded',
  'Message-ID: <1@example.net>',
  'Content-Type: text/plain; charset=utf-8',
  '',
  'Hello.',
  '',
  'Second paragraph.',
].join('\r\n')

function sesEvent({
  recipients = ['hello@smarter.sh'],
  spam = 'PASS',
  virus = 'PASS',
} = {}) {
  return {
    Records: [
      {
        ses: {
          mail: { messageId: 'abc123' },
          receipt: {
            recipients,
            spamVerdict: { status: spam },
            virusVerdict: { status: virus },
          },
        },
      },
    ],
  }
}

describe('readConfig', () => {
  it('reads a comma-separated list of inboxes', () => {
    expect(readConfig(env)).toEqual({
      forwardTo: ['me@example.com', 'team@example.org'],
      forwarder: 'forwarder@smarter.sh',
      bucket: 'inbound-mail',
      prefix: 'inbox/',
      label: 'smarter.sh',
    })
  })

  it('refuses to run without its settings', () => {
    expect(() => readConfig({})).toThrow(/FORWARD_TO/)
  })
})

describe('parseAddress', () => {
  it.each([
    ['"Jane Doe" <jane@example.net>', { name: 'Jane Doe', address: 'jane@example.net' }],
    ['Jane <jane@example.net>', { name: 'Jane', address: 'jane@example.net' }],
    ['jane@example.net', { name: '', address: 'jane@example.net' }],
    ['jane@example.net (Jane)', { name: '', address: 'jane@example.net' }],
    ['"Say \\"hi\\"" <a@b.c>', { name: 'Say "hi"', address: 'a@b.c' }],
  ])('reads %s', (value, expected) => {
    expect(parseAddress(value)).toEqual(expected)
  })
})

describe('formatFrom', () => {
  it('quotes the display name', () => {
    expect(
      formatFrom({ name: 'Jane', address: 'j@x.y' }, 'f@smarter.sh', 'smarter.sh')
    ).toBe('"Jane via smarter.sh" <f@smarter.sh>')
  })

  it('falls back to the address when there is no name', () => {
    expect(formatFrom({ name: '', address: 'j@x.y' }, 'f@smarter.sh', 'smarter.sh')).toBe(
      '"j@x.y via smarter.sh" <f@smarter.sh>'
    )
  })

  it('leaves an encoded name unquoted', () => {
    expect(
      formatFrom({ name: '=?UTF-8?B?SsO8cmdlbg==?=' }, 'f@smarter.sh', 'smarter.sh')
    ).toBe('=?UTF-8?B?SsO8cmdlbg==?= via smarter.sh <f@smarter.sh>')
  })
})

describe('rewriteMessage', () => {
  const { raw, originalFrom } = rewriteMessage(message, options)
  const fields = parseHeaders(raw.split('\r\n\r\n')[0])
  const names = fields.map((field) => field.name)

  it('sends from the forwarder address and replies to the sender', () => {
    expect(raw).toContain('From: "Jane Doe via smarter.sh" <forwarder@smarter.sh>\r\n')
    expect(raw).toContain('Reply-To: "Jane Doe" <jane@example.net>\r\n')
    expect(originalFrom).toBe('jane@example.net')
  })

  it('drops the headers of the original delivery', () => {
    expect(names).not.toContain('return-path')
    expect(names).not.toContain('dkim-signature')
    expect(names).not.toContain('message-id')
    expect(raw).not.toContain('b=abc123')
  })

  it('keeps the other headers, folded lines and body exactly', () => {
    expect(raw).toContain('Subject: A long subject\r\n that is folded\r\n')
    expect(raw).toContain('To: hello@smarter.sh\r\n')
    expect(raw.endsWith('\r\n\r\nHello.\r\n\r\nSecond paragraph.')).toBe(true)
  })

  it('keeps an existing Reply-To', () => {
    const withReplyTo = message.replace(
      'To: hello',
      'Reply-To: list@example.net\r\nTo: hello'
    )
    const result = rewriteMessage(withReplyTo, options).raw
    expect(result.match(/^Reply-To:/gm)).toHaveLength(1)
    expect(result).toContain('Reply-To: list@example.net')
  })

  it('handles messages with bare LF line endings', () => {
    const result = rewriteMessage(message.replace(/\r\n/g, '\n'), options).raw
    expect(result).toContain('From: "Jane Doe via smarter.sh" <forwarder@smarter.sh>\n')
    expect(result).not.toContain('\r')
  })
})

describe('handler', () => {
  function setup() {
    const deps = {
      getMessage: jest.fn().mockResolvedValue(Buffer.from(message, 'latin1')),
      sendRaw: jest.fn().mockResolvedValue({}),
    }
    jest.spyOn(console, 'log').mockImplementation(() => {})
    return { deps, handler: createHandler(deps, env) }
  }

  afterEach(() => jest.restoreAllMocks())

  it('reads the message from S3 and forwards it', async () => {
    const { deps, handler } = setup()
    await expect(handler(sesEvent())).resolves.toEqual({
      forwarded: true,
      messageId: 'abc123',
    })
    expect(deps.getMessage).toHaveBeenCalledWith('inbound-mail', 'inbox/abc123')
    const sent = deps.sendRaw.mock.calls[0][0]
    expect(sent.source).toBe('forwarder@smarter.sh')
    expect(sent.destinations).toEqual(['me@example.com', 'team@example.org'])
    expect(sent.data.toString('latin1')).toContain('<forwarder@smarter.sh>')
  })

  it('keeps every byte of a non-UTF-8 body', async () => {
    const { deps, handler } = setup()
    const bytes = Buffer.concat([
      Buffer.from(message + '\r\n'),
      Buffer.from([0xe9, 0xff]),
    ])
    deps.getMessage.mockResolvedValue(bytes)
    await handler(sesEvent())
    const sent = deps.sendRaw.mock.calls[0][0].data
    expect([...sent.subarray(-2)]).toEqual([0xe9, 0xff])
  })

  it.each([
    ['spam', { spam: 'FAIL' }],
    ['a virus', { virus: 'FAIL' }],
  ])('does not forward %s', async (_label, verdicts) => {
    const { deps, handler } = setup()
    const result = await handler(sesEvent(verdicts))
    expect(result.forwarded).toBe(false)
    expect(deps.sendRaw).not.toHaveBeenCalled()
  })

  it('does not forward mail sent to the forwarder address, such as bounces', async () => {
    const { deps, handler } = setup()
    const result = await handler(sesEvent({ recipients: ['Forwarder@smarter.sh'] }))
    expect(result.reason).toBe('forwarder address')
    expect(deps.getMessage).not.toHaveBeenCalled()
  })

  it('rejects an event that is not from SES', async () => {
    const { handler } = setup()
    await expect(handler({})).rejects.toThrow(/SES/)
  })
})
