import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CookieNotice, { DISMISSED_KEY } from './CookieNotice'

const renderNotice = () =>
  render(
    <MemoryRouter>
      <CookieNotice />
    </MemoryRouter>
  )

beforeEach(() => window.localStorage.clear())

describe('CookieNotice', () => {
  test('tells a new visitor about cookies, with a link to the privacy policy', () => {
    renderNotice()
    expect(screen.getByRole('region', { name: 'Cookie notice' })).toHaveTextContent(
      'We use cookies to improve your experience.'
    )
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
      'href',
      '/privacy'
    )
  })

  test('closes, and stays closed on the next visit', () => {
    const { unmount } = renderNotice()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(
      screen.queryByRole('region', { name: 'Cookie notice' })
    ).not.toBeInTheDocument()
    expect(window.localStorage.getItem(DISMISSED_KEY)).toBe('1')
    unmount()
    renderNotice()
    expect(
      screen.queryByRole('region', { name: 'Cookie notice' })
    ).not.toBeInTheDocument()
  })

  test('still shows, and closes, without localStorage', () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const setItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    renderNotice()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(
      screen.queryByRole('region', { name: 'Cookie notice' })
    ).not.toBeInTheDocument()
    getItem.mockRestore()
    setItem.mockRestore()
  })
})
