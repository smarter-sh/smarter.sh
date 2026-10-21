import fs from 'fs'
import path from 'path'
import {
  describePath,
  locOffset,
  pathAt,
  schemaErrors,
  syntaxErrors,
  yamlKeys,
} from './validation'

// A JSON Schema shaped like the ones that Pydantic writes for the SAM kinds: $defs, $refs and anyOf with null.
const schema = {
  $defs: {
    Metadata: {
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name', description: 'name[String]: The name.' },
        description: { type: 'string', description: 'What it is for.' },
        tags: { anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'null' }] },
      },
      required: ['name', 'description'],
    },
    Prompt: {
      type: 'object',
      properties: {
        temperature: {
          anyOf: [{ type: 'number' }, { type: 'null' }],
          description: 'How creative the model may be.',
        },
        provider: { enum: ['openai', 'googleai'], description: 'The AI vendor.' },
      },
      additionalProperties: false,
    },
  },
  type: 'object',
  properties: {
    apiVersion: { type: 'string', description: 'The format.' },
    kind: { type: 'string' },
    metadata: { $ref: '#/$defs/Metadata', description: 'What it is called.' },
    spec: {
      type: 'object',
      properties: {
        prompt: { anyOf: [{ $ref: '#/$defs/Prompt' }, { type: 'null' }] },
        parameters: {
          type: 'array',
          items: {
            type: 'object',
            properties: { name: { type: 'string', description: 'A parameter name.' } },
          },
        },
      },
    },
  },
  required: ['apiVersion', 'kind', 'metadata'],
}

const valid = `apiVersion: smarter.sh/v1
kind: Example
metadata:
  name: example
  description: An example.
  tags:
    - one
spec:
  prompt:
    temperature: 1.0
    provider: openai
  parameters:
    - name: max_cost
`

describe('syntaxErrors', () => {
  test('valid YAML has none', () => {
    expect(syntaxErrors(valid)).toEqual([])
  })

  test('invalid YAML has one, where it is', () => {
    const yaml = 'a: 1\nb: [unclosed\n'
    const [error] = syntaxErrors(yaml)
    expect(error.source).toBe('yaml')
    expect(error.offset).toBeGreaterThan(4)
  })
})

describe('yamlKeys and pathAt', () => {
  test('find each key by its path', () => {
    const keys = yamlKeys(valid)
    expect(keys.get('metadata.name').start).toBe(valid.indexOf('name: example'))
    expect(keys.get('metadata.name').end).toBe(valid.indexOf('name: example') + 13)
    expect(keys.has('metadata.tags.0')).toBe(true)
    expect(keys.has('spec.parameters.0.name')).toBe(true)
  })

  test('a key under the cursor', () => {
    const keys = yamlKeys(valid)
    const offset = valid.indexOf('temperature') + 3
    expect(pathAt(keys, offset)).toEqual(['spec', 'prompt', 'temperature'])
    expect(pathAt(keys, valid.indexOf('max_cost'))).toBeNull()
    expect(pathAt(keys, valid.indexOf('- name: max') + 3)).toEqual([
      'spec',
      'parameters',
      '0',
      'name',
    ])
  })

  test('the offset of a path, or of its nearest parent', () => {
    const keys = yamlKeys(valid)
    expect(locOffset(keys, ['spec', 'prompt', 'nope'])).toBe(valid.indexOf('prompt:'))
    expect(locOffset(keys, ['nothing'])).toBe(0)
  })

  test('invalid YAML has no keys', () => {
    expect(yamlKeys('a: [').size).toBe(0)
  })
})

describe('schemaErrors', () => {
  test('a valid manifest has none', () => {
    expect(schemaErrors(valid, schema)).toEqual([])
  })

  test('a wrong type, said once for an anyOf', () => {
    const errors = schemaErrors(
      valid.replace('temperature: 1.0', 'temperature: hot'),
      schema
    )
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toBe('spec.prompt.temperature must be a number or null')
    expect(errors[0].loc).toEqual(['spec', 'prompt', 'temperature'])
  })

  test('a missing required key, at its parent', () => {
    const yaml = valid.replace('  description: An example.\n', '')
    const [error] = schemaErrors(yaml, schema)
    expect(error.message).toBe('metadata is missing description, which is required')
    expect(error.offset).toBe(yaml.indexOf('metadata:'))
  })

  test('a value that is not one of those allowed', () => {
    const [error] = schemaErrors(
      valid.replace('provider: openai', 'provider: acme'),
      schema
    )
    expect(error.message).toBe('spec.prompt.provider must be one of: openai, googleai')
  })

  test('an unknown key', () => {
    const [error] = schemaErrors(valid.replace('provider:', 'providr:'), schema)
    expect(error.message).toBe('spec.prompt has an unknown key, providr')
  })

  test('a date stays a string, as in JSON', () => {
    expect(
      schemaErrors(valid.replace('name: example', 'name: 2024-06-15'), schema)
    ).toEqual([])
  })
})

describe('describePath', () => {
  test("a key's description, through $refs, anyOf and arrays", () => {
    expect(describePath(schema, ['metadata', 'name'])).toEqual({
      title: 'Name',
      description: 'name[String]: The name.',
    })
    expect(describePath(schema, ['metadata'])).toEqual({
      title: undefined,
      description: 'What it is called.',
    })
    expect(describePath(schema, ['spec', 'prompt', 'temperature']).description).toBe(
      'How creative the model may be.'
    )
    expect(describePath(schema, ['spec', 'parameters', '0', 'name']).description).toBe(
      'A parameter name.'
    )
  })

  test('nothing for an undescribed or unknown key', () => {
    expect(describePath(schema, ['kind'])).toBeNull()
    expect(describePath(schema, ['spec', 'nope'])).toBeNull()
    expect(describePath(schema, ['metadata', 'tags', '0', 'x'])).toBeNull()
  })
})

// The real thing, when the smarter repository is checked out next to this one: every Stackademy
// manifest is valid against the platform's published schema, and its keys are described.
const SAM = path.resolve(
  __dirname,
  '../../../../smarter/smarter/smarter/apps/api/v1/contract/sam'
)
const STACKADEMY = path.resolve(__dirname, '../../../../stackademy')
const local = fs.existsSync(SAM) && fs.existsSync(STACKADEMY)
;(local ? describe : describe.skip)('the Stackademy manifests', () => {
  test.each([
    ['llm-clients/stackademy-sql.yaml', 'LLMClient'],
    ['plugins/sql/stackademy-sql.yaml', 'SqlPlugin'],
    ['connections/api/smarter-test-api.yaml.tpl', 'ApiConnection'],
    ['budgets/stackademy-project.yaml', 'Budget'],
  ])('%s is a valid %s', (file, kind) => {
    const real = JSON.parse(fs.readFileSync(`${SAM}/${kind}.schema.json`, 'utf8'))
    const yaml = fs.readFileSync(`${STACKADEMY}/${file}`, 'utf8')
    expect(schemaErrors(yaml, real)).toEqual([])
    expect(describePath(real, ['metadata', 'name'])).not.toBeNull()
  })
})
