import IconifyIcon from '@/components/wrappers/IconifyIcon'

const ServiceCard = ({ icon, title, description, link }) => (
  <div className="w-auto grow border-b border-white/10 md:w-1/2 md:border-e">
    <div className="p-8 sm:p-10">
      <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <IconifyIcon icon={icon} className="h-10 w-10" />
      </div>
      <h2 className="mb-4 text-2xl font-medium text-white">{title}</h2>
      <p className="mb-6 text-base text-default-200">{description}</p>
      <a
        href={link}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
      </a>
    </div>
  </div>
)

const services = [
  {
    icon: "lucide:code",
    title: "Customization",
    description: "Tailer Smarter to your specific needs with the help of a core committer to the project.",
    link: "https://lawrencemcdaniel.com/contact",
  },
  {
    icon: "lucide:codesandbox",
    title: "Installation",
    description: "Quick and hassle free. Get Smarter up and running on your infrastructure quickly with our expert installation services.",
    link: "https://lawrencemcdaniel.com/contact",
  },
  {
    icon: "lucide:graduation-cap",
    title: "Training",
    description: "We offer training programs for systems administrators and for prompt engineering teams.",
    link: "https://lawrencemcdaniel.com/contact",
  },
  {
    icon: "lucide:server",
    title: "Hosting",
    description: "We offer reliable and cost effective hosting solutions with service level agreements.",
    link: "https://lawrencemcdaniel.com/contact",
  },
]

const ProfessionalServices = () => {
  return (
    <section
      className="py-20"
      data-aos="zoom-out"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div id="services" className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Professional Services
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap items-center rounded-3xl bg-default-950/40 backdrop-blur-3xl">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}

        </div>
      </div>
    </section>
  )
}
export default ProfessionalServices
