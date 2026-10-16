import { useState } from 'react'
import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import { cn } from '@/helpers/cn'
import { chatbots } from '@/common/chatbots'
import { DOCS, GITHUB, OPENAPI_DOCS } from '@/common/constants'

const F = `${DOCS}/smarter-framework`

export const sdks = [
  {
    id: 'python',
    label: 'Python',
    icon: 'simple-icons:python',
    install: 'pip install smarter-api',
    href: `${F}/smarter-python.html`,
    repo: `${GITHUB}/smarter-python`,
    text: 'The reference SDK, on PyPI as smarter-api. Typed models of every resource, generated from the platform’s own schemas.',
    code: `from smarter import Smarter

client = Smarter()  # SMARTER_API_KEY, or the smarter cli's ~/.smarter/config.yaml

llmclient = client.llm_clients.find("customer_support")
response = client.llm_clients.prompt(llmclient.id, "Where is my order #1234?")
print(response.text)`,
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    icon: 'simple-icons:nodedotjs',
    install: 'npm install @smarter.sh/api',
    href: `${F}/smarter-nodejs.html`,
    repo: `${GITHUB}/smarter-nodejs`,
    text: 'Written in TypeScript, with the Python SDK’s features and resources, for web back ends, serverless functions and CI jobs.',
    code: `import { Smarter } from "@smarter.sh/api";

const client = new Smarter(); // SMARTER_API_KEY, or the smarter cli's ~/.smarter/config.yaml

const llmclient = await client.llmClients.find("customer_support");`,
  },
  {
    id: 'go',
    label: 'Go',
    icon: 'simple-icons:go',
    install: 'go get github.com/smarter-sh/smarter-golang',
    href: `${F}/smarter-golang.html`,
    repo: `${GITHUB}/smarter-golang`,
    text: 'For services, Kubernetes operators and command-line tools, with the same design as the Python and Node.js SDKs.',
    code: `client, err := smarter.NewClient() // SMARTER_API_KEY, or ~/.smarter/config.yaml
if err != nil {
\tlog.Fatal(err)
}`,
  },
]

const tools = [
  {
    icon: 'lucide:terminal',
    title: 'Command-line interface',
    text: 'smarter apply, get, describe, deploy and chat, for Windows, macOS, Linux and Docker. Works the way kubectl does.',
    href: '/cli',
    linkText: 'Download',
  },
  {
    icon: 'simple-icons:openapiinitiative',
    title: 'OpenAPI 3.1 contract',
    text: 'The whole Smarter API in one document, generated from the platform’s models and tested against its real responses. Generate a client in any language.',
    href: OPENAPI_DOCS,
    linkText: 'Browse the API',
  },
  {
    icon: 'lucide:braces',
    title: 'JSON Schemas',
    text: 'A published schema for every kind of manifest, the same ones the platform validates with, for editors and CI pipelines.',
    href: `${F}/smarter-manifests.html`,
  },
  {
    icon: 'simple-icons:visualstudiocode',
    title: 'VS Code extension',
    text: 'Validation as you type, completion and hover documentation for every manifest, and apply from the editor.',
    href: 'https://marketplace.visualstudio.com/items?itemName=querium.smarter-manifest',
    linkText: 'Get the extension',
  },
  {
    icon: 'simple-icons:react',
    title: 'Smarter Chat',
    text: 'The chat window as a React component and an embed script, to put an assistant in your own application.',
    href: `${F}/smarter-chat.html`,
  },
  {
    icon: 'lucide:arrow-right-left',
    title: 'Proxy for vendor SDKs',
    text: 'Keep using the OpenAI, Anthropic or Gemini SDKs; point them at Smarter for governed keys, budgets and logs.',
    href: `${DOCS}/smarter-resources/smarter-proxy.html`,
  },
]

const SdkTabs = () => {
  const [active, setActive] = useState(sdks[0].id)
  const sdk = sdks.find((item) => item.id === active)
  return (
    <div className="mx-auto max-w-5xl">
      <div role="tablist" className="mb-6 flex flex-wrap justify-center gap-2">
        {sdks.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active}
            onClick={() => setActive(item.id)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-all',
              item.id === active
                ? 'bg-primary text-white'
                : 'border border-default-600 text-default-200 hover:border-primary'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5" role="tabpanel">
        <div className="md:col-span-2">
          <p className="mb-5 text-default-200">{sdk.text}</p>
          <pre className="mb-6 overflow-x-auto rounded-lg bg-default-950/60 px-4 py-3 font-mono text-sm text-primary">
            {sdk.install}
          </pre>
          <div className="flex flex-wrap gap-3">
            <Button href={sdk.href} icon="lucide:book-open">
              Documentation
            </Button>
            <Button href={sdk.repo} variant="secondary" icon="lucide:github">
              GitHub
            </Button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-xl border-s-2 border-primary bg-default-950/60 p-5 font-mono text-sm leading-relaxed text-default-100 md:col-span-3">
          {sdk.code}
        </pre>
      </div>
    </div>
  )
}

const Sdks = () => {
  return (
    <PageShell
      title="SDKs and APIs"
      description="Official Smarter SDKs for Python, Node.js and Go, a command-line interface, an OpenAPI 3.1 contract and JSON Schemas for every manifest."
    >
      <PageHero
        accent="amber"
        eyebrow="SDKs and APIs"
        title="Everything in the console,"
        highlight="from your own code"
        lead="Official SDKs for Python, Node.js and Go give your software typed, complete access to your own Smarter installation, without customizing or forking the platform. They are clients of one published contract, so none of them can do anything your software can’t."
      >
        <Button href="#sdks" icon="lucide:code-xml">
          Choose your language
        </Button>
        <Button href="#sdk-guide" variant="secondary" icon="lucide:message-circle">
          Ask the SDK Guide
        </Button>
      </PageHero>

      <Section
        accent="amber"
        id="sdks"
        eyebrow="Official SDKs"
        title="Python, Node.js and Go"
        intro="Chat with an assistant, apply manifests from CI, load documents into a vector database, or call your MCP servers’ tools. The three SDKs share one design, and the same configuration file as the CLI."
      >
        <SdkTabs />
      </Section>

      <Section
        accent="amber"
        id="sdk-guide"
        eyebrow="Built on Smarter"
        title="Ask the Smarter SDK Guide"
        intro="Ada answers from the SDKs’ current code and documentation, through the Smarter Project’s own MCP server, never from memory, and shows a runnable example in your language."
      >
        <div className="mx-auto min-h-[560px] max-w-4xl">
          <SmarterChatEmbed bot={chatbots.sdkGuide} />
        </div>
      </Section>

      <Section accent="amber" eyebrow="Developer tools" title="The rest of the toolkit">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((item) => (
            <FeatureCard accent="amber" key={item.title} {...item} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={`${F}/apis-and-sdks.html`} icon="lucide:book-open">
            APIs and SDKs overview
          </Button>
          <Button href="/extensions" variant="secondary" icon="lucide:puzzle">
            Write an extension
          </Button>
        </div>
      </Section>
    </PageShell>
  )
}
export default Sdks
