
import StaticCDNPage from '@/components/StaticCdnPage'
import { CDN } from '@/common/constants'

const LegalPage = () => {
  return (
    <StaticCDNPage
      title="Legal Information"
      url={`${CDN}/legal/legal.txt`}
    />
  )
}

export default LegalPage
