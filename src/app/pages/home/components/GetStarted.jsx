import IconifyIcon from '@/components/wrappers/IconifyIcon'

const steps = [
  {
    icon: 'lucide:rocket',
    title: 'Try it on your laptop',
    detail: 'Run Smarter locally with Docker in about ten minutes.',
    link_text: 'Quick start',
    url: 'https://docs.smarter.sh/smarter-platform/installation/quick-start.html',
  },
  {
    icon: 'lucide:book-open',
    title: 'Read the docs',
    detail: 'Guides for building, administering and deploying Smarter.',
    link_text: 'docs.smarter.sh',
    url: 'https://docs.smarter.sh/',
  },
  {
    icon: 'lucide:github',
    title: 'Join the project',
    detail: 'Smarter is free and open source under the AGPL-3.0 license.',
    link_text: 'View on GitHub',
    url: 'https://github.com/smarter-sh/smarter',
  },
]

const GetStarted = () => {
  return (
    <section
      id="get-started"
      className="py-20"
      data-aos="fade-up"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-medium text-white">Get started</h2>
          <p className="text-base font-medium text-default-200">
            Smarter runs on your own infrastructure. Your data stays yours.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-default-800 bg-default-950/40 p-6 text-center backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 hover:border-primary"
            >
              <IconifyIcon icon={item.icon} className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-medium text-white">{item.title}</h3>
              <p className="mb-4 text-sm text-default-300">{item.detail}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary">
                {item.link_text}
                <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
export default GetStarted
