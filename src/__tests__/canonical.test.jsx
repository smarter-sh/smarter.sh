import { Suspense } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppRouter from '@/routes/router'
import { SITE_URL } from '@/routes/pages'

beforeEach(() => {
  // the chatbots don't answer in tests: every page shows their previews.
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

const renderAt = (path) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Suspense fallback={null}>
          <AppRouter />
        </Suspense>
      </MemoryRouter>
    </HelmetProvider>
  )

// index.html is served for every path, so each page must name its own canonical url, or search
// engines index only the home page.
describe('canonical url', () => {
  test.each([
    ['/platform', `${SITE_URL}/platform`],
    ['/case-studies/stackademy', `${SITE_URL}/case-studies/stackademy`],
    ['/home', `${SITE_URL}/`],
    ['/not-a-page', `${SITE_URL}/`],
  ])('%s is %s', async (path, url) => {
    renderAt(path)
    await screen.findAllByRole('heading', { level: 1 })
    await waitFor(() => {
      const links = document.head.querySelectorAll('link[rel="canonical"]')
      expect(links).toHaveLength(1)
      expect(links[0].getAttribute('href')).toBe(url)
      expect(
        document.head.querySelector('meta[property="og:url"]').getAttribute('content')
      ).toBe(url)
    })
    // A case study's manifest lab is still reading from GitHub, which doesn't answer in tests.
    // Wait for it to give up, or its state update lands after the test, outside act().
    await waitFor(() =>
      expect(screen.queryByText(/from GitHub…/)).not.toBeInTheDocument()
    )
  })
})
