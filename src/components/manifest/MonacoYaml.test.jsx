import { act, render } from '@testing-library/react'
import MonacoYaml from './MonacoYaml'

// @monaco-editor/react, faked: it mounts a fake Monaco, whose calls the tests inspect.
const fake = {}
jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ beforeMount, onMount, onChange }) => {
    const { useEffect } = jest.requireActual('react')
    useEffect(() => {
      beforeMount(fake.monaco)
      onMount(fake.editor, fake.monaco)
      fake.onChange = onChange
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div data-testid="monaco" />
  },
}))

const yaml = 'kind: Example\nspec:\n  timeout: 30\n'
const schema = {
  type: 'object',
  properties: {
    spec: {
      type: 'object',
      properties: {
        timeout: {
          type: 'integer',
          description: 'Example.spec.timeout[int]. Optional. Seconds to wait.',
        },
      },
    },
  },
}

beforeEach(() => {
  const model = {
    uri: { toString: () => 'inmemory://model/1' },
    getValue: () => yaml,
    getPositionAt: () => ({ lineNumber: 3, column: 3 }),
    getLineMaxColumn: () => 14,
    getOffsetAt: (position) => position.offset,
  }
  fake.monaco = {
    editor: { defineTheme: jest.fn(), setModelMarkers: jest.fn() },
    languages: {
      registerHoverProvider: jest.fn((language, provider) => {
        fake.hover = provider
      }),
    },
    MarkerSeverity: { Error: 8 },
  }
  fake.editor = {
    getModel: () => model,
    getContentHeight: () => 900,
    onDidContentSizeChange: jest.fn(),
  }
  fake.model = model
})

test('themes the editor, marks errors and explains keys on hover', () => {
  const onMount = jest.fn()
  const onChange = jest.fn()
  const errors = [
    { source: 'schema', message: 'spec.timeout must be an integer', offset: 20 },
  ]
  render(
    <MonacoYaml
      value={yaml}
      schema={schema}
      errors={errors}
      onChange={onChange}
      onMount={onMount}
    />
  )
  expect(fake.monaco.editor.defineTheme).toHaveBeenCalled()
  expect(onMount).toHaveBeenCalledWith(fake.editor)
  const [, owner, markers] = fake.monaco.editor.setModelMarkers.mock.calls.at(-1)
  expect(owner).toBe('smarter-manifest')
  expect(markers[0]).toMatchObject({
    message: 'spec.timeout must be an integer',
    source: 'JSON Schema',
    startLineNumber: 3,
    endColumn: 14,
  })

  // hover over "timeout"
  const hover = fake.hover.provideHover(fake.model, {
    offset: yaml.indexOf('timeout') + 2,
  })
  expect(hover.contents.map((c) => c.value)).toEqual([
    '**timeout** · `int`',
    'Optional. Seconds to wait.',
    '_spec.timeout_',
  ])
  // nothing to say over a value
  expect(fake.hover.provideHover(fake.model, { offset: yaml.indexOf('30') })).toBeNull()

  act(() => fake.onChange(undefined))
  expect(onChange).toHaveBeenCalledWith('')
})
