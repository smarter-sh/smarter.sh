import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '@/app/pages/home/page'
import { faqsData } from '@/app/pages/home/data'

// The landing page, laid out as the web console's dashboard in its dark mode.
const renderHome = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    </HelmetProvider>
  )

beforeEach(() => {
  // the chatbots don't answer in tests: every page shows their previews.
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

describe('home', () => {
  test("is a dashboard in the Keen theme's dark mode", () => {
    renderHome()
    const hero = screen.getByRole('heading', { level: 1 })
    expect(hero.closest('[data-bs-theme="dark"]')).not.toBeNull()
    expect(hero.closest('.keen')).not.toBeNull()
    for (const title of [
      'Works with the AI and the platforms you already use',
      'Smarter, in one sentence',
      'What your people will build',
      'Assistants built on Smarter',
      'Safe by default, not by policy memo',
      'Questions leadership can finally answer',
      'Free and open source, for everyone',
      'A practical first step',
      'Common questions',
    ]) {
      expect(screen.getByRole('region', { name: title })).toBeInTheDocument()
    }
  })

  test('the Extensions widget stays light on the dark page', () => {
    renderHome()
    const extensions = screen.getByRole('region', { name: 'Extensions' })
    expect(extensions.closest('[data-bs-theme="light"]')).not.toBeNull()
  })

  test('shows one answer at a time', async () => {
    const user = userEvent.setup()
    renderHome()
    const [first, second] = faqsData
    expect(screen.getByText(first.answer)).toBeInTheDocument()
    expect(screen.queryByText(second.answer)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: second.question }))
    expect(screen.getByText(second.answer)).toBeInTheDocument()
    expect(screen.queryByText(first.answer)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: second.question }))
    expect(screen.queryByText(second.answer)).not.toBeInTheDocument()
  })

  test("switches between the assistants' chats", async () => {
    const user = userEvent.setup()
    renderHome()
    expect(await screen.findByTestId('chat-preview-math')).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: /SDK Guide/ }))
    expect(screen.getByRole('tab', { name: /SDK Guide/ })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(
      await screen.findByTestId('chat-preview-smarter_sdk_guide')
    ).toBeInTheDocument()
  })
})
