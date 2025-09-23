import IconifyIcon from '@/components/wrappers/IconifyIcon'
const ProfessionalServices = () => {
  return (
    <section
      className="py-20"
      data-aos="zoom-out"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div id='services' className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Professional Services
            </h2>
            <p className="text-sm font-medium text-default-200">
              Expert services to get Smarter up and running—tailored, trained, and
              optimized for your team.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center rounded-3xl bg-default-950/40 backdrop-blur-3xl">
          <div className="w-auto grow border-b border-white/10 md:w-1/2 md:border-e">
            <div className="p-8 sm:p-10">
              <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconifyIcon icon="lucide:code" className="h-10 w-10" />
              </div>
              <h2 className="mb-4 text-2xl font-medium text-white">Customization</h2>
              <p className="mb-6 text-base text-default-200">
                Tailor Smarter to your enterprise needs with bespoke workflows,
                integrations, and configurations.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
              >
                More Tools <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="w-auto grow border-b border-white/10 md:w-1/2">
            <div className="p-8 sm:p-10">
              <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconifyIcon icon="lucide:codesandbox" className="h-10 w-10" />
              </div>
              <h2 className="mb-4 text-2xl font-medium text-white">Installation</h2>
              <p className="mb-6 text-base text-default-200">
                Get up and running quickly with expert deployment on your infrastructure
                or in the cloud.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
              >
                More Tools <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="w-auto grow border-b border-white/10 md:w-1/2 md:border-b-0 md:border-e">
            <div className="p-8 sm:p-10">
              <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconifyIcon icon="lucide:graduation-cap" className="h-10 w-10" />
              </div>
              <h2 className="mb-4 text-2xl font-medium text-white">Training</h2>
              <p className="mb-6 text-base text-default-200">
                Empower your domain experts with hands-on training to confidently manage
                AI workflows without coding.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
              >
                More Tools <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="w-auto grow border-white/10 md:w-1/2">
            <div className="p-8 sm:p-10">
              <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconifyIcon icon="lucide:user-cog" className="h-10 w-10" />
              </div>
              <h2 className="mb-4 text-2xl font-medium text-white">Consulting</h2>
              <p className="mb-6 text-base text-default-200">
                Leverage our expertise to design, optimize, and scale AI solutions across
                your organization.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
              >
                More Tools <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ProfessionalServices
