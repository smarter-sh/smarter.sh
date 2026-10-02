import GlightBox from '@/components/GlightBox'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const highlights = [
  { icon: 'lucide:github', text: 'Open source' },
  { icon: 'lucide:badge-dollar-sign', text: 'Free' },
  { icon: 'lucide:server', text: 'Self-hosted' },
]

const Hero = () => {
  return (
    <>
      <style>
        {`
        .glightbox-clean .gdesc-inner {
          padding: 5px;
        }
        .glightbox-clean .gslide-title {
          margin-bottom: 0px;
        }
      `}
      </style>
      <section
        id="home"
        className="relative overflow-hidden pb-20 pt-40"
        data-aos="zoom-out"
        data-aos-easing="ease"
        data-aos-duration={1000}
      >
        <div className="-z-1 absolute start-80 top-1/2 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none bg-primary/10" />
        <div className="-z-1 absolute end-80 top-1/2 h-14 w-14 animate-ping rounded-full bg-primary/20" />
        <div className="container">
          <div className="text-center">
            <div className="mt-6 flex justify-center">
              <div className="max-w-4xl">
                <h1 className="mb-6 text-5xl/tight font-medium text-default-100">
                  The <span className="text-primary">Smarter</span> Project
                </h1>
                <p className="mx-auto mb-4 text-xl font-medium text-default-200 lg:max-w-2xl">
                  Secure, declarative AI resource management for teams that
                  runs at scale.
                </p>
                <p className="mx-auto text-base text-default-300 lg:max-w-2xl">
                  Build sophisticated AI applications — chatbots, assistants
                  and agents that work with your own data — by describing them
                  in a short text file. No programming required.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {highlights.map((item) => (
                    <span
                      key={item.text}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-default-100"
                    >
                      <IconifyIcon icon={item.icon} className="h-4 w-4 text-primary" />
                      {item.text}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://docs.smarter.sh/smarter-platform/installation/quick-start.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-primary/80"
                  >
                    <IconifyIcon icon="lucide:rocket" className="h-5 w-5" />
                    Get started
                  </a>
                  <a
                    href="https://docs.smarter.sh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-default-200/40 px-6 py-3 text-base font-medium text-default-100 transition-all duration-300 hover:border-primary hover:text-primary"
                  >
                    <IconifyIcon icon="lucide:book-open" className="h-5 w-5" />
                    Read the docs
                  </a>
                  <GlightBox
                    href="https://youtu.be/bfePkGzKAvw?si=HleMgMYnZMz_wuX2"
                    title="Smarter LLM Tool Integrations for SQL"
                    autoplayVideos={true}
                    type="video"
                    description="Smarter is an open source, self-hosted platform for building secure AI applications from declarative YAML manifests."
                  >
                    <button
                      data-hs-overlay="#watchvideomodal"
                      className="inline-flex items-center gap-2 rounded-full bg-primary/40 px-6 py-3 text-base font-medium text-white ring-4 ring-primary/25 transition-all duration-300 hover:bg-primary"
                    >
                      <IconifyIcon icon="lucide:play" className="h-5 w-5" />
                      Watch video
                    </button>
                  </GlightBox>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-2 opacity-80">
                  <a href="https://www.gnu.org/licenses/agpl-3.0" rel="nofollow">
                    <img
                      src="https://img.shields.io/badge/License-AGPL_v3-blue.svg"
                      alt="License: GNU AGPL v3"
                      style={{ maxWidth: '100%' }}
                    />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/smarter-sh/smarter/actions/workflows/build.yml"
                  >
                    <img
                      src="https://github.com/smarter-sh/smarter/actions/workflows/build.yml/badge.svg?branch=main"
                      alt="Build Status"
                      style={{ maxWidth: '100%' }}
                    />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/smarter-sh/smarter/actions/workflows/test.yml"
                  >
                    <img
                      src="https://github.com/smarter-sh/smarter/actions/workflows/test.yml/badge.svg?branch=main"
                      alt="Test Status"
                      style={{ maxWidth: '100%' }}
                    />
                  </a>
                  <a href="https://hub.docker.com/r/mcdaniel0073/smarter" rel="nofollow">
                    <img
                      src="https://img.shields.io/docker/pulls/mcdaniel0073/smarter.svg?logo=docker&label=DockerHub"
                      alt="DockerHub"
                      style={{ maxWidth: '100%' }}
                    />
                  </a>
                  <a
                    href="https://artifacthub.io/packages/helm/project-smarter/smarter"
                    rel="nofollow"
                  >
                    <img
                      src="https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/project-smarter"
                      alt="Artifact Hub"
                      style={{ maxWidth: '100%' }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Hero
