import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Deploy from './page'
import { HOST } from './data'

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/case-studies/deploy']}>
        <Deploy />
      </MemoryRouter>
    </HelmetProvider>
  )

beforeEach(() => {
  // the chatbot and GitHub don't answer in tests: the page shows the chat's preview, and the lab offers GitHub.
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

describe('the deploy case study', () => {
  test('teaches the case, with its figures and all three labs', async () => {
    renderPage()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /What happens when you\s*click Deploy/,
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Learning objectives')).toBeInTheDocument()
    for (const name of [
      'Lab 1: Talk to the deployed chatbot',
      'Lab 2: Inspect the deploy from the outside',
      'Lab 3: The manifests',
      'Cleaning up: a daily sweep for orphans',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    // Figure 1, the deploy, and Figure 2, the hostname, label by label
    expect(screen.getByText(/One deploy\. The/)).toBeInTheDocument()
    expect(
      screen.getByLabelText('weather.3141-5926-5359.api.ubc.smarter.sh')
    ).toBeInTheDocument()
    expect(screen.getByText('The account number')).toBeInTheDocument()
    // the lab's editor finishes loading
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
  })

  test('inspects the live chatbot with read-only commands', async () => {
    renderPage()
    expect(
      screen.getByText(new RegExp(`^dig \\+short A ${HOST.replace(/\./g, '\\.')}`))
    ).toBeInTheDocument()
    expect(screen.getByText(/openssl s_client -connect/)).toBeInTheDocument()
    expect(screen.getByText(/curl -sk --resolve nosuchbot/)).toBeInTheDocument()
    expect(screen.getByText(/issuer=C=US, O=Let's Encrypt/)).toBeInTheDocument()
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
  })

  test('embeds the deployed chatbot, and opens its manifest from the text', async () => {
    renderPage()
    expect(await screen.findByTestId('chat-preview-weather')).toBeInTheDocument()
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('link', { name: 'example-com.yaml' })[0])
    expect(screen.getByRole('dialog')).toHaveTextContent('A claim that a domain belongs')
    // the dialog's editor finishes loading too
    await waitFor(() =>
      expect(screen.getAllByText(/GitHub didn’t answer/)).toHaveLength(2)
    )
  })
})
