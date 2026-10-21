import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '@/app/pages/home/page'
import Sdks from '@/app/pages/sdks/page'
import Cli from '@/app/pages/cli/page'
import Extensions from '@/app/pages/extensions/page'
import Education from '@/app/pages/education/page'
import Developers from '@/app/pages/developers/page'
import Integrations from '@/app/pages/integrations/page'
import Platform from '@/app/pages/platform/page'
import { SMARTER_PROJECT_MCP } from '@/common/constants'

// The pages that show the Smarter web console's widgets, from @smarter.sh/ui-widgets. Each widget
// must be inside a .keen wrapper (ConsoleWidgets), the only place where the Keen theme applies.
const renderPage = (Page, path) =>
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

describe('console widgets', () => {
  test.each([
    ['/', Home, ['Did you know?', 'Self Host', 'Instructors', 'Extensions']],
    ['/sdks', Sdks, ['VS Code Extension', 'MCP Server']],
    ['/cli', Cli, ['CLI']],
    ['/extensions', Extensions, ['Extensions']],
    ['/education', Education, ['Instructors']],
    ['/developers', Developers, ['Contribute']],
    ['/integrations', Integrations, ['Integrations']],
    ['/platform', Platform, ["What's New"]],
  ])('%s shows its widgets inside the Keen wrapper', (path, Page, labels) => {
    renderPage(Page, path)
    for (const label of labels) {
      const widget = screen.getByLabelText(label)
      expect(widget.closest('.keen')).not.toBeNull()
    }
  })

  test("the MCP server widget shows the public platform's server, not this site's", () => {
    renderPage(Sdks, '/sdks')
    expect(
      screen.getByLabelText("Add this platform's MCP server to Claude Code")
    ).toHaveTextContent(SMARTER_PROJECT_MCP)
  })

  test('the developers page keeps the ways to get involved that the widget lacks', () => {
    renderPage(Developers, '/developers')
    expect(screen.getByText('Develop with AI agents')).toBeInTheDocument()
    expect(screen.getByText('Discussions')).toBeInTheDocument()
  })
})
