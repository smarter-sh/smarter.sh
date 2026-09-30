import IconifyIcon from '@/components/wrappers/IconifyIcon'

const DOCS = 'https://docs.smarter.sh/'

const reasons = [
  {
    icon: 'lucide:file-code-2',
    title: 'No code. Just a manifest.',
    detail:
      'Domain experts, analysts and teachers can build sophisticated AI solutions without writing a single line of code.',
    url: `${DOCS}#no-code-just-a-manifest`,
  },
  {
    icon: 'lucide:database',
    title: 'Every way to reach your data',
    detail:
      'Connect AI to APIs, SQL databases, MCP servers, web search and your own documents.',
    url: `${DOCS}#every-way-to-reach-external-data`,
  },
  {
    icon: 'lucide:shield-check',
    title: 'Governed from the first prompt',
    detail:
      'Guardrails check every message going to the model and every reply coming back, with a complete audit trail.',
    url: `${DOCS}#governed-from-the-first-prompt`,
  },
  {
    icon: 'lucide:lock',
    title: 'Contained by design',
    detail:
      'Network isolation, role-based access and encrypted credentials keep AI inside the boundaries you set.',
    url: `${DOCS}#contained-by-design`,
  },
  {
    icon: 'lucide:network',
    title: 'Composed like an orchestra',
    detail:
      'Combine any model with the plugins, MCP clients and guardrails it needs, simply by listing them by name.',
    url: `${DOCS}#composed-like-an-orchestra`,
  },
  {
    icon: 'lucide:users',
    title: 'Built for teams, runs at scale',
    detail:
      'Share resources across your team. Start on a laptop with Docker, then scale on Kubernetes.',
    url: `${DOCS}#runs-at-scale-on-your-infrastructure`,
  },
]

const WhySmarter = () => {
  return (
    <section
      id="why-smarter"
      className="py-20"
      data-aos="fade-up"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-medium text-white">
            AI your organization can trust
          </h2>
          <p className="text-base font-medium text-default-200">
            Smarter gives you powerful AI, with control over what it can
            reach and what it can say.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border-s-2 border-primary bg-default-950/40 p-6 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <IconifyIcon icon={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">
                {item.title}
              </h3>
              <p className="text-sm text-default-300">{item.detail}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary opacity-80 group-hover:opacity-100">
                Learn more
                <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
export default WhySmarter
