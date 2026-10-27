import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import { chatbots } from '@/common/chatbots'
import SmartLink from '@/components/site/SmartLink'
import { DOCS, GITHUB } from '@/common/constants'
import ecosystem from '@/assets/images/smarter-ecosystem.svg'
import Badges from './components/Badges'
import { contribute, resources } from './data'
import { Contribute as ContributeWidget } from '@smarter.sh/ui-widgets'
import ConsoleWidgets from '@/components/site/ConsoleWidgets'

const Developers = () => {
  return (
    <PageShell
      title="Developers"
      description="Contribute to The Smarter Project: the source code, the developer guides, and an assistant that answers questions from the code."
    >
      <PageHero
        accent="amber"
        eyebrow="For contributors"
        title="Help build"
        highlight="Smarter"
        lead="Smarter is an open-source Django platform, with React apps, a Go CLI, three SDKs and a family of integrations. Everything is public, and contributions of every size are welcome."
      >
        <Button href={`${GITHUB}/smarter`} icon="lucide:github">
          smarter-sh/smarter
        </Button>
        <Button
          href="#smarter-developer"
          variant="secondary"
          icon="lucide:message-circle"
        >
          Ask the Smarter Developer
        </Button>
      </PageHero>
      <Badges />

      <Section accent="amber" eyebrow="Get involved" title="Start contributing">
        <ConsoleWidgets>
          <div className="col-12">
            <ContributeWidget />
          </div>
        </ConsoleWidgets>
        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {contribute.map((item) => (
            <FeatureCard accent="amber" key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section
        accent="amber"
        id="smarter-developer"
        eyebrow="Built on Smarter"
        title="Ask the Smarter Developer"
        intro="Sam is a staff engineer of the project who answers from Smarter’s source code and documentation, through the project’s own MCP server, and shows you the code."
      >
        <div className="mx-auto min-h-[560px] max-w-4xl">
          <SmarterChatEmbed bot={chatbots.developer} />
        </div>
      </Section>

      <Section
        accent="amber"
        eyebrow="Resources"
        title="A complete developer ecosystem"
        intro="Around the platform is a family of open-source packages, each published to the registry its users already know: PyPI, npm, Homebrew, APT, Chocolatey, the VS Code Marketplace, Docker Hub, Artifact Hub and Go modules. Every one is a client of the same Smarter API and its OpenAPI contract, or a building block that they share."
      >
        <figure className="mx-auto mb-12 max-w-5xl">
          <SmartLink href={`${DOCS}/smarter-framework.html`}>
            <img
              src={ecosystem}
              alt="The Smarter platform at the center, surrounded by its open-source packages: the CLI and VS Code extension, the Python, Go and Node.js SDKs, the shared Python libraries smarter-types and cache-results, the npm chat and widget components, the website integrations, Smarter Extensions, and the platform's Docker image and Helm chart."
              className="h-auto w-full rounded-xl shadow-card"
              loading="lazy"
            />
          </SmartLink>
        </figure>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((item) => (
            <FeatureCard
              accent="amber"
              key={item.name}
              icon={item.icon}
              title={item.name}
              text={item.detail}
              href={item.url}
              linkText={item.link_text}
            />
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
export default Developers
