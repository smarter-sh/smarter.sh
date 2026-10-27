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

  test('links to the Stackademy case study, marked active on its page', () => {
    render(
      <MemoryRouter initialEntries={['/case-studies/stackademy']}>
        <TopNavbar />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: 'Case Study' })
    expect(link).toHaveAttribute('href', '/case-studies/stackademy')
    expect(link.closest('li')).toHaveClass('active')
  })

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
