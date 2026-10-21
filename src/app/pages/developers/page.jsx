import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import { chatbots } from '@/common/chatbots'
import { GITHUB } from '@/common/constants'
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

      <Section accent="amber" eyebrow="Resources" title="A complete developer ecosystem">
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
