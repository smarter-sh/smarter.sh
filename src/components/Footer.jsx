import { currentYear } from '@/common/constants'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="border-t border-white/10 py-6">
      <div className="container flex h-full flex-wrap items-center justify-center gap-4 text-center md:justify-between md:text-start lg:px-20">
        <p className="text-base font-medium text-default-400">
          {currentYear} © Project: smarter
        </p>
        <p className="text-base font-medium text-default-400">
          <Link to="">Terms Conditions &amp; Policy</Link>
        </p>
      </div>
    </div>
  )
}
export default Footer
