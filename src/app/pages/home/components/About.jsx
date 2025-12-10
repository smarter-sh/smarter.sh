import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { about } from '../data'
import { Link } from 'react-router-dom'
import { cn } from '@/helpers/cn'
const About = () => {
  return (
    <section
      id=""
      className="py-20"
      data-aos="zoom-in"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Manage AI resources without coding.
            </h2>
            <p className="text-sm font-medium text-default-200">
              Empower your enterprise domain experts to build AI workflows—without writing
              Python. Smarter uses intuitive YAML manifests to standardize database and
              API integrations for RAG and advanced Tool calls, while enforcing
              resource limits, logging, and moderation controls. It provides the
              foundation for safe, secure, scalable, and auditable agentic AI across
              teams.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.map((tool, idx) => (
            <div className="rounded-xl bg-default-950/40 backdrop-blur-3xl" key={idx}>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className={cn(
                      'inline-flex h-10 w-10 items-center justify-center rounded-lg',
                      tool.iconClass
                    )}
                  >
                    <IconifyIcon icon={tool.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-default-200">{tool.name}</h3>
                </div>
                <div className="mb-6">
                  <p>{tool.detail}</p>
                </div>
                <Link
                  to={tool.url}
                  className="group relative inline-flex items-center gap-2 text-primary"
                >
                  <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w-full" />
                  {tool.link_text}{' '}
                  <IconifyIcon icon="lucide:move-right" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover">
            More Tools <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
export default About
