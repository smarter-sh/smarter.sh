/**
 * @jest-environment node
 */
// The pre-render renders every page in Node, with no window or document, when the site is built
// (scripts/prerender.mjs). A module that touches the browser when it's imported or rendered breaks
// the build, so the pages are rendered here the same way.
import { render } from '@/entry-server'
import { canonicalUrl, pages } from '@/routes/pages'
import { splitHead } from '@/routes/prerender'

beforeEach(() => {
  // the chatbots don't answer in tests
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

describe('entry-server', () => {
  test.each(pages.map((page) => page.path))(
    '%s renders its content and its own head tags',
    async (path) => {
      const { head, body } = splitHead(await render(path))
      // /tos and /privacy (StaticCdnPage) title their text, which they fetch in the browser, with an h2
      expect(body).toMatch(/<h[12][\s>]/)
      expect(head.filter((tag) => tag.startsWith('<title>'))).toHaveLength(1)
      expect(head).toContain(`<link rel="canonical" href="${canonicalUrl(path)}"/>`)
    },
    20000
  )
})
