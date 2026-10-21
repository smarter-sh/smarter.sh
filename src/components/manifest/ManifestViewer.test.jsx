import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { githubRepository, clearCache, schemaUrl } from './manifests'
import { ManifestLab, ManifestLink, ManifestProvider } from './ManifestViewer'
import { splitDescription } from './validation'

// Monaco can't run in jsdom: a textarea in its place, with the editor methods that the toolbar uses.
jest.mock('./MonacoYaml', () => {
  const { useEffect, useRef } = jest.requireActual('react')
  const MonacoYaml = ({ value, onChange, onMount, errors }) => {
    const ref = useRef(null)
    useEffect(() => {
      const textarea = ref.current
      onMount?.({
        setValue: (text) => {
          textarea.value = text
        },
        trigger: jest.fn(),
        getModel: () => ({ getPositionAt: () => ({ lineNumber: 1, column: 1 }) }),
        revealLineInCenter: jest.fn(),
        setPosition: jest.fn(),
        focus: jest.fn(),
      })
      // mount once, as Monaco does
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <textarea
        ref={ref}
        aria-label="manifest"
        data-errors={errors.length}
        defaultValue={value}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }
  return { __esModule: true, default: MonacoYaml }
})

const repo = githubRepository('example/academy')

const files = [
  {
    path: 'secrets/password.yaml',
    kind: 'Secret',
    name: 'password',
    role: 'A password.',
  },
  { path: 'llm-clients/advisor.yaml', kind: 'LLMClient', name: 'advisor' },
]

const yaml = {
  'secrets/password.yaml':
    'apiVersion: smarter.sh/v1\nkind: Secret\nmetadata:\n  name: password\nspec:\n  value: x\n',
  'llm-clients/advisor.yaml':
    'apiVersion: smarter.sh/v1\nkind: LLMClient\nmetadata:\n  name: advisor\nspec:\n  temperature: 1.0\n',
}

const schema = {
  type: 'object',
  properties: {
    kind: { type: 'string' },
    spec: { type: 'object', properties: { temperature: { type: 'number' } } },
  },
  required: ['kind'],
}

const respond = (url) => {
  const path = Object.keys(yaml).find((p) => url === repo.rawUrl(p))
  if (path) return { ok: true, text: async () => yaml[path] }
  if (url === schemaUrl('Secret') || url === schemaUrl('LLMClient')) {
    return { ok: true, json: async () => schema }
  }
  return { ok: false, status: 404 }
}

beforeEach(() => {
  clearCache()
  global.fetch = jest.fn((url) => Promise.resolve(respond(url)))
})

const renderWith = (children) =>
  render(
    <ManifestProvider repo={repo} files={files}>
      {children}
    </ManifestProvider>
  )

describe('ManifestLab', () => {
  test('lists the manifests by folder, and opens the first one checked', async () => {
    renderWith(<ManifestLab />)
    expect(screen.getByText('secrets/')).toBeInTheDocument()
    expect(await screen.findByLabelText('manifest')).toHaveValue(
      yaml['secrets/password.yaml']
    )
    expect(await screen.findByText(/manifest: it matches the/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Secret JSON Schema' })).toHaveAttribute(
      'href',
      schemaUrl('Secret')
    )
  })

  test('switches to another manifest', async () => {
    renderWith(<ManifestLab />)
    await screen.findByLabelText('manifest')
    fireEvent.click(screen.getByRole('button', { name: /advisor\.yaml/ }))
    expect(await screen.findByLabelText('manifest')).toHaveValue(
      yaml['llm-clients/advisor.yaml']
    )
  })

  test('checks an edit against the schema, and resets it', async () => {
    renderWith(<ManifestLab initialPath="llm-clients/advisor.yaml" />)
    const editor = await screen.findByLabelText('manifest')
    fireEvent.change(editor, {
      target: { value: yaml['llm-clients/advisor.yaml'].replace('1.0', 'warm') },
    })
    expect(screen.getByText('edited')).toBeInTheDocument()
    expect(
      await screen.findByText('spec.temperature must be a number', {}, { timeout: 2000 })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/a pull request with this file would fail/)
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /spec.temperature must be/ }))

    fireEvent.click(screen.getByRole('button', { name: 'Reset to the file on GitHub' }))
    expect(screen.queryByText('edited')).not.toBeInTheDocument()
    expect(await screen.findByText(/manifest: it matches the/)).toBeInTheDocument()
  })

  test('reports a YAML syntax error', async () => {
    renderWith(<ManifestLab />)
    const editor = await screen.findByLabelText('manifest')
    fireEvent.change(editor, { target: { value: 'kind: [' } })
    expect(await screen.findByText('YAML')).toBeInTheDocument()
  })

  test('offers GitHub, and another try, when GitHub does not answer', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 503 }))
    renderWith(<ManifestLab />)
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
    global.fetch = jest.fn((url) => Promise.resolve(respond(url)))
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByLabelText('manifest')).toBeInTheDocument()
  })

  test('copies and downloads the manifest', async () => {
    const writeText = jest.fn(() => Promise.resolve())
    Object.assign(navigator, { clipboard: { writeText } })
    URL.createObjectURL = jest.fn(() => 'blob:manifest')
    URL.revokeObjectURL = jest.fn()
    renderWith(<ManifestLab />)
    await screen.findByLabelText('manifest')
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    })
    expect(writeText).toHaveBeenCalledWith(yaml['secrets/password.yaml'])
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Download password.yaml' }))
    expect(URL.createObjectURL).toHaveBeenCalled()
    expect(screen.getByRole('link', { name: /Open on GitHub/ })).toHaveAttribute(
      'href',
      repo.pageUrl('secrets/password.yaml')
    )
  })
})

describe('ManifestLink', () => {
  test('links to GitHub, and opens the manifest in a dialog instead', async () => {
    renderWith(
      <p>
        Read <ManifestLink path="secrets/password.yaml" />.
      </p>
    )
    const link = screen.getByRole('link', { name: /password\.yaml/ })
    expect(link).toHaveAttribute('href', repo.pageUrl('secrets/password.yaml'))
    fireEvent.click(link)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveTextContent('A password.')
    expect(await screen.findByLabelText('manifest')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())

    fireEvent.click(link)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('a modified click is left to the browser', () => {
    renderWith(<ManifestLink path="secrets/password.yaml">the password</ManifestLink>)
    fireEvent.click(screen.getByRole('link', { name: /the password/ }), { metaKey: true })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('needs a provider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ManifestLink path="x.yaml" />)).toThrow(/ManifestProvider/)
    console.error.mockRestore()
  })
})

describe('splitDescription', () => {
  test("separates a SAM description's type from its text", () => {
    expect(
      splitDescription('LLMClient.styles.googleFont[str]. Optional.   The font.')
    ).toEqual({ type: 'str', text: 'Optional. The font.' })
    expect(splitDescription('kind[String]: Required. The kind.')).toEqual({
      type: 'String',
      text: 'Required. The kind.',
    })
    expect(splitDescription('Plain words.')).toEqual({ type: null, text: 'Plain words.' })
  })
})
