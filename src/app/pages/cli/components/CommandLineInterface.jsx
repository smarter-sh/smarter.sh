
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faWindows, faLinux } from '@fortawesome/free-brands-svg-icons'

const OSCard = ({ icon, operating_system, download_instructions, more_link }) => (
  <div className="w-auto grow border-b border-white/10 md:w-1/3 md:border-e:last md:border-b-0">
    <div className="p-8 sm:p-10">
      <div className="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FontAwesomeIcon icon={icon} className="h-10 w-10" />
      </div>
      <h2 className="mb-4 text-2xl font-medium text-white">{operating_system}</h2>
      <p className="mb-6 text-base text-default-200">{download_instructions}</p>
      <a
        href={more_link}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
      >
        More Tools
      </a>
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
        <div className="flex flex-wrap items-center rounded-3xl bg-default-950/40 backdrop-blur-3xl">
          <OSCard
            icon={faApple}
            operating_system="Mac"
            download_instructions="Download and install the latest smarter.sh for macOS."
            more_link="#mac"
          />
          <OSCard
            icon={faWindows}
            operating_system="Windows"
            download_instructions="Download and install the latest smarter.sh for Windows."
            more_link="#windows"
          />
          <OSCard
            icon={faLinux}
            operating_system="Linux"
            download_instructions="Download and install the latest smarter.sh for Linux."
            more_link="#linux"
          />
        </div>
      </div>
    </section>
  );
}

export default CommandLineInterface;
