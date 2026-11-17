import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TopNavbar from '@/components/TopNavbar'

// Below the lg breakpoint, the navigation's links collapse behind a menu button.
describe('navigation bar', () => {
  test('the menu button opens and closes the menu', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <TopNavbar />
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: 'Menu' })
    const menu = document.getElementById(button.getAttribute('aria-controls'))
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(menu).toHaveClass('hidden')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(menu).not.toHaveClass('hidden')
    await user.click(button)
    expect(menu).toHaveClass('hidden')
  })

  test.each(['/case-studies', '/case-studies/stackademy', '/case-studies/mcp-server'])(
    'links to the case studies, marked active on %s',
    (path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <TopNavbar />
        </MemoryRouter>
      )
      const link = screen.getByRole('link', { name: 'Case Studies' })
      expect(link).toHaveAttribute('href', '/case-studies')
      expect(link.closest('li')).toHaveClass('active')
    }
  )

  // Developers is a menu: Integrations, Extensions and SDKs, with /developers as its footer.
  test('the Developers menu opens on click and closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <TopNavbar />
      </MemoryRouter>
    )
    const trigger = screen.getByRole('button', { name: 'Developers' })
    const panel = document.getElementById(trigger.getAttribute('aria-controls'))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(panel).toHaveClass('hidden')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(panel).not.toHaveClass('hidden')
    const hrefs = Array.from(panel.querySelectorAll('a')).map((a) =>
      a.getAttribute('href')
    )
    expect(hrefs).toEqual(['/integrations', '/extensions', '/sdks', '/developers'])
    await user.keyboard('{Escape}')
    expect(panel).toHaveClass('hidden')
  })

  test.each(['/integrations', '/extensions', '/sdks', '/developers'])(
    'marks the Developers menu active on %s',
    (path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <TopNavbar />
        </MemoryRouter>
      )
      expect(
        screen.getByRole('button', { name: 'Developers' }).closest('li')
      ).toHaveClass('active')
    }
  )

  test('opens the blog in this tab, and GitHub in a new one', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <TopNavbar />
      </MemoryRouter>
    )
    const blog = screen.getByRole('link', { name: 'Blog' })
    expect(blog).toHaveAttribute('href', 'https://blog.smarter.sh/')
    expect(blog).not.toHaveAttribute('target')
    expect(screen.getByRole('link', { name: 'Smarter on GitHub' })).toHaveAttribute(
      'target',
      '_blank'
    )
  })
})
