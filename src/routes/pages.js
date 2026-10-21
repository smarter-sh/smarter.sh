/*
 * The site's pages and redirects: the one list that both the router (src/routes/index.jsx) and the
 * sitemap (the sitemap plugin in vite.config.js) are built from, so that a new page is in both.
 *
 * Plain JavaScript, without JSX, so that vite.config.js can import it in Node.
 *
 * `page` is the folder of the page's component in src/app/pages. `sitemap: false` leaves a page out
 * of the sitemap, e.g. /home, which shows the same page as /.
 */

export const SITE_URL = 'https://smarter.sh'

export const pages = [
  { path: '/', name: 'root', page: 'home' },
  { path: '/home', name: 'Home', page: 'home', sitemap: false },
  { path: '/platform', name: 'Platform', page: 'platform' },
  { path: '/education', name: 'Education', page: 'education' },
  { path: '/extensions', name: 'Extensions', page: 'extensions' },
  { path: '/integrations', name: 'Integrations', page: 'integrations' },
  { path: '/sdks', name: 'SDKs', page: 'sdks' },
  {
    path: '/case-studies/stackademy',
    name: 'Case Study: Stackademy',
    page: 'case-studies/stackademy',
  },
  { path: '/cli', name: 'CLI', page: 'cli' },
  { path: '/about', name: 'About', page: 'about' },
  { path: '/developers', name: 'Developers', page: 'developers' },
  { path: '/tos', name: 'Terms of Service', page: 'tos' },
  { path: '/privacy', name: 'Privacy Policy', page: 'privacy' },
  { path: '/legal', name: 'Legal', page: 'legal' },
  { path: '/partners', name: 'Partners', page: 'partners' },
]

// old urls, which go to their page. Never in the sitemap.
export const redirects = [
  { path: '/terms-of-service/', to: '/tos' },
  { path: '/terms-of-service', to: '/tos' },
  { path: '/privacy-policy/', to: '/privacy' },
  { path: '/privacy-policy', to: '/privacy' },
]

// The paths that the sitemap lists.
export const sitemapPaths = () =>
  pages.filter((page) => page.sitemap !== false).map((page) => page.path)

// The sitemap, https://www.sitemaps.org/protocol.html. Without lastmod, which is optional, and which
// search engines use only when it's consistently accurate.
export const sitemapXml = (siteUrl = SITE_URL) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapPaths().map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')
