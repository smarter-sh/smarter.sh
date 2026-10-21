/*
 * Manifest validation for the site's manifest editor: YAML syntax errors, from js-yaml, and the errors of
 * the manifest's JSON Schema, the one that the Smarter platform publishes for its kind. Each error has a
 * position in the YAML, so that the editor can mark it.
 *
 * Ported from the web console's manifest editor (smarter/react/packages/smarter-manifest-editor/src/lib/
 * validation.tsx in github.com/smarter-sh/smarter). The console validates with the cli api, which needs a
 * login. The site validates in the browser with Ajv instead, against the same JSON Schema that the
 * check-jsonschema hook of a manifest repository, e.g. smarter-sh/stackademy, checks on every pull request.
 */
import Ajv2020 from 'ajv/dist/2020'
import {
  CORE_SCHEMA,
  EVENT_ID,
  getScalarValue,
  load,
  parseEvents,
  YAMLException,
} from 'js-yaml'

// YAML 1.2's core schema: a date such as 2024-06-15 stays a string, as it is in JSON, and as Python's
// check-jsonschema sees it.
const YAML_OPTIONS = { schema: CORE_SCHEMA }

/**
 * Parse YAML the way the validation does.
 *
 * @param {string} yaml
 * @returns {unknown}
 */
export const parseYaml = (yaml) => load(yaml, YAML_OPTIONS)

/** The offset of a js-yaml error's mark, from its zero-based line and column. */
const markOffset = (yaml, mark) => {
  if (!mark) return 0
  const lines = yaml.split('\n')
  const line = Math.min(Math.max(mark.line, 0), lines.length - 1)
  const lineStart = lines
    .slice(0, line)
    .reduce((total, text) => total + text.length + 1, 0)
  return lineStart + Math.min(Math.max(mark.column, 0), lines[line].length)
}

/**
 * The YAML's syntax errors: none, or the first one that js-yaml finds.
 *
 * @param {string} yaml
 * @returns {Array<{source: string, message: string, offset: number, loc: string[]}>}
 */
export const syntaxErrors = (yaml) => {
  try {
    parseYaml(yaml)
    return []
  } catch (error) {
    if (error instanceof YAMLException) {
      return [
        {
          source: 'yaml',
          message: error.reason,
          offset: markOffset(yaml, error.mark),
          loc: [],
        },
      ]
    }
    return [{ source: 'yaml', message: String(error), offset: 0, loc: [] }]
  }
}

/**
 * Where each key is in the YAML, by its path, e.g. "spec.config.prompt". A sequence's items are numbered,
 * e.g. "metadata.tags.0". `start` is the offset of the key, `end` the end of its value, if it's a scalar.
 *
 * @param {string} yaml
 * @returns {Map<string, {start: number, end?: number}>}
 */
export const yamlKeys = (yaml) => {
  const keys = new Map()
  let events
  try {
    events = parseEvents(yaml, {})
  } catch {
    return keys
  }
  const stack = []

  // the path of the next value in the innermost container, and record where a sequence item is.
  const nextValuePath = (offset) => {
    const top = stack[stack.length - 1]
    if (!top) return []
    if (top.kind === 'sequence') {
      const path = [...top.path, String(top.index)]
      top.index += 1
      if (!keys.has(path.join('.'))) keys.set(path.join('.'), { start: offset })
      return path
    }
    if (top.key === null) return null // a key, not a value
    const path = [...top.path, top.key]
    top.key = null
    return path
  }

  for (const event of events) {
    if (event.type === EVENT_ID.MAPPING || event.type === EVENT_ID.SEQUENCE) {
      const path = nextValuePath(event.start) ?? []
      stack.push(
        event.type === EVENT_ID.MAPPING
          ? { kind: 'mapping', path, key: null }
          : { kind: 'sequence', path, index: 0 }
      )
    } else if (event.type === EVENT_ID.SCALAR) {
      const top = stack[stack.length - 1]
      if (top?.kind === 'mapping' && top.key === null) {
        // a mapping's key: record where it is.
        top.key = getScalarValue(yaml, event)
        const path = [...top.path, top.key]
        if (!keys.has(path.join('.')))
          keys.set(path.join('.'), { start: event.valueStart })
      } else {
        // a scalar value: record where it ends.
        const path = nextValuePath(event.valueStart)
        const key = path ? keys.get(path.join('.')) : undefined
        if (key && key.end === undefined) key.end = event.valueEnd
      }
    } else if (event.type === EVENT_ID.ALIAS) {
      nextValuePath(0)
    } else if (event.type === EVENT_ID.POP) {
      stack.pop()
    }
  }
  return keys
}

/**
 * The offset of a path in the YAML, or of its nearest parent that is there, or 0.
 *
 * @param {Map<string, {start: number}>} keys - from yamlKeys()
 * @param {string[]} loc
 * @returns {number}
 */
export const locOffset = (keys, loc) => {
  for (let n = loc.length; n > 0; n--) {
    const key = keys.get(loc.slice(0, n).join('.'))
    if (key) return key.start
  }
  return 0
}

/**
 * The path of the key at an offset of the YAML, e.g. ["spec", "connection", "timeout"], or null if no key is
 * there. A sequence item's index isn't a key: hovering over "- name" finds "...parameters.0.name".
 *
 * @param {Map<string, {start: number}>} keys - from yamlKeys()
 * @param {number} offset
 * @returns {string[]|null}
 */
export const pathAt = (keys, offset) => {
  for (const [joined, key] of keys) {
    const path = joined.split('.')
    const last = path[path.length - 1]
    if (/^\d+$/.test(last)) continue
    if (offset >= key.start && offset <= key.start + last.length) return path
  }
  return null
}

// one compiled validator per schema, which Ajv takes a moment to build.
const validators = new WeakMap()
const validatorFor = (schema) => {
  if (!validators.has(schema)) {
    const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false })
    validators.set(schema, ajv.compile(schema))
  }
  return validators.get(schema)
}

/** "/spec/config/prompt" as ["spec", "config", "prompt"]. */
const instanceLoc = (instancePath) =>
  instancePath
    .split('/')
    .slice(1)
    .map((part) => part.replaceAll('~1', '/').replaceAll('~0', '~'))

/**
 * Ajv's errors, as a reader would want them: one per path, with "must be number" and "must be null" of an
 * anyOf said once, as "must be a number or null", and the path in front, e.g.
 * "spec.config.prompt.defaultTemperature must be a number or null".
 */
const readableErrors = (errors) => {
  const byPath = new Map()
  for (const error of errors) {
    if (!byPath.has(error.instancePath)) byPath.set(error.instancePath, [])
    byPath.get(error.instancePath).push(error)
  }
  const paths = [...byPath.keys()]
  const result = []
  for (const [instancePath, group] of byPath) {
    const loc = instanceLoc(instancePath)
    const where = loc.length ? loc.join('.') : 'The manifest'
    const enums = group.filter((e) => e.keyword === 'enum' || e.keyword === 'const')
    const others = group.filter(
      (e) => !['type', 'anyOf', 'enum', 'const'].includes(e.keyword)
    )
    let types = group.filter((e) => e.keyword === 'type').map((e) => e.params.type)
    // "an object or null", where the object has a more specific error, here or deeper: not "must be null".
    const deeper = paths.some((p) => p.startsWith(`${instancePath}/`))
    if (deeper || others.length || enums.length) types = types.filter((t) => t !== 'null')
    if (deeper && !types.length && !enums.length && !others.length) continue
    if (types.length) {
      const named = types.map((t) =>
        t === 'null' ? 'null' : `a${/^[aeiou]/.test(t) ? 'n' : ''} ${t}`
      )
      result.push({ loc, message: `${where} must be ${named.join(' or ')}` })
    } else if (enums.length) {
      const allowed = enums.flatMap((e) =>
        e.keyword === 'const' ? [e.params.allowedValue] : e.params.allowedValues
      )
      result.push({ loc, message: `${where} must be one of: ${allowed.join(', ')}` })
    }
    for (const error of others) {
      if (error.keyword === 'required') {
        result.push({
          loc,
          message: `${where} is missing ${error.params.missingProperty}, which is required`,
        })
      } else if (error.keyword === 'additionalProperties') {
        result.push({
          loc: [...loc, error.params.additionalProperty],
          message: `${where} has an unknown key, ${error.params.additionalProperty}`,
        })
      } else {
        result.push({ loc, message: `${where} ${error.message}` })
      }
    }
    if (!types.length && !enums.length && !others.length) {
      result.push({ loc, message: `${where} is not valid` })
    }
  }
  return result
}

/**
 * The errors of a manifest against its kind's JSON Schema.
 *
 * @param {string} yaml - the manifest's YAML, whose syntax is valid
 * @param {object} schema - the kind's JSON Schema
 * @returns {Array<{source: string, message: string, offset: number, loc: string[]}>}
 */
export const schemaErrors = (yaml, schema) => {
  const validate = validatorFor(schema)
  if (validate(parseYaml(yaml))) return []
  const keys = yamlKeys(yaml)
  return readableErrors(validate.errors ?? [])
    .map(({ loc, message }) => ({
      source: 'schema',
      message,
      offset: locOffset(keys, loc),
      loc,
    }))
    .sort((a, b) => a.offset - b.offset)
}

/** A schema with its $ref resolved against the root schema's $defs. */
const deref = (root, schema) => {
  let current = schema
  for (let i = 0; current?.$ref && i < 20; i++) {
    const name = current.$ref.replace(/^#\/\$defs\//, '')
    current = root.$defs?.[name]
  }
  return current
}

/** The branch of an anyOf (e.g. "an object or null") that describes a key or an item. */
const branchWith = (root, schema, test) => {
  const resolved = deref(root, schema)
  if (!resolved) return null
  if (test(resolved)) return resolved
  for (const option of resolved.anyOf ?? resolved.oneOf ?? resolved.allOf ?? []) {
    const branch = branchWith(root, option, test)
    if (branch) return branch
  }
  return null
}

/**
 * What a manifest's key means, from the description of its property in the kind's JSON Schema, e.g.
 * {title: "Timeout", description: "The timeout for the connection in seconds."}, or null if the schema
 * doesn't describe it, e.g. an annotation's key, which is the author's own.
 *
 * @param {object} schema - the kind's JSON Schema
 * @param {string[]} path - e.g. ["spec", "connection", "timeout"]
 * @returns {{title?: string, description: string}|null}
 */
export const describePath = (schema, path) => {
  let node = schema
  let property = null
  for (const part of path) {
    if (/^\d+$/.test(part)) {
      node = branchWith(schema, node, (s) => s.items)?.items
    } else {
      const parent = branchWith(schema, node, (s) => s.properties?.[part])
      property = parent?.properties?.[part]
      node = property
    }
    if (!node) return null
  }
  const description = property?.description ?? deref(schema, property)?.description
  if (!description) return null
  return { title: property.title, description }
}

/** "LLMClient.spec.prompt.temperature[float]. Optional. The..." as its type, and the text after it. */
export const splitDescription = (description) => {
  const text = description.replace(/\s+/g, ' ').trim()
  const match = text.match(/^[\w.]+\[([^\]]+)\][.:]\s*(.*)$/)
  return match ? { type: match[1], text: match[2] } : { type: null, text }
}
