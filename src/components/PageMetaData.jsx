import { DEFAULT_PAGE_TITLE } from '@/common/constants'
import { canonicalUrl } from '@/routes/pages'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

// Every page's title, description and canonical url, and the same for link previews (Open Graph,
// X). Each page's pre-rendered HTML (scripts/prerender.mjs) has these in place of index.html's
// defaults, so that search engines and link previews see the page's own, not the home page's.
const PageMetaData = ({ title, description }) => {
  const { pathname } = useLocation()
  const url = canonicalUrl(pathname)
  const fullTitle = title ? `Smarter | ${title}` : DEFAULT_PAGE_TITLE
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} />
      <meta name="twitter:title" content={fullTitle} />
      {/* index.html has the site's default description */}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    </Helmet>
  )
}
export default PageMetaData
