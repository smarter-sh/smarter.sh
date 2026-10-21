import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppRouter from '@/routes/router'

beforeEach(() => {
  // the chatbots don't answer in tests: every page shows their previews.
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

describe('router', () => {
  // /plans and /login were template pages that the site removed; links to them may remain.
  test.each(['/plans', '/login', '/not-a-page'])(
    '%s goes to the home page',
    async (path) => {
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={[path]}>
            <Suspense fallback={null}>
              <AppRouter />
            </Suspense>
          </MemoryRouter>
        </HelmetProvider>
      )
      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: /Learn AI\. Build with AI\. Govern AI\./,
        })
      ).toBeInTheDocument()
    }
  )
})
