/*
 * The site's pre-rendering: every page in src/routes/pages.js is rendered to HTML when the site is
 * built (scripts/prerender.mjs), so that search engines, link previews and AI crawlers read the
 * page's content, title, description and canonical url without running JavaScript. In the browser,
 * src/main.jsx hydrates that HTML instead of rendering the page again.
 *
 * Plain JavaScript, without JSX, so that the prerender script can import it in Node.
 */
import { pages } from './pages.js'

// The marker comments around the head tags that a page's render added, so that the browser can
// remove them when it renders a different page than the one in the HTML (see clearPrerender).
export const HEAD_START = '<!--prerender-head-->'
export const HEAD_END = '<!--/prerender-head-->'

// The paths that are pre-rendered: every page, but not the redirects, which the router handles.
export const prerenderPaths = () => pages.map((page) => page.path)

// Where the build writes a page's HTML in dist/: dist/index.html for the home page, and
// dist/<path>/index.html for the others, which `vite preview` serves at /<path>.
export const outputFile = (path) =>
  path === '/' ? 'index.html' : `${path.slice(1)}/index.html`

// The S3 key a page's HTML is uploaded to (release.js). CloudFront asks the bucket for the url's path
// as is, e.g. case-studies/stackademy, so each page is uploaded to that key, with no extension.
export const s3Key = (path) => (path === '/' ? 'index.html' : path.slice(1))

// React 19 renders a page's <title>, <meta> and <link> elements (PageMetaData) ahead of its body,
// for the document's <head>. Returns those leading tags and the body that follows them.
const HOISTED = /^(?:<title>[\s\S]*?<\/title>|<(?:meta|link|base)\b[^>]*>)/
export const splitHead = (html) => {
  const tags = []
  let rest = html
  for (let match = rest.match(HOISTED); match; match = rest.match(HOISTED)) {
    tags.push(match[0])
    rest = rest.slice(match[0].length)
  }
  return { head: tags, body: rest }
}

const attribute = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]

// What a head tag sets, e.g. "title", "meta:description" or "meta:og:url", so that a page's own
// tag replaces index.html's default of the same kind. null for tags that can repeat.
export const headKey = (tag) => {
  if (/^<title>/.test(tag)) return 'title'
  if (/^<meta\b/.test(tag)) {
    const key = attribute(tag, 'name') ?? attribute(tag, 'property')
    return key ? `meta:${key}` : null
  }
  if (/^<link\b/.test(tag) && attribute(tag, 'rel') === 'canonical')
    return 'link:canonical'
  return null
}

const TEMPLATE_HEAD_TAG = /<title>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*>/g
const SPLASH = /\s*<div id="splash-screen">[\s\S]*?<\/div>/

/*
 * A page's whole document: the built index.html with the page's rendered HTML in #root, and its head
 * tags in place of index.html's defaults of the same kind (its title, description, ...). #root names
 * the path it was rendered for, which src/main.jsx compares with the url before it hydrates. The
 * splash screen is removed: it covers the page until #root changes, which hydration never does.
 */
export const assemble = (template, appHtml, path) => {
  const { head, body } = splitHead(appHtml)
  const replaced = new Set(head.map(headKey).filter(Boolean))
  const html = template
    .replace(TEMPLATE_HEAD_TAG, (tag) => (replaced.has(headKey(tag)) ? '' : tag))
    .replace('</head>', `${HEAD_START}${head.join('')}${HEAD_END}\n  </head>`)
    .replace(SPLASH, '')
    .replace(
      /<div id="root"><\/div>/,
      () => `<div id="root" data-prerendered="${path}">${body}</div>`
    )
  if (!html.includes(`data-prerendered="${path}"`)) {
    throw new Error('prerender: index.html has no empty <div id="root"></div>')
  }
  return html
}

/*
 * In the browser, when the HTML was rendered for another path than the url's, e.g. index.html, which
 * CloudFront serves for any url that has no page of its own: removes the rendered page and its head
 * tags, so that the app renders the url's page from scratch. Returns whether the HTML can be
 * hydrated instead.
 */
export const clearPrerender = (doc, root, pathname) => {
  if (root.dataset.prerendered === pathname) return true
  let inside = false
  for (const node of [...doc.head.childNodes]) {
    const marker = node.nodeType === 8 ? `<!--${node.data}-->` : null
    if (marker === HEAD_START) inside = true
    if (inside) node.remove()
    if (marker === HEAD_END) inside = false
  }
  root.replaceChildren()
  delete root.dataset.prerendered
  return false
}
