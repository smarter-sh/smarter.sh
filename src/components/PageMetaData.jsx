import { DEFAULT_PAGE_TITLE } from '@/common/constants'
import { Helmet } from 'react-helmet-async'
const PageMetaData = ({ title }) => {
  return (
    <Helmet>
      <title>
        {title
          ? `${title} | WebAI React - AI Startup & Technology Landing Page Template`
          : DEFAULT_PAGE_TITLE}
      </title>
    </Helmet>
  )
}
export default PageMetaData
