import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '@/app/pages/home/page'
import { faqsData } from '@/app/pages/home/data'

// The landing page, laid out as the web console's dashboard in its default light mode.
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
  test("opens with the cover, then is a dashboard in the Keen theme's light mode", () => {
    renderHome()
    // the cover is the pitch deck's dark band, above the dashboard
    const hero = screen.getByRole('heading', {
      level: 1,
      name: 'Build AI without engineers',
    })
    expect(hero.closest('.keen')).toBeNull()
    const logos = screen.getByRole('region', {
      name: 'Works with the AI and the platforms you already use',
    })
    expect(logos.closest('[data-bs-theme="light"]')).not.toBeNull()
    expect(logos.closest('[data-bs-theme="dark"]')).toBeNull()
    expect(logos.closest('.keen')).not.toBeNull()
    for (const title of [
      'AI is already inside your organization',
      'Three ways to respond',
      'Works with the AI and the platforms you already use',
      'Smarter, in one sentence',
      'What your people will build',
      'Assistants built on Smarter',
      'Safe by default, not by policy memo',
      'Free and open source, for everyone',
      'Thirty days, with real cases',
      'Common questions',
    ]) {
      expect(screen.getByRole('region', { name: title })).toBeInTheDocument()
    }
  })

  test('the Extensions widget is in the light theme', () => {
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

  test('what an assistant is made of is in a box that opens on request', async () => {
    const user = userEvent.setup()
    renderHome()
    const toggle = screen.getByRole('button', { name: 'What it’s made of' })
    const body = document.getElementById(toggle.getAttribute('aria-controls'))
    // closed at first: the heading and its sentence show, the resources don't
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(body).not.toBeVisible()
    expect(screen.getByText(/Current conditions and the next hours/)).toBeVisible()
    expect(
      screen.queryByText(
        'A tool that is configured, not coded: it finds a picture of the place.'
      )
    ).not.toBeVisible()
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(body).toBeVisible()
    expect(
      within(body).getByText(
        'A tool that is configured, not coded: it finds a picture of the place.'
      )
    ).toBeVisible()
    expect(within(body).getByText('ImageSearchPlugin')).toBeVisible()
    // each assistant has its own box, closed until it's opened
    await user.click(screen.getByRole('tab', { name: /Euclid/ }))
    expect(screen.getByRole('button', { name: 'What it’s made of' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    await user.click(screen.getByRole('button', { name: 'What it’s made of' }))
    expect(screen.getByRole('button', { name: 'What it’s made of' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    await user.click(screen.getByRole('button', { name: 'What it’s made of' }))
    expect(screen.getByRole('button', { name: 'What it’s made of' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  test('a tab keeps its panel, and its chat, when the visitor comes back to it', async () => {
    // the chatbots answer, so that the live chats render
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ data: {} }) })
    )
    const configFetches = () =>
      global.fetch.mock.calls.filter(([url]) => String(url).endsWith('config/'))
    const user = userEvent.setup()
    renderHome()
    // only the first assistant's panel is mounted at first
    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(1)
    const weather = screen.getByRole('tabpanel', { name: /Weather/ })
    const weatherChat = await screen.findByTestId('chat-live-weather')
    // open its box, to see that it stays open
    await user.click(screen.getByRole('button', { name: 'What it’s made of' }))
    await user.click(screen.getByRole('tab', { name: /Euclid/ }))
    expect(await screen.findByTestId('chat-live-math')).toBeVisible()
    expect(weather).not.toBeVisible()
    await user.click(screen.getByRole('tab', { name: /Weather/ }))
    // the same nodes, not a new render
    expect(screen.getByRole('tabpanel', { name: /Weather/ })).toBe(weather)
    expect(screen.getByTestId('chat-live-weather')).toBe(weatherChat)
    expect(weather).toBeVisible()
    expect(
      within(weather).getByRole('button', { name: 'What it’s made of' })
    ).toHaveAttribute('aria-expanded', 'true')
    // one config request for each assistant shown, none when coming back
    expect(configFetches()).toHaveLength(2)
    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(2)
  })

  test('the arrow keys move between the tabs', async () => {
    const user = userEvent.setup()
    renderHome()
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-controls', 'try-it-panel-weather')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
    tabs[0].focus()
    await user.keyboard('{ArrowRight}')
    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{ArrowLeft}')
    expect(tabs[0]).toHaveFocus()
    await user.keyboard('{End}')
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Home}')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{ArrowLeft}')
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true')
  })

  test("the Weather assistant links to OpenAI's function calling guide", async () => {
    const user = userEvent.setup()
    renderHome()
    await user.click(screen.getByRole('button', { name: 'What it’s made of' }))
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
      const panel = document.getElementById(tab.getAttribute('aria-controls'))
      const chat = await within(panel).findByTestId(/^chat-live-/)
      names.add(chat.getAttribute('session-cookie-name'))
    }
    expect(names.size).toBe(4)
  })

  test('the hero links to the Slack workspace', () => {
    renderHome()
    const hero = screen.getByRole('region', { name: 'The Smarter Project' })
    const slack = within(hero).getByRole('link', { name: /Join us on Slack/ })
    expect(slack).toHaveAttribute(
      'href',
      'https://join.slack.com/t/thesmarterproject/shared_invite/zt-4f0t6v46q-e2c5Of4hS4fBr_XwfQARCw'
    )
    expect(slack).toHaveAttribute('target', '_blank')
  })

  test('how to start: thirty days, in four phases, and what you have at the end', () => {
    renderHome()
    const card = screen.getByRole('region', { name: 'Thirty days, with real cases' })
    for (const when of ['Days 1 to 7', 'Days 8 to 14', 'Days 15 to 29', 'Day 30']) {
      expect(within(card).getByText(when, { selector: 'p' })).toBeInTheDocument()
    }
    // the bar's last day is the phases' total
    expect(within(card).getByText('Day 30', { selector: 'span' })).toBeInTheDocument()
    expect(within(card).getByText('Real cost and usage data')).toBeInTheDocument()
  })

  test('the cover pictures the platform: learn, build and govern', () => {
    renderHome()
    const cover = screen.getByRole('region', { name: 'The Smarter Project' })
    expect(
      within(cover).getByRole('img', { name: 'The Smarter loop: learn, build, govern' })
    ).toBeInTheDocument()
    for (const word of ['Simple.', 'Fast.', 'In control.']) {
      expect(within(cover).getByText(word)).toBeInTheDocument()
    }
    expect(within(cover).getByRole('link', { name: 'What is Smarter?' })).toHaveAttribute(
      'href',
      '#what-is-smarter'
    )
    expect(document.getElementById('what-is-smarter')).not.toBeNull()
  })

  test('Smarter in one sentence: simple, fast and in control', () => {
    renderHome()
    const card = screen.getByRole('region', { name: 'Smarter, in one sentence' })
    expect(card).toHaveAttribute('id', 'what-is-smarter')
    expect(
      within(card).getByRole('heading', {
        name: /An open-source platform where your people/,
      })
    ).toBeInTheDocument()
    for (const word of ['Simple', 'Fast', 'In control', 'Free and open source']) {
      expect(within(card).getByText(word)).toBeInTheDocument()
    }
  })

  test('the visitor picks one of the three ways to respond', async () => {
    const user = userEvent.setup()
    renderHome()
    const group = screen.getByRole('group', { name: 'Three ways to respond' })
    const [ignore, , enable] = within(group).getAllByRole('button')
    expect(ignore).toHaveAttribute('aria-pressed', 'true')
    await user.click(enable)
    expect(enable).toHaveAttribute('aria-pressed', 'true')
    expect(ignore).toHaveAttribute('aria-pressed', 'false')
    expect(
      screen.getByRole('img', { name: /Now showing: Enable it/ })
    ).toBeInTheDocument()
  })

  test('the problem pictures what people have already built', () => {
    renderHome()
    const problem = screen.getByRole('region', {
      name: 'AI is already inside your organization',
    })
    expect(
      within(problem).getByRole('img', { name: /Sales bot for quotes/ })
    ).toBeInTheDocument()
    expect(within(problem).getAllByRole('listitem')).toHaveLength(3)
  })

  test('safe by default shows a message that passes, one that is blocked, and its four controls', () => {
    renderHome()
    const card = screen.getByRole('region', {
      name: 'Safe by default, not by policy memo',
    })
    expect(
      within(card).getByRole('list', { name: 'One message’s way through Smarter' })
    ).toBeInTheDocument()
    expect(
      within(card).getByText(/answer delivered · cost 0\.004 USD/)
    ).toBeInTheDocument()
    expect(within(card).getByText(/card number detected/)).toBeInTheDocument()
    for (const name of [
      'Guardrails on every message',
      'The AI never holds the passwords',
      'Spending caps',
      'A complete record',
    ]) {
      expect(within(card).getByRole('link', { name }).getAttribute('href')).toMatch(
        /^https:\/\/docs\.smarter\.sh\//
      )
    }
  })
})
