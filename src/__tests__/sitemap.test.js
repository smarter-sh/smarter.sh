import { appRoutes } from '@/routes/index'
import { pages, redirects, sitemapPaths, sitemapXml, SITE_URL } from '@/routes/pages'

describe('sitemap', () => {
  test('lists every page that the router serves, except those left out', () => {
    const listed = new Set(sitemapPaths())
    for (const page of pages) {
      expect(listed.has(page.path)).toBe(page.sitemap !== false)
    }
    expect(listed.has('/case-studies/stackademy')).toBe(true)
    expect(listed.has('/home')).toBe(false)
  })

  test('never lists a redirect', () => {
    const listed = new Set(sitemapPaths())
    for (const redirect of redirects) expect(listed.has(redirect.path)).toBe(false)
  })

  test('every route is a page or a redirect, so a new route is in the sitemap', () => {
    const known = new Set([...pages, ...redirects].map((route) => route.path))
    expect(appRoutes.length).toBe(known.size)
    for (const route of appRoutes) expect(known.has(route.path)).toBe(true)
  })

  test('is a well-formed sitemap of absolute urls', () => {
    const doc = new DOMParser().parseFromString(sitemapXml(), 'application/xml')
    expect(doc.getElementsByTagName('parsererror')).toHaveLength(0)
    expect(doc.documentElement.namespaceURI).toBe(
      'http://www.sitemaps.org/schemas/sitemap/0.9'
    )
    const locs = Array.from(doc.getElementsByTagName('loc')).map((loc) => loc.textContent)
    expect(locs).toEqual(sitemapPaths().map((path) => `${SITE_URL}${path}`))
    expect(new Set(locs).size).toBe(locs.length)
  })
})
