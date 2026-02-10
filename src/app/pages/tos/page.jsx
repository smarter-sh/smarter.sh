
import StaticCDNPage from '@/components/StaticCdnPage'
import { CDN } from '@/common/constants'

const TermsOfServicePage = () => {
  return (
    <StaticCDNPage
      title="Terms of Service"
      url={`${CDN}/legal/tos.txt`}
    />
  )
}

export default TermsOfServicePage
