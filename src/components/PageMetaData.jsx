import { DEFAULT_PAGE_TITLE } from '@/common/constants'
import { Helmet } from 'react-helmet-async'
const PageMetaData = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title ? `Smarter | ${title}` : DEFAULT_PAGE_TITLE}</title>
      {/* index.html has the site's default description */}
      {description && <meta name="description" content={description} />}
    </Helmet>
  )
}
export default PageMetaData
