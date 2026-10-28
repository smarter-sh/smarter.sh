import SmartLink from '@/components/site/SmartLink'
import { default as BaseFooter } from '@/components/Footer'
import { BLOG, DOCS, GITHUB, OPENAPI_DOCS, QUICK_START } from '@/common/constants'

export const footerLinks = [
  {
    title: 'Smarter',
    links: [
      { name: 'Why Smarter', url: '/' },
      { name: 'Platform', url: '/platform' },
      { name: 'For Education', url: '/education' },
      { name: 'Integrations', url: '/integrations' },
      { name: 'Case studies', url: '/case-studies' },
      { name: 'Partners', url: '/partners' },
      { name: 'Get started', url: QUICK_START },
    ],
  },
  {
    title: 'Build',
    links: [
      { name: 'SDKs and APIs', url: '/sdks' },
      { name: 'Extensions', url: '/extensions' },
      { name: 'Command-line interface', url: '/cli' },
      { name: 'API reference (OpenAPI)', url: OPENAPI_DOCS },
      { name: 'Documentation', url: `${DOCS}/` },
      {
        name: 'Free course designs',
        url: `${DOCS}/smarter-instructors/example-courses/index.html`,
      },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Contribute', url: '/developers' },
      { name: 'GitHub repositories', url: `${GITHUB}/` },
      { name: 'Discussions and support', url: `${GITHUB}/smarter/discussions` },
      { name: 'Report an issue', url: `${GITHUB}/smarter/issues` },
      { name: 'Release notes', url: `${GITHUB}/smarter/blob/main/CHANGELOG.md` },
      { name: 'Blog', url: BLOG },
    ],
  },
  {
    title: 'Project',
    links: [
      { name: 'Project origins', url: '/about' },
      { name: 'Sponsor Smarter', url: 'https://github.com/sponsors/lpm0073' },
      { name: 'Legal', url: '/legal' },
      { name: 'Privacy policy', url: '/privacy' },
      { name: 'Terms of service', url: '/tos' },
    ],
  },
]

const SiteFooter = () => {
  return (
    <footer className="mt-10 ml-[calc(50%-50vw)] w-screen border-t border-keen-200 bg-white">
      <div className="container py-16 lg:px-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h5 className="mb-4 font-semibold text-keen-900 lg:text-lg">
                {group.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <SmartLink
                      href={link.url}
                      className="text-sm font-medium text-keen-600 transition-all hover:text-primary"
                    >
                      {link.name}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <BaseFooter />
    </footer>
  )
}
export default SiteFooter
