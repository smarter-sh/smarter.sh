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
              Build AI That Your Organization Can Trust
            </h2>
            <p className="text-sm font-medium text-default-200">
              Smarter gives teams governance, visibility, and control over AI
              resources from design to deployment. Standardize prompts,
              plugins, and private data integrations using declarative
              manifests and reusable components that scale across your
              organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About
