import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import { DOCS, GITHUB } from '@/common/constants'
import { Extensions as ExtensionsWidget } from '@smarter.sh/ui-widgets'
import ConsoleWidgets from '@/components/site/ConsoleWidgets'

const R = `${DOCS}/smarter-resources`
const F = `${DOCS}/smarter-framework`

const ways = [
  {
    icon: 'lucide:file-code-2',
    title: 'Plugins: configured, not coded',
    text: 'A prompt engineer writes a short manifest that configures one of Smarter’s built-in tool patterns. Nothing is installed, and no code is written.',
    href: `${R}/smarter-llmtool.html`,
    badge: 'No code',
  },
  {
    icon: 'lucide:package',
    title: 'Extensions: coded in Python',
    text: 'A developer packages tools that do whatever Python can do. An administrator installs them at run time from the web console, much as WordPress installs plugins.',
    href: `${F}/smarter-extensions.html`,
    badge: 'Python',
  },
  {
    icon: 'lucide:cable',
    title: 'MCP servers: provided by others',
    text: 'Any Model Context Protocol server’s tools, your own or a vendor’s, become available to your assistants under the same governance.',
    href: `${R}/smarter-mcpclient.html`,
    badge: 'Third party',
  },
]

const plugins = [
  {
    icon: 'lucide:table',
    title: 'Static data',
    text: 'Answer from a fixed body of facts, such as office hours or a price list.',
    href: `${R}/llmtool/plugin/static.html`,
  },
  {
    icon: 'lucide:database',
    title: 'SQL',
    text: 'Query approved databases: MySQL, PostgreSQL, SQL Server, Oracle and others, with credentials kept as Secrets.',
    href: `${R}/llmtool/plugin/sql.html`,
  },
  {
    icon: 'lucide:webhook',
    title: 'REST API',
    text: 'Call your own web services and business systems, with typed, validated parameters.',
    href: `${R}/llmtool/plugin/api.html`,
  },
  {
    icon: 'lucide:scroll',
    title: 'Skills',
    text: 'Follow an Agent Skill (SKILL.md), written in the plugin or read from a GitHub repository.',
    href: `${R}/llmtool/plugin/skill.html`,
  },
  {
    icon: 'lucide:search',
    title: 'Web search',
    text: 'Search the web and read web pages, with the sources shown in the answer.',
    href: `${R}/llmtool/plugin/websearch.html`,
    badge: 'Experimental',
  },
  {
    icon: 'lucide:image',
    title: 'Image search',
    text: 'Find pictures and show them in the chat, beside the answer.',
    href: `${R}/llmtool/plugin/image-search.html`,
    badge: 'Experimental',
  },
]

const publish = [
  {
    icon: 'lucide:code',
    title: 'Write a tool',
    text: 'A tool is a Python class. Its docstring is what the AI reads, its Pydantic model is its parameters, and its call() method does the work. Smarter does the rest.',
    href: `${F}/extensions/developer-guide.html`,
    linkText: 'Developer guide',
  },
  {
    icon: 'lucide:badge-check',
    title: 'Publish a release',
    text: 'Attach the archive to a GitHub release and open a pull request on the registry. CI checks it; the signed index is rebuilt when it merges.',
    href: `${GITHUB}/extensions-registry`,
    linkText: 'Extension registry',
  },
  {
    icon: 'lucide:refresh-cw',
    title: 'Platforms update',
    text: 'Administrators see the extension, its publisher’s trust badge (official, verified or community), and are offered each update within a day.',
    href: `${F}/smarter-extensions.html`,
  },
]

const Extensions = () => {
  return (
    <PageShell
      title="Extensions"
      description="Give AI the tools it needs: no-code plugins, installable Python extensions from a signed registry, and any MCP server, all under the same governance."
    >
      <PageHero
        accent="violet"
        eyebrow="Extensibility"
        title="Give your assistants"
        highlight="the tools they need"
        lead="An AI model knows only what it was trained on. Tools let it look things up, query your systems and take actions. Smarter offers three ways to add them, from no code at all to full Python, and governs every one the same way."
      >
        <Button href={`${F}/extensibility.html`} icon="lucide:book-open">
          How tools work
        </Button>
        <Button
          href={`${GITHUB}/extensions-registry`}
          variant="secondary"
          icon="lucide:package-search"
        >
          Extension registry
        </Button>
      </PageHero>

      <Section accent="violet" eyebrow="Three ways" title="Configured, coded or provided">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ways.map((item) => (
            <FeatureCard accent="violet" key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section
        accent="violet"
        eyebrow="No-code plugins"
        title="Built-in tool patterns"
        intro="Each is a manifest that an analyst can write, share with colleagues, and list in any assistant."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plugins.map((item) => (
            <FeatureCard accent="violet" key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section
        accent="violet"
        eyebrow="Official extensions"
        title="Installable from the web console"
        intro="Published by the Smarter team in the signed Smarter Extension registry, each one is also a worked example of how to build your own."
      >
        <ConsoleWidgets>
          <div className="col-12">
            <ExtensionsWidget />
          </div>
        </ConsoleWidgets>
      </Section>

      <Section
        accent="violet"
        eyebrow="For developers"
        title="Build and publish an extension"
        intro="Extensions have their own settings, documentation, assets and release cycle, and they install without changing or redeploying the platform."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {publish.map((item) => (
            <FeatureCard accent="violet" key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section
        accent="violet"
        eyebrow="Model Context Protocol"
        title="Bring any MCP server"
        intro="Smarter is an MCP client: list an MCP server in an assistant’s manifest, and its tools are offered to the AI, with the platform’s guardrails, credentials handling and records. Smarter also runs its own MCP server, which gives assistants such as the Smarter SDK Guide their answers from the project’s code and documentation."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Button href={`${R}/smarter-mcpclient.html`} icon="lucide:cable">
            MCP clients
          </Button>
          <Button
            href={`${DOCS}/smarter-platform/smarter-project-mcp-server.html`}
            variant="secondary"
            icon="lucide:server"
          >
            The Smarter Project MCP server
          </Button>
        </div>
      </Section>

      <CtaBand
        title="Have a tool in mind?"
        text="Start from the weather extension, the reference example of the developer guide, and publish yours to the registry as a community extension."
      >
        <Button href={`${F}/extensions/developer-guide.html`} icon="lucide:book-open">
          Read the developer guide
        </Button>
        <Button href="/sdks" variant="secondary" icon="lucide:code-xml">
          SDKs and APIs
        </Button>
      </CtaBand>
    </PageShell>
  )
}
export default Extensions
