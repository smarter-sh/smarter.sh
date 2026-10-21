import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import SmartLink from '@/components/site/SmartLink'
import { DOCS, STACKADEMY } from '@/common/constants'
import { chat, layers, manifest } from './data'
import { WhatsNew as WhatsNewWidget } from '@smarter.sh/ui-widgets'
import ConsoleWidgets from '@/components/site/ConsoleWidgets'

const Platform = () => {
  return (
    <PageShell
      title="Platform"
      description="Everything Smarter does: assistants on any AI model, tools and data connections, guardrails, budgets and a complete record of every conversation."
    >
      <PageHero
        accent="primary"
        eyebrow="The platform"
        title="Everything AI needs,"
        highlight="in one governed place"
        lead="Every capability in Smarter, from an AI model to a spending limit, is a named resource with an owner, a budget and a history. That is what makes AI manageable."
      >
        {layers.map((layer) => (
          <Button key={layer.id} href={`#${layer.id}`} variant="secondary">
            {layer.eyebrow}
          </Button>
        ))}
      </PageHero>

      <Section
        eyebrow="How it works"
        title="Describe it in plain text. Smarter does the rest."
        intro="An assistant is a short manifest that a trained analyst can read and change. It is versioned, reviewed and approved like any other business document, and the same file works from the web console, the command line or the API."
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="rounded-xl border-s-2 border-primary bg-code-bg shadow-card">
            <div className="border-b border-white/10 px-5 py-3 font-mono text-xs text-keen-500">
              hr-assistant.yaml
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-code-text">
              {manifest}
            </pre>
          </div>
          <div className="space-y-4 text-keen-700">
            <p>
              This is a complete assistant: it answers HR questions from the company
              handbook, removes personal data before anything reaches the AI vendor,
              rejects manipulation attempts, and blocks any reply that would leak a
              password.
            </p>
            <p>
              The handbook search and each guardrail are separate resources, often owned
              by different people: HR owns the content, security owns the guardrails, and
              IT owns the platform.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-code-bg px-4 py-3 font-mono text-sm text-orange-300">
              smarter apply -f hr-assistant.yaml
            </pre>
            <p>
              To see this in a whole project, clone or fork{' '}
              <SmartLink href={STACKADEMY} className="text-primary hover:underline">
                Stackademy
              </SmartLink>
              , two course advisors for a fictional code academy. No AI model knows its
              courses, so the advisors look them up, with tool calls to its own database
              and web API, and no code. Its assistants, tools, data connections, secrets
              and budget are all manifests in one GitHub repository, changed through pull
              requests and checked automatically. Every new Smarter platform loads it, so
              you can try the advisors first.
            </p>
          </div>
        </div>
      </Section>

      {layers.map((layer) => (
        <Section
          key={layer.id}
          id={layer.id}
          eyebrow={layer.eyebrow}
          accent={layer.accent}
          glow
          title={layer.title}
          intro={layer.intro}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {layer.features.map((feature) => (
              <FeatureCard key={feature.title} accent={layer.accent} {...feature} />
            ))}
          </div>
        </Section>
      ))}

      <Section
        eyebrow="What’s new"
        title="Recent additions to the platform"
        intro="Every Smarter release adds to the platform. These are some of the latest, each with its documentation."
      >
        <ConsoleWidgets rowClassName="justify-content-center">
          <div className="col-xl-10">
            <WhatsNewWidget />
          </div>
        </ConsoleWidgets>
      </Section>

      <Section eyebrow="Smarter Chat" title={chat.title} intro={chat.text}>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/#try-it" icon="lucide:message-circle">
            Try Euclid the math tutor
          </Button>
          <Button href="/integrations" variant="secondary" icon="lucide:globe">
            Put it on your website
          </Button>
          <Button href={chat.href} variant="secondary" icon="lucide:book-open">
            Documentation
          </Button>
        </div>
      </Section>

      <CtaBand
        title="See the whole picture"
        text="The documentation covers every resource in depth, including the security architecture and installation on your own infrastructure."
      >
        <Button href={`${DOCS}/smarter-resources.html`} icon="lucide:book-open">
          Resource documentation
        </Button>
        <Button
          href={`${DOCS}/smarter-platform/security-faq.html`}
          variant="secondary"
          icon="lucide:shield"
        >
          Security FAQ
        </Button>
      </CtaBand>
    </PageShell>
  )
}
export default Platform
