import { DEFAULT_PAGE_TITLE } from '@/common/constants'
import { Helmet } from 'react-helmet-async'
const PageMetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? `Smarter | ${title}` : DEFAULT_PAGE_TITLE}</title>
    </Helmet>
  )
}
export default PageMetaData
