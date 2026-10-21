import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { COMMUNITY } from '@/common/constants'
import euclid from '@/assets/images/screens/euclid-chalkboard.webp'

const highlights = [
  { icon: 'lucide:github', text: 'Free and open source' },
  { icon: 'lucide:server', text: 'Runs on your infrastructure' },
  { icon: 'lucide:graduation-cap', text: 'In teaching use at UBC' },
]

// The landing page's first card, in the style of the web console's illustrated widgets: the
// message on the left, and an assistant built on Smarter on the right.
const Hero = () => {
  return (
    <div className="col-12">
      <section
        id="home"
        aria-label="The Smarter Project"
        className="card border-transparent home-hero"
      >
        <div className="card-body p-8 p-lg-12">
          <div className="row g-10 align-items-center">
            <div className="col-lg-6">
              <span className="home-eyebrow">The Smarter Project</span>
              <h1 className="home-hero-title fw-bold text-white mt-5 mb-5">
                <span className="home-learn">Learn</span> AI.{' '}
                <span className="home-build">Build</span> with AI.{' '}
                <span className="home-govern">Govern</span> AI.
              </h1>
              <p className="fs-4 home-lede mb-6">
                One open-source platform that takes your organization from its first AI
                lesson to governed, production AI, on infrastructure you own.
              </p>
              <ul className="home-highlights">
                {highlights.map((item) => (
                  <li key={item.text}>
                    <IconifyIcon icon={item.icon} width={16} height={16} />
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="d-flex flex-wrap gap-3 mt-8">
                <a href="#what-is-smarter" className="btn fw-semibold home-btn-brand">
                  What is Smarter?
                </a>
                <a
                  href={COMMUNITY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn fw-semibold home-btn-white"
                >
                  Join the community
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="home-hero-shot">
                <img
                  src={euclid}
                  alt="Euclid, a math tutor built on Smarter, explaining the roots and vertex of a parabola on a chalkboard"
                />
                <span className="home-callout home-callout-top">
                  <IconifyIcon icon="lucide:sigma" width={16} height={16} />
                  Typeset math, diagrams and plots
                </span>
                <span className="home-callout home-callout-bottom">
                  <span className="home-callout-label">This answer</span>
                  2,724 tokens · costed and recorded
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Hero
