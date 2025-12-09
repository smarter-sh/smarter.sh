import GlightBox from '@/components/GlightBox'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-20 pt-40"
      data-aos="zoom-out"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="-z-1 absolute start-80 top-1/2 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none bg-primary/10" />
      <div className="-z-1 absolute end-80 top-1/2 h-14 w-14 animate-ping rounded-full bg-primary/20" />
      <div className="conainer">
        <div className="text-center">
          <div className="mt-6 flex justify-center">
            <div className="max-w-6xl">
              <h1 className="mb-6 text-5xl/tight font-medium text-default-100">
                The <span className="text-primary">Smarter</span> Project
              </h1>
              <p className="mx-auto text-base font-medium text-default-300 lg:max-w-xl">
                A declarative AI resource management platform and developer framework.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
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
                  href="https://github.com/smarter-sh/smarter/actions/workflows/deploy.yml"
                >
                  <img
                    src="https://github.com/smarter-sh/smarter/actions/workflows/deploy.yml/badge.svg?branch=main"
                    alt="Release Status"
                    style={{ maxWidth: '100%' }}
                  />
                </a>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://smarter.readthedocs.io/"
                >
                  <img
                    src="https://readthedocs.org/projects/smarter/badge/?version=latest"
                    alt="Documentation Status"
                    style={{ maxWidth: '100%' }}
                  />
                </a>

                <a href="https://www.gnu.org/licenses/agpl-3.0" rel="nofollow">
                  <img
                    src="https://img.shields.io/badge/License-AGPL_v3-blue.svg"
                    alt="License: GNU AGPL v3"
                    style={{ maxWidth: '100%' }}
                  />
                </a>
              </div>
              <div className="dockerhub flex flex-wrap justify-center gap-2 mt-4">
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
d                     alt="Artifact Hub"
                    style={{ maxWidth: '100%' }}
                  />
                </a>
              </div>
              <div className="python flex flex-wrap justify-center gap-2 mt-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/smarter-sh/smarter/blob/main/pyproject.toml"
                >
                  <img
                    src="https://img.shields.io/badge/python-3.10%2B-blue"
                    alt="Python 3.10+"
                    style={{ maxWidth: '100%' }}
                  />
                </a>

                <a target="_blank" rel="noopener noreferrer" href="https://pydantic.dev/">
                  <img
                    src="https://img.shields.io/badge/pydantic-2.9-green"
                    alt="Pydantic 2.9"
                    style={{ maxWidth: '100%' }}
                  />
                </a>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.django-rest-framework.org/"
                >
                  <img
                    src="https://img.shields.io/badge/DRF-3.15-orange"
                    alt="Django REST Framework 3.15"
                    style={{ maxWidth: '100%' }}
                  />
                </a>
              </div>
              <div className="readthedocs flex flex-wrap justify-center gap-2 mt-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.smarter.sh/"
                >
                  <img
                    src="https://img.shields.io/badge/Read%20the%20Docs-Smarter-blue?logo=readthedocs"
                    alt="Read the Docs"
                    style={{ maxWidth: '100%' }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <GlightBox
              href="https://www.youtube.com/embed/KmhkZ6TN32I"
              title="YouTube video player"
            >
              <button
                data-hs-overlay="#watchvideomodal"
                className="relative mx-auto mt-10 flex items-center justify-center gap-2.5 rounded-full bg-primary/40 px-6 py-3.5 text-base font-medium text-white ring-4 ring-primary/25 transition-all duration-300 hover:bg-primary"
              >
                <IconifyIcon icon="lucide:play" className="h-6 w-6" />
                Watch Video
              </button>
            </GlightBox>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero
