import { render, screen, within } from '@testing-library/react'
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
    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual([
      'Weather · Extensions',
      'Euclid · Education',
      'SDK Guide · Developers',
      'Developer · Contributors',
    ])
    expect(await screen.findByTestId('chat-preview-weather')).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: /Euclid/ }))
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

  test("the Weather assistant links to OpenAI's function calling guide", () => {
    renderHome()
    const guide = 'https://developers.openai.com/api/docs/guides/function-calling'
    expect(screen.getByRole('link', { name: 'function calling guide' })).toHaveAttribute(
      'href',
      guide
    )
  })

  test("the architecture's cards open their public manifests", () => {
    renderHome()
    const tree = screen.getByRole('list', {
      name: 'The resources that Weather LLMClient is built from',
    })
    const links = within(tree)
      .getAllByRole('link')
      .filter((link) => link.classList.contains('architecture-card-name'))
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(
        /^https:\/\/(github\.com\/smarter-sh\/|docs\.smarter\.sh\/)/
      )
    }
  })

  test('each assistant keeps its own chat session', async () => {
    // the chatbots answer, so that the live chats render
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ data: {} }) })
    )
    const user = userEvent.setup()
    renderHome()
    const names = new Set()
    for (const tab of screen.getAllByRole('tab')) {
      await user.click(tab)
      const chat = await screen.findByTestId(/^chat-live-/)
      names.add(chat.getAttribute('session-cookie-name'))
    }
    expect(names.size).toBe(4)
  })

  test('the hero pictures the platform: learn, build and govern', () => {
    renderHome()
    const platform = screen.getByRole('group', { name: 'What Smarter does' })
    for (const word of ['Learn', 'Build', 'Govern']) {
      expect(within(platform).getByText(word)).toBeInTheDocument()
    }
    expect(
      within(platform).getByText(/smarter apply -f weather\.yaml/)
    ).toBeInTheDocument()
    for (const course of ['prompt-engineering', 'ai-governance', 'ai-economics']) {
      const link = within(platform)
        .getAllByRole('link')
        .find((a) => a.getAttribute('href').endsWith(`/micro-courses/${course}.html`))
      expect(link).toHaveAttribute('target', '_blank')
    }
    expect(screen.queryByRole('img', { name: /Euclid/ })).not.toBeInTheDocument()
  })
})
