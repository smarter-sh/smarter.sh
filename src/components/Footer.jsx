import { currentYear } from '@/common/constants'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="border-t border-keen-200 py-6">
      <div className="container flex h-full flex-wrap items-center justify-center gap-4 text-center md:justify-between md:text-start lg:px-20">
        <p className="text-sm font-mono font-medium text-keen-600">
          2023 - {currentYear} ©{' '}
          <a
            href="https://lawrencemcdaniel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lawrence P. McDaniel
          </a>
          , The Smarter Project
        </p>
        <p className="text-sm font-mono font-medium text-keen-600 flex flex-col md:flex-row gap-2">
          <a
            href="https://www.patreon.com/fullstackwithlawrence"
            className="hover:text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate
          </a>
        </p>
      </div>
    </div>
  )
}
export default Footer
