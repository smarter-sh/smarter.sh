import { DEFAULT_PAGE_TITLE } from '@/common/constants'
import { canonicalUrl } from '@/routes/pages'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

// Every page's title, description and canonical url. index.html is served for every path, so the
// canonical url is set here, per page, or search engines would treat every page as the home page.
const PageMetaData = ({ title, description }) => {
  const { pathname } = useLocation()
  const url = canonicalUrl(pathname)
  return (
    <Helmet>
      <title>{title ? `Smarter | ${title}` : DEFAULT_PAGE_TITLE}</title>
      {/* index.html has the site's default description */}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    </Helmet>
  )
}
export default PageMetaData
