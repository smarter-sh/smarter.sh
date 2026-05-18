import { Link } from 'react-router-dom'
import { footerLinks } from '../data'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { default as BaseFooter } from '@/components/Footer'
const Footer = () => {
  const socialIcons = [
    { icon: 'lucide:github', url: 'https://github.com/smarter-sh/' },
    { icon: 'lucide:twitter', url: 'https://twitter.com/' },
    { icon: 'lucide:linkedin', url: 'https://www.linkedin.com/in/lawrencemcdaniel/' },
  ]
  return (
    <footer
      className="bg-default-950/40 backdrop-blur-3xl"
      data-aos="zoom-in"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="container py-20 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {footerLinks.map((item, idx) => (
            <div key={idx}>
              <ul className="flex flex-col gap-3">
                <h5 className="mb-2 font-medium text-default-200 lg:text-lg xl:text-xl">
                  {item.title}
                </h5>
                {item.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.url ?? ''}
                      className="text-base text-default-300 transition-all hover:text-white"
                    >
                      <IconifyIcon
                        icon="lucide:gauge-circle"
                        className="me-2 inline-block h-4 w-4"
                      />{' '}
                      {link.name}
                    </Link>
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
export default Footer
