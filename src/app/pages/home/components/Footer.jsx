import { Link } from 'react-router-dom'
import { footerLinks } from '../data'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { default as BaseFooter } from '@/components/Footer'
const Footer = () => {
  const socialIcons = ['lucide:github', 'lucide:twitter', 'lucide:linkedin']
  return (
    <footer
      className="bg-default-950/40 backdrop-blur-3xl"
      data-aos="zoom-in"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="container py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-16">
          {footerLinks.map((item, idx) => (
            <div className="col-span-2 sm:col-span-1 lg:col-span-3" key={idx}>
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
          <div className="col-span-2 lg:col-span-6">
            <div className="rounded-xl bg-primary/20">
              <div className="p-10">
                <h6 className="mb-4 text-xl text-white">Next Steps</h6>
                <p className="mb-6 text-base font-medium text-default-200">
                  Do you want me to contact you?
                </p>
                <form className="mb-6 space-y-2">
                  <label htmlFor="subcribe" className="text-base text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="subcribe"
                      className="h-12 w-full rounded-lg border-white/10 bg-default-950/60 py-4 pe-40 ps-4 text-white backdrop-blur-3xl focus:border-white/10 focus:ring-0"
                      placeholder="Enter your email :"
                      name="email"
                    />
                    <button
                      type="submit"
                      className="absolute end-[6px] top-[6px] inline-flex h-9 items-center justify-center gap-2 rounded-md border-primary bg-primary px-6 text-white transition-all hover:border-primary-hover hover:bg-primary-hover"
                    >
                      Submit
                      <IconifyIcon icon="lucide:move-right" className="h-4 w-4" />
                    </button>
                  </div>
                </form>
                <div>
                  <h6 className="mb-4 text-base text-white">Follow Project: smarter</h6>
                  <ul className="flex flex-wrap items-center gap-1">
                    {socialIcons.map((icon, idx) => (
                      <li key={idx}>
                        <Link
                          to=""
                          className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-all duration-500 hover:bg-primary"
                        >
                          <IconifyIcon
                            icon={icon}
                            className="h-5 w-5 text-default-300 group-hover:text-white"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BaseFooter />
    </footer>
  )
}
export default Footer
