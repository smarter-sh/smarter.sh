import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { COMMUNITY, DOCS } from '@/common/constants'

const highlights = [
  { icon: 'lucide:github', text: 'Free and open source' },
  { icon: 'lucide:server', text: 'Runs on your infrastructure' },
  { icon: 'lucide:graduation-cap', text: 'In teaching use at UBC' },
]

// The courses of the Free Course Catalog that the Learn card lists, each linked to its page.
const MICRO_COURSES = `${DOCS}/smarter-instructors/example-courses/micro-courses`
const courses = [
  { name: 'Prompt engineering', url: `${MICRO_COURSES}/prompt-engineering.html` },
  { name: 'AI governance', url: `${MICRO_COURSES}/ai-governance.html` },
  { name: 'AI economics', url: `${MICRO_COURSES}/ai-economics.html` },
]

// The first lines of a manifest that ships with Smarter, the Weather assistant's
// (smarter/apps/llmclient/data/llm-clients/llmclient-weather.yaml), as [key, value] lines.
const manifest = [
  ['apiVersion', 'smarter.sh/v1'],
  ['kind', 'LLMClient'],
  ['metadata', null],
  ['  name', 'weather'],
  ['spec', null],
  ['  extensions', '[weather]'],
  ['  plugins', '[image_search]'],
  ['  guardrails', '[prompt_injection_keyword_input]'],
]

// What the journal keeps of one answer.
const record = [
  { icon: 'lucide:shield-check', label: 'Guardrail', value: 'prompt injection: passed' },
  { icon: 'lucide:wrench', label: 'Tool call', value: 'ext_weather_get_weather' },
  { icon: 'lucide:coins', label: 'Tokens', value: '2,724, costed' },
  { icon: 'lucide:gauge', label: 'Budget', value: 'within its monthly cap' },
]

// The platform as one picture: three cards, one for each of the headline's words.
const PlatformCards = () => (
  <div className="home-platform" aria-label="What Smarter does" role="group">
    <div className="home-platform-card home-platform-learn">
      <div className="home-platform-head">
        <span className="home-learn">Learn</span>
        <span>Free course designs, for instructors</span>
      </div>
      <ul className="home-platform-courses">
        {courses.map((course) => (
          <li key={course.name}>
            <a href={course.url} target="_blank" rel="noopener noreferrer">
              <IconifyIcon icon="lucide:book-open" width={14} height={14} />
              {course.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="home-platform-card home-platform-build">
      <div className="home-platform-head">
        <span className="home-build">Build</span>
        <span>An assistant is a manifest</span>
      </div>
      <pre className="home-platform-yaml">
        {manifest.map(([key, value]) => (
          <div key={key}>
            <span className="home-yaml-key">{key}:</span>
            {value && <span className="home-yaml-value"> {value}</span>}
          </div>
        ))}
        <div className="home-yaml-command">
          <span className="home-yaml-prompt">$</span> smarter apply -f weather.yaml
        </div>
      </pre>
    </div>
    <div className="home-platform-card home-platform-govern">
      <div className="home-platform-head">
        <span className="home-govern">Govern</span>
        <span>Every answer, recorded</span>
      </div>
      <dl className="home-platform-record">
        {record.map((item) => (
          <div key={item.label}>
            <dt>
              <IconifyIcon icon={item.icon} width={14} height={14} />
              {item.label}
            </dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
)

// The landing page's first card, in the style of the web console's illustrated widgets: the
// message on the left, and the platform, learn, build and govern, on the right.
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
              <PlatformCards />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Hero
