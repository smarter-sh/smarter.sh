
import StaticCDNPage from '@/components/StaticCdnPage'
import { CDN } from '@/common/constants'

const PrivacyPolicyPage = () => {
  return (
    <StaticCDNPage
      title="Privacy Policy"
      url={`${CDN}/legal/privacy.txt`}
    />
  )
}

export default PrivacyPolicyPage
