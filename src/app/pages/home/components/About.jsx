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
      </div>
    </section>
  )
}
export default About
