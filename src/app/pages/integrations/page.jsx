import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import { DOCS, GITHUB } from '@/common/constants'
import { UI_CHAT_VERSION } from '@/common/chatbots'
import { Integrations as IntegrationsWidget } from '@smarter.sh/ui-widgets'
import ConsoleWidgets from '@/components/site/ConsoleWidgets'

const F = `${DOCS}/smarter-framework`

const platforms = [
  {
    icon: 'simple-icons:wordpress',
    title: 'WordPress',
    text: 'A settings screen, a chat launcher on every page, a Smarter Chat block for the editor, and a [smarter_chat] shortcode.',
    href: `${F}/smarter-wordpress.html`,
    linkText: 'WordPress guide',
  },
  {
    icon: 'simple-icons:drupal',
    title: 'Drupal',
    text: 'A module for Drupal 10.3 and 11: a site-wide chat launcher and a Smarter Chat block for any region.',
    href: `${F}/smarter-drupal.html`,
    linkText: 'Drupal guide',
  },
  {
    icon: 'simple-icons:shopify',
    title: 'Shopify',
    text: 'A theme app extension: add the launcher and a Smarter Chat block to your store from the theme editor.',
    href: `${F}/smarter-shopify.html`,
    linkText: 'Shopify guide',
  },
  {
    icon: 'simple-icons:googletagmanager',
    title: 'Google Tag Manager',
    text: 'A tag template that adds an assistant to any site with a GTM container, with consent settings, and no change to the site.',
    href: `${F}/smarter-gtm.html`,
    linkText: 'Tag Manager guide',
  },
]

const docsSites = [
  {
    icon: 'simple-icons:docusaurus',
    title: 'Docusaurus',
    text: 'A plugin for docusaurus.config.js.',
  },
  {
    icon: 'simple-icons:materialformkdocs',
    title: 'MkDocs and Material',
    text: 'pip install mkdocs-smarter-chat',
  },
  {
    icon: 'simple-icons:readthedocs',
    title: 'Sphinx and Read the Docs',
    text: 'pip install sphinx-smarter-chat',
  },
  {
    icon: 'simple-icons:vitepress',
    title: 'VitePress',
    text: 'One head entry in its config. Nothing to install.',
  },
]

const developerTools = [
  {
    icon: 'simple-icons:react',
    title: 'React component',
    text: 'The chat as a React component in the @smarter.sh/ui-chat npm package, for your own web applications.',
    href: `${F}/smarter-chat.html`,
  },
  {
    icon: 'simple-icons:visualstudiocode',
    title: 'VS Code',
    text: 'An extension that validates Smarter manifests as you type, completes them, and applies them to your platform.',
    href: 'https://marketplace.visualstudio.com/items?itemName=querium.smarter-manifest',
    linkText: 'Get the extension',
  },
  {
    icon: 'lucide:arrow-right-left',
    title: 'Vendor SDKs, unchanged',
    text: 'Software written for the OpenAI, Anthropic or Gemini SDKs works through the Smarter Proxy by changing its base URL and key.',
    href: `${DOCS}/smarter-resources/smarter-proxy.html`,
  },
]

const embedTag = `<script
  src="https://cdn.jsdelivr.net/npm/@smarter.sh/ui-chat@${UI_CHAT_VERSION}/dist/embed.js"
  data-chatbot="https://support.example.com/"
  async></script>`

const Integrations = () => {
  return (
    <PageShell
      title="Integrations"
      description="Put a Smarter assistant on WordPress, Drupal, Shopify, Google Tag Manager, Docusaurus, MkDocs, Sphinx, VitePress or any web page, with no code."
    >
      <PageHero
        accent="violet"
        eyebrow="Integrations"
        title="Your assistant,"
        highlight="wherever your audience already is"
        lead="Build an assistant once, on Smarter, and place it on your website, store, intranet or documentation, with the platform’s guardrails, budgets and records still in force. No programming required."
      >
        <Button href="#platforms" icon="lucide:layout-grid">
          Website platforms
        </Button>
        <Button href="#any-website" variant="secondary" icon="lucide:globe">
          Any web page
        </Button>
      </PageHero>

      <Section className="pb-0 lg:pb-0">
        <ConsoleWidgets rowClassName="justify-content-center">
          <IntegrationsWidget className="col-lg-10 col-xl-8" />
        </ConsoleWidgets>
      </Section>

      <Section
        accent="violet"
        id="platforms"
        eyebrow="Content management and commerce"
        title="Plugins for the platforms you run"
        intro="Install, paste in your assistant’s address, and choose where it appears. The chat keeps its own look, from its manifest, and your theme can’t break it."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((item) => (
            <FeatureCard accent="violet" key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section
        accent="violet"
        id="docs-sites"
        eyebrow="Documentation sites"
        title="An assistant on every page of your docs"
        intro="Load your documentation into a Smarter vector database, and readers ask questions instead of searching. The chat survives client-side navigation in Docusaurus, Material and VitePress."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {docsSites.map((item) => (
            <FeatureCard accent="violet" key={item.title} {...item} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={`${F}/smarter-docs-sites.html`} icon="lucide:book-open">
            Documentation sites guide
          </Button>
          <Button
            href={`${GITHUB}/smarter-docs-site-generators`}
            variant="secondary"
            icon="lucide:github"
          >
            Source code
          </Button>
        </div>
      </Section>

      <Section
        accent="violet"
        id="any-website"
        eyebrow="Any web page"
        title="One script tag"
        intro="Hugo, Jekyll, Astro, a hand-written page or an intranet portal: paste one tag into the page, and a chat button appears in its corner. Or render the chat inline, in an element of the page."
      >
        <div className="mx-auto max-w-3xl">
          <pre className="overflow-x-auto rounded-xl border-s-2 border-primary bg-code-bg p-5 font-mono text-sm leading-relaxed text-code-text">
            {embedTag}
          </pre>
          <p className="mt-6 text-center text-keen-600">
            The assistant’s manifest lists the websites allowed to use it, so nobody else
            can put it on theirs.{' '}
            <a
              href={`${F}/smarter-chat/embedding.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Embedding guide
            </a>
            .
          </p>
        </div>
      </Section>

      <Section
        accent="violet"
        eyebrow="For developers"
        title="Build it into your own software"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {developerTools.map((item) => (
            <FeatureCard accent="violet" key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Need an integration we don’t have?"
        text="Every integration is open source and uses the same public embed script and APIs, so a new one is a small project. Propose it in GitHub Discussions, or build it with the SDKs."
      >
        <Button href={`${GITHUB}/smarter/discussions`} icon="lucide:message-square">
          Ask in Discussions
        </Button>
        <Button href="/sdks" variant="secondary" icon="lucide:code-xml">
          SDKs and APIs
        </Button>
      </CtaBand>
    </PageShell>
  )
}
export default Integrations
