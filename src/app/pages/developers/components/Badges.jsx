const badges = [
  {
    href: 'https://github.com/smarter-sh/smarter/releases',
    src: 'https://img.shields.io/github/v/release/smarter-sh/smarter?style=flat&color=ea580c',
    alt: 'Latest release',
  },
  {
    href: 'https://github.com/smarter-sh/smarter/actions/workflows/build.yml',
    src: 'https://github.com/smarter-sh/smarter/actions/workflows/build.yml/badge.svg?branch=main',
    alt: 'Build status',
  },
  {
    href: 'https://github.com/smarter-sh/smarter/actions/workflows/test.yml',
    src: 'https://github.com/smarter-sh/smarter/actions/workflows/test.yml/badge.svg?branch=main',
    alt: 'Test status',
  },
  {
    href: 'https://codecov.io/gh/smarter-sh/smarter',
    src: 'https://img.shields.io/codecov/c/github/smarter-sh/smarter/main?flag=python&logo=codecov',
    alt: 'Code coverage',
  },
  {
    href: 'https://www.gnu.org/licenses/agpl-3.0',
    src: 'https://img.shields.io/badge/License-AGPL_v3-blue.svg',
    alt: 'License: GNU AGPL v3',
  },
  {
    href: 'https://hub.docker.com/r/mcdaniel0073/smarter',
    src: 'https://img.shields.io/docker/pulls/mcdaniel0073/smarter.svg?logo=docker&label=DockerHub',
    alt: 'Docker Hub pulls',
  },
  {
    href: 'https://artifacthub.io/packages/helm/project-smarter/smarter',
    src: 'https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/project-smarter',
    alt: 'Artifact Hub',
  },
  {
    href: 'https://github.com/smarter-sh/smarter/stargazers',
    src: 'https://img.shields.io/github/stars/smarter-sh/smarter?style=flat&color=ea580c',
    alt: 'GitHub stars',
  },
]

// The project's build, quality and distribution badges.
const Badges = () => {
  return (
    <div className="container">
      <div className="flex flex-wrap justify-center gap-2 opacity-90">
        {badges.map((badge) => (
          <a key={badge.alt} href={badge.href} target="_blank" rel="noopener noreferrer">
            <img src={badge.src} alt={badge.alt} style={{ maxWidth: '100%' }} />
          </a>
        ))}
      </div>
    </div>
  )
}
export default Badges
