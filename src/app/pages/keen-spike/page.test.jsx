import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import KeenSpike from '@/app/pages/keen-spike/page'
import { OPENAPI_DOCS } from '@/common/constants'

describe('keen spike', () => {
  test('shows the web console widgets, inside the Keen wrapper', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/keen-spike']}>
          <KeenSpike />
        </MemoryRouter>
      </HelmetProvider>
    )
    const selfHost = screen.getByRole('region', { name: 'Self Host' })
    const sdk = screen.getByRole('region', { name: 'SDK' })
    expect(selfHost.closest('.keen')).not.toBeNull()
    expect(sdk.closest('.keen')).not.toBeNull()
    // smarter.sh links to a platform's OpenAPI document, not the web console's relative one.
    expect(screen.getByRole('link', { name: 'API reference' })).toHaveAttribute(
      'href',
      OPENAPI_DOCS
    )
  })
})
