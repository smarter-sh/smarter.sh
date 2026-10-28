import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MultiTenancy from './page'
import { mayChange, mayRead, people, resources } from './data'

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/case-studies/multi-tenancy']}>
        <MultiTenancy />
      </MemoryRouter>
    </HelmetProvider>
  )

beforeEach(() => {
  // the chatbot and GitHub don't answer in tests
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

const person = (id) => people.find((p) => p.id === id)
const resource = (name) => resources.find((r) => r.name === name)

describe('the rules of Lab 1', () => {
  test('a member reads their account and the platform, and changes only their own', () => {
    const ana = person('ana')
    expect(mayRead(ana, resource('support'))).toBe(true)
    expect(mayRead(ana, resource('billing_db'))).toBe(true)
    expect(mayRead(ana, resource('secrets_leak_output'))).toBe(true)
    expect(mayRead(ana, resource('sales'))).toBe(false)
    expect(mayChange(ana, resource('support'))).toBe(true)
    expect(mayChange(ana, resource('billing_db'))).toBe(false)
  })

  test('staff change everything in their account, and nothing the platform owns', () => {
    const ben = person('ben')
    expect(mayChange(ben, resource('support'))).toBe(true)
    expect(mayChange(ben, resource('secrets_leak_output'))).toBe(false)
    expect(mayChange(ben, resource('pricing'))).toBe(false)
  })

  test('a person in two accounts gets the union of both profiles', () => {
    const chen = person('chen')
    expect(resources.filter((r) => mayRead(chen, r))).toHaveLength(5)
    expect(resources.filter((r) => mayChange(chen, r)).map((r) => r.name)).toEqual([
      'sales',
    ])
  })

  test('a superuser may do anything, and a visitor nothing', () => {
    for (const r of resources) {
      expect(mayRead(person('dee'), r)).toBe(true)
      expect(mayChange(person('dee'), r)).toBe(true)
      expect(mayRead(person('anonymous'), r)).toBe(false)
      expect(mayChange(person('anonymous'), r)).toBe(false)
    }
  })
})

describe('the multi-tenancy case study', () => {
  test('teaches the case, with its labs, the chatbot and the curl commands', async () => {
    renderPage()
    expect(
      screen.getByRole('heading', { level: 1, name: /One Platform,\s*Many Tenants/ })
    ).toBeInTheDocument()
    expect(screen.getByText('Learning objectives')).toBeInTheDocument()
    for (const name of [
      'Lab 1: Apply the rules',
      'Lab 2: Probe the edges of a live chatbot',
      'Lab 3: allowedOrigins',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(screen.getByText(/A guessed id,/)).toBeInTheDocument()
    expect(
      screen.getAllByText(/weather\.3141-5926-5359\.api\.ubc\.smarter\.sh/).length
    ).toBeGreaterThan(4)
    expect(await screen.findByTestId('chat-preview-weather')).toBeInTheDocument()
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
  })

  test('Lab 1 shows what each person may read and change', async () => {
    renderPage()
    // let the chatbot's and the manifest editor's requests settle first
    expect(await screen.findByTestId('chat-preview-weather')).toBeInTheDocument()
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
    const lab = screen.getByRole('group', { name: 'People' }).closest('figure')
    // Ana, by default
    expect(within(lab).getByLabelText('sales read: no')).toBeInTheDocument()
    expect(within(lab).getByText(/Profiles: ana@acme\./)).toBeInTheDocument()

    fireEvent.click(within(lab).getByRole('button', { name: 'Chen' }))
    expect(within(lab).getByRole('button', { name: 'Chen' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(within(lab).getByLabelText('sales read: yes')).toBeInTheDocument()
    expect(within(lab).getByLabelText('sales change: yes')).toBeInTheDocument()
    expect(within(lab).getByLabelText('support change: no')).toBeInTheDocument()

    fireEvent.click(within(lab).getByRole('button', { name: 'A visitor' }))
    expect(within(lab).getByText(/No profile at all\./)).toBeInTheDocument()
    expect(within(lab).getByLabelText('secrets_leak_output read: no')).toBeInTheDocument()
  })

  test('a manifest named in the text opens in the editor’s dialog', async () => {
    renderPage()
    fireEvent.click(screen.getByRole('link', { name: 'llmclient-weather.yaml' }))
    expect(screen.getByRole('dialog')).toHaveTextContent(
      'The weather chatbot that Lab 2 probes'
    )
    // the lab's editor and the dialog's both settle
    await waitFor(() =>
      expect(screen.getAllByText(/GitHub didn’t answer/)).toHaveLength(2)
    )
  })
})
