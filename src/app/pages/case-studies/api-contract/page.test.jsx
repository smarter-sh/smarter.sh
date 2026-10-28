import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ApiContract from './page'
import ContractExplorer, { summarize } from './components/ContractExplorer'
import { OPENAPI_RAW } from './data'

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/case-studies/api-contract']}>
        <ApiContract />
      </MemoryRouter>
    </HelmetProvider>
  )

// A small OpenAPI document, in the shape of the platform's.
const document = {
  openapi: '3.1.0',
  info: { version: 'v1' },
  paths: {
    '/cli/apply/': { post: { operationId: 'apply', summary: 'Apply a manifest' } },
    '/guardrails/': { get: { operationId: 'guardrail_list' } },
    '/guardrails/{id}/': {
      get: { operationId: 'guardrail_retrieve' },
      put: {},
      parameters: [],
    },
  },
  components: {
    schemas: { SAMKind: { enum: ['Guardrail', 'LLMClient'] }, SAMManifest: {} },
  },
}

const answer = (body, ok = true) =>
  Promise.resolve({ ok, status: ok ? 200 : 404, json: () => Promise.resolve(body) })

beforeEach(() => {
  // the chatbot and GitHub don't answer in tests: the page shows the chat's preview.
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

describe('the API contract case study', () => {
  test('teaches the case, with Ada, the explorer, the curl labs and its manifests', async () => {
    renderPage()
    expect(
      screen.getByRole('heading', { level: 1, name: /One Contract,\s*Five Clients/ })
    ).toBeInTheDocument()
    expect(screen.getByText('Learning objectives')).toBeInTheDocument()
    for (const name of [
      'Lab 1: Talk to Ada',
      'Lab 2: Read the contract yourself',
      'Lab 3: The schemas in an editor',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    // the seam, and every client
    expect(screen.getByText(/The seam\. Nothing on the left/)).toBeInTheDocument()
    for (const client of ['smarter-python', 'smarter-golang', 'smarter-vscode-yaml']) {
      expect(screen.getAllByText(client).length).toBeGreaterThan(0)
    }
    // the curl commands read the live document
    expect(
      screen.getByText('curl -s https://ubc.smarter.sh/docs/openapi.json -o openapi.json')
    ).toBeInTheDocument()
    expect(
      await screen.findByTestId('chat-preview-smarter_sdk_guide')
    ).toBeInTheDocument()
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
    // a manifest named in the text opens in the editor's dialog
    fireEvent.click(
      screen.getAllByRole('link', { name: 'llmclient-smarter-sdk-guide.yaml' })[0]
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveTextContent('Ada, the Smarter SDK Guide')
    // its editor's download from GitHub fails too, and says so
    expect(await within(dialog).findByText(/GitHub didn’t answer/)).toBeInTheDocument()
  })
})

describe('the contract explorer', () => {
  test('summarizes an OpenAPI document', () => {
    const summary = summarize(document)
    expect(summary).toMatchObject({
      openapi: '3.1.0',
      version: 'v1',
      paths: 3,
      schemas: 2,
      kinds: ['Guardrail', 'LLMClient'],
    })
    expect(summary.operations.map((op) => `${op.method} ${op.operationId}`)).toEqual([
      'POST apply',
      'GET guardrail_list',
      'GET guardrail_retrieve',
      'PUT ',
    ])
    expect(summarize({})).toMatchObject({
      paths: 0,
      schemas: 0,
      kinds: [],
      operations: [],
    })
  })

  test('loads the document when asked, and filters its operations', async () => {
    global.fetch = jest.fn(() => answer(document))
    render(<ContractExplorer url={OPENAPI_RAW} />)
    expect(global.fetch).not.toHaveBeenCalled()
    await act(async () =>
      fireEvent.click(screen.getByRole('button', { name: /Load the contract/ }))
    )
    expect(global.fetch).toHaveBeenCalledWith(OPENAPI_RAW)
    expect(screen.getByText('The SAMKind enum: 2 kinds')).toBeInTheDocument()
    expect(screen.getByText('4 of 4 operations')).toBeInTheDocument()

    const filter = screen.getByRole('searchbox', { name: 'Filter the operations' })
    fireEvent.change(filter, { target: { value: 'GUARDRAIL get' } })
    expect(screen.getByText('2 of 4 operations')).toBeInTheDocument()
    expect(screen.getByText('guardrail_retrieve')).toBeInTheDocument()
    expect(screen.queryByText('apply')).not.toBeInTheDocument()
  })

  test('says so when GitHub doesn’t answer, and may be tried again', async () => {
    global.fetch = jest.fn(() => answer(null, false))
    render(<ContractExplorer url={OPENAPI_RAW} />)
    await act(async () =>
      fireEvent.click(screen.getByRole('button', { name: /Load the contract/ }))
    )
    expect(screen.getByRole('alert')).toHaveTextContent('GitHub didn’t answer')
    expect(screen.getByRole('link', { name: 'Open the file on GitHub' })).toHaveAttribute(
      'href',
      OPENAPI_RAW
    )

    // while the second attempt loads, the button says so
    let resolve
    global.fetch = jest.fn(() => new Promise((r) => (resolve = r)))
    fireEvent.click(screen.getByRole('button', { name: /Load the contract/ }))
    expect(screen.getByRole('button', { name: /Loading/ })).toBeDisabled()
    await act(async () => resolve({ ok: true, json: () => Promise.resolve(document) }))
    expect(screen.getByText('4 of 4 operations')).toBeInTheDocument()
  })
})
