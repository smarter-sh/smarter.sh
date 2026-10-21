import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '@/app/pages/home/page'
import Platform from '@/app/pages/platform/page'
import Education from '@/app/pages/education/page'
import Extensions from '@/app/pages/extensions/page'
import Integrations from '@/app/pages/integrations/page'
import Sdks from '@/app/pages/sdks/page'
import Developers from '@/app/pages/developers/page'
import { appRoutes } from '@/routes/index'
import { footerLinks } from '@/components/SiteFooter'

const renderPage = (Page, path = '/') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Page />
      </MemoryRouter>
    </HelmetProvider>
  )

beforeEach(() => {
  // the chatbots don't answer in tests: every page shows their previews.
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

describe('pages', () => {
  test('the home page answers what Smarter is and what problem it solves', async () => {
    renderPage(Home)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Learn AI\. Build with AI\. Govern AI\./,
      })
    ).toBeInTheDocument()
    expect(screen.getByText('AI is already inside your organization')).toBeInTheDocument()
    expect(
      screen.getByText('Two gaps stand between you and the value')
    ).toBeInTheDocument()
    expect(screen.getByText('An ERP for AI resources')).toBeInTheDocument()
    expect(await screen.findByTestId('chat-preview-weather')).toBeInTheDocument()
  })

  test.each([
    ['platform', Platform, 'Everything AI needs, in one governed place'],
    ['education', Education, 'Teach AI by building it'],
    ['extensions', Extensions, 'Give your assistants the tools they need'],
    ['integrations', Integrations, 'Your assistant, wherever your audience already is'],
    ['sdks', Sdks, 'Everything in the console, from your own code'],
    ['developers', Developers, 'Help build Smarter'],
  ])('the %s page renders its title', (path, Page, title) => {
    renderPage(Page, `/${path}`)
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
  })

  test('the pages that embed a chatbot show it', async () => {
    renderPage(Sdks, '/sdks')
    expect(
      await screen.findByTestId('chat-preview-smarter_sdk_guide')
    ).toBeInTheDocument()
  })

  test('the integrations page covers the ecosystem plugins', () => {
    renderPage(Integrations, '/integrations')
    for (const name of [
      'WordPress',
      'Drupal',
      'Shopify',
      'Google Tag Manager',
      'Docusaurus',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
  })

  test('every internal footer link has a route', () => {
    const paths = new Set(appRoutes.map((route) => route.path))
    const internal = footerLinks
      .flatMap((group) => group.links)
      .map((link) => link.url)
      .filter((url) => url.startsWith('/'))
    expect(internal.length).toBeGreaterThan(5)
    for (const url of internal) expect(paths).toContain(url)
  })
})
