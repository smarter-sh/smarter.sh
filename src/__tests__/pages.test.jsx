import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '@/app/pages/home/page'
import Platform from '@/app/pages/platform/page'
import Education from '@/app/pages/education/page'
import Extensions from '@/app/pages/extensions/page'
import Integrations from '@/app/pages/integrations/page'
import Sdks from '@/app/pages/sdks/page'
import Developers from '@/app/pages/developers/page'
import CaseStudies, { cases } from '@/app/pages/case-studies/page'
import StackademyCaseStudy from '@/app/pages/case-studies/stackademy/page'
import McpServerCaseStudy from '@/app/pages/case-studies/mcp-server/page'
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

  test('the developers page shows the ecosystem diagram, linked to its documentation', () => {
    renderPage(Developers, '/developers')
    const diagram = screen.getByRole('img', {
      name: /The Smarter platform at the center/,
    })
    expect(diagram.closest('a')).toHaveAttribute(
      'href',
      'https://docs.smarter.sh/smarter-framework.html'
    )
  })

  test('the Stackademy case study teaches the case, with both advisors and its manifests', async () => {
    renderPage(StackademyCaseStudy, '/case-studies/stackademy')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Stackademy Online Coding Academy' })
    ).toBeInTheDocument()
    expect(screen.getByText('Learning objectives')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Lab 2: The manifest editor' })
    ).toBeInTheDocument()
    expect(await screen.findByTestId('chat-preview-stackademy_sql')).toBeInTheDocument()
    expect(await screen.findByTestId('chat-preview-stackademy_api')).toBeInTheDocument()
    // GitHub doesn't answer in tests either: the lab offers the file on GitHub
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
    // a card of the architecture opens its manifest
    fireEvent.click(screen.getByRole('button', { name: /Budget\s*stackademy_project/ }))
    expect(screen.getByRole('dialog')).toHaveTextContent('The project’s spending limit')
  })

  test('the MCP server case study teaches the case, with Sam, the curl labs and its manifests', async () => {
    renderPage(McpServerCaseStudy, '/case-studies/mcp-server')
    expect(
      screen.getByRole('heading', { level: 1, name: 'The Smarter Project MCP Server' })
    ).toBeInTheDocument()
    expect(screen.getByText('Learning objectives')).toBeInTheDocument()
    for (const name of [
      'Lab 1: Talk to Sam',
      'Lab 2: Call the server yourself',
      'Lab 3: The MCPClient',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    // the architecture, and every one of the server's eight tools
    expect(screen.getByText(/Two paths that meet at one/)).toBeInTheDocument()
    for (const tool of [
      'search_code',
      'read_file',
      'get_manifest_schema',
      'read_blog_post',
    ]) {
      expect(screen.getAllByText(tool).length).toBeGreaterThan(0)
    }
    // the curl commands call the live server
    expect(
      screen.getAllByText(
        /curl -s https:\/\/ubc\.smarter\.sh\/api\/v1\/mcp\/smarter-project\//
      )
    ).toHaveLength(4)
    expect(
      await screen.findByTestId('chat-preview-smarter_developer')
    ).toBeInTheDocument()
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
    // a manifest named in the text opens in the editor's dialog
    fireEvent.click(
      screen.getAllByRole('link', { name: 'llmclient-smarter-developer.yaml' })[0]
    )
    expect(screen.getByRole('dialog')).toHaveTextContent(
      'Sam, the Smarter Developer Guide'
    )
  })

  test('the case studies page links to every case', () => {
    renderPage(CaseStudies, '/case-studies')
    expect(
      screen.getByRole('heading', { level: 1, name: /Learn from\s*real projects/ })
    ).toBeInTheDocument()
    expect(cases).toHaveLength(7)
    const paths = new Set(appRoutes.map((route) => route.path))
    for (const item of cases) {
      expect(screen.getByRole('link', { name: new RegExp(item.title) })).toHaveAttribute(
        'href',
        item.path
      )
      expect(paths).toContain(item.path)
    }
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
