import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faWindows, faLinux } from '@fortawesome/free-brands-svg-icons'

const OSCard = ({ icon, operating_system, download_instructions, more_link }) => (
  <div className="flex-1 min-w-0 border-b border-white/10 md:border-e last:md:border-e-0 md:border-b-0">
    <div className="p-8 sm:p-10">
      <div className="mb-10 flex w-full items-center justify-center">
        <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
          <FontAwesomeIcon icon={icon} className="h-10 w-10" />
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-medium text-white text-center">{operating_system}</h2>
<pre
  className="mb-6 text-xs text-default-200 w-full px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 rounded-xl bg-default-900/60 font-mono leading-normal overflow-x-auto"
  style={{ whiteSpace: 'pre', fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
>
  {download_instructions}
</pre>
    </div>
  </div>
)

const CommandLineInterface = () => {
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
              Operating Systems
            </h2>
            <p className="text-sm font-medium text-default-200">
              Download smarter.sh for your OS below.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap items-center rounded-3xl bg-default-950/40 backdrop-blur-3xl">
          <OSCard
            icon={faApple}
            operating_system="Mac"
            download_instructions={`choco install smarter`}
            more_link="#mac"
          />
          <OSCard
            icon={faWindows}
            operating_system="Windows"
            download_instructions={`brew tap smarter-sh/homebrew-tap\nbrew install smarter`}
            more_link="#windows"
          />
          <OSCard
            icon={faLinux}
            operating_system="Linux"
            download_instructions={`brew tap smarter-sh/homebrew-tap\nbrew install smarter`}
            more_link="#linux"
          />
        </div>
      </div>
    </section>
  )
}

export default CommandLineInterface
