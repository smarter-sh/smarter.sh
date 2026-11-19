import { pages } from '@/routes/pages'
import {
  assemble,
  clearPrerender,
  HEAD_END,
  HEAD_START,
  headKey,
  outputFile,
  prerenderPaths,
  s3Key,
  splitHead,
} from '@/routes/prerender'

const TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Default title</title>
    <meta
      name="description"
      content="Default description"
    />
    <meta property="og:title" content="Default" />
    <meta property="og:image" content="https://example.com/og.png" />
  </head>
  <body>
    <div id="root"></div>
    <div id="splash-screen">
      <img alt="Logo" src="/logo.png" />
    </div>
  </body>
</html>`

const APP = [
  '<link rel="preload" as="image" href="/assets/logo.png"/>',
  '<title>Smarter | Platform</title>',
  '<meta property="og:title" content="Smarter | Platform"/>',
  '<meta name="description" content="The platform."/>',
  '<link rel="canonical" href="https://smarter.sh/platform"/>',
  '<div><h1>Platform</h1></div>',
].join('')

describe('prerender paths', () => {
  test('every page is pre-rendered, and no redirect', () => {
    expect(prerenderPaths()).toEqual(pages.map((page) => page.path))
    expect(prerenderPaths()).not.toContain('/terms-of-service')
  })

  test.each([
    ['/', 'index.html', 'index.html'],
    ['/platform', 'platform/index.html', 'platform'],
    [
      '/case-studies/stackademy',
      'case-studies/stackademy/index.html',
      'case-studies/stackademy',
    ],
  ])('%s is written to %s and uploaded to %s', (path, file, key) => {
    expect(outputFile(path)).toBe(file)
    expect(s3Key(path)).toBe(key)
  })
})

describe('splitHead', () => {
  test('separates the hoisted head tags from the body', () => {
    const { head, body } = splitHead(APP)
    expect(head).toHaveLength(5)
    expect(body).toBe('<div><h1>Platform</h1></div>')
  })

  test('a body with no head tags is left whole', () => {
    expect(splitHead('<div>x</div>')).toEqual({ head: [], body: '<div>x</div>' })
  })
})

describe('headKey', () => {
  test.each([
    ['<title>x</title>', 'title'],
    ['<meta name="description" content="x"/>', 'meta:description'],
    ['<meta\n      property="og:url"\n      content="x"\n    />', 'meta:og:url'],
    ['<link rel="canonical" href="x"/>', 'link:canonical'],
    ['<link rel="preload" as="image" href="x"/>', null],
    ['<meta charset="UTF-8" />', null],
  ])('%s is %s', (tag, key) => expect(headKey(tag)).toBe(key))
})

describe('assemble', () => {
  const html = assemble(TEMPLATE, APP, '/platform')

  test("puts the page's head tags in place of the defaults", () => {
    expect(html).toContain('<title>Smarter | Platform</title>')
    expect(html).not.toContain('Default title')
    expect(html).not.toContain('Default description')
    expect(html).not.toContain('content="Default"')
    expect(html.match(/<title>/g)).toHaveLength(1)
    expect(html).toContain(`${HEAD_START}<link rel="preload"`)
    expect(html).toContain(`canonical" href="https://smarter.sh/platform"/>${HEAD_END}`)
  })

  test('keeps the defaults the page does not set', () => {
    expect(html).toContain('<meta charset="UTF-8" />')
    expect(html).toContain('og:image')
  })

  test('renders the page into #root, marked with its path, without the splash screen', () => {
    expect(html).toContain(
      '<div id="root" data-prerendered="/platform"><div><h1>Platform</h1></div></div>'
    )
    expect(html).not.toContain('splash-screen')
  })

  test('fails when the template has no empty #root', () => {
    expect(() => assemble('<html><head></head><body></body></html>', APP, '/')).toThrow(
      /no empty <div id="root">/
    )
  })
})

describe('clearPrerender', () => {
  const load = () => {
    const html = assemble(TEMPLATE, APP, '/platform')
    document.documentElement.innerHTML = html.slice(html.indexOf('<head>'))
    return document.getElementById('root')
  }

  test('keeps the HTML when it was rendered for the url, to be hydrated', () => {
    const root = load()
    expect(clearPrerender(document, root, '/platform')).toBe(true)
    expect(root.querySelector('h1')).not.toBeNull()
    expect(document.title).toBe('Smarter | Platform')
  })

  test('removes the page and its head tags when it was rendered for another url', () => {
    const root = load()
    expect(clearPrerender(document, root, '/platform/')).toBe(false)
    expect(root.childNodes).toHaveLength(0)
    expect(root.dataset.prerendered).toBeUndefined()
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.querySelector('title')).toBeNull()
    expect(document.querySelector('meta[charset]')).not.toBeNull()
  })

  test('a page that was not pre-rendered (the dev server) is rendered by the app', () => {
    document.documentElement.innerHTML = '<head></head><body><div id="root"></div></body>'
    expect(clearPrerender(document, document.getElementById('root'), '/')).toBe(false)
  })
})
