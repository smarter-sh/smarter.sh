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
})
