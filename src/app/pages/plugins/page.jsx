import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import SmartLink from '@/components/site/SmartLink'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ManifestProvider } from '@/components/manifest/ManifestViewer'
import PluginShowcase from './components/PluginShowcase'
import YamlBlock from './components/YamlBlock'
import { examples, files, included, PLUGIN_DOCS, plugins, steps } from './data'

/*
 * The no-code plugins: Smarter's six off-the-shelf kinds of LLM tool, each configured by a short
 * manifest. The page sells the convenience of wiring up a tool call in YAML, then shows each kind
 * with the lines of a real manifest, which opens whole, from GitHub, in the manifest editor.
 */
const Plugins = () => {
  return (
    <PageShell
      title="Plugins"
      description="Give an AI assistant your database, your web services, the web or your procedures with a short YAML manifest. Six off-the-shelf plugins, no code."
    >
      <ManifestProvider repo={examples} files={files}>
        <PageHero
          accent="violet"
          eyebrow="No-code plugins"
          title="Wire up tool calls"
          highlight="with a few lines of YAML"
          lead="Give an assistant your database, your web services, the open web or your own procedures. Describe the tool in a manifest, apply it, and list it in an assistant. There are no functions to write, no JSON Schemas to maintain and nothing to deploy."
        >
          <Button href="#catalog" icon="lucide:layout-grid">
            See the six plugins
          </Button>
          <Button href={PLUGIN_DOCS} variant="secondary" icon="lucide:book-open">
            Plugin documentation
          </Button>
        </PageHero>

        <Section
          id="how"
          accent="violet"
          eyebrow="How it works"
          title="From a manifest to a tool call, in three steps"
          intro="A tool call is how an AI model asks your systems for something it doesn't know. Building one by hand means a function definition, the code behind it, its credentials and its error handling, for every tool. A plugin is a description of the tool. Smarter does the rest."
        >
          <ol className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="flex min-w-0 flex-col">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500 font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-keen-900">{step.title}</h3>
                </div>
                <p className="mb-4 text-keen-700">{step.text}</p>
                <YamlBlock
                  className="flex-1"
                  file={step.file}
                  code={step.code}
                  shell={step.file === 'terminal'}
                />
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="catalog"
          accent="violet"
          eyebrow="Off the shelf"
          title="Six plugins, ready to configure"
          intro="Each is a kind of manifest. Pick the one that matches where the answer lives, fill in the details, and your assistant has a new tool."
          className="scroll-mt-20"
          glow
        >
          <nav
            aria-label="The plugins"
            className="mb-14 flex flex-wrap justify-center gap-2"
          >
            {plugins.map((plugin) => (
              <a
                key={plugin.id}
                href={`#${plugin.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3.5 py-1.5 font-mono text-sm text-keen-800 transition-colors hover:border-violet-400 hover:text-violet-600"
              >
                <IconifyIcon icon={plugin.icon} className="h-4 w-4 text-violet-600" />
                {plugin.kind}
              </a>
            ))}
          </nav>
          {plugins.map((plugin, i) => (
            <PluginShowcase key={plugin.id} plugin={plugin} flip={i % 2 === 1} />
          ))}
        </Section>

        <Section
          id="included"
          accent="violet"
          eyebrow="Included with every plugin"
          title="The plumbing you don't have to build"
          intro="The hard parts of tool calling are the same for every tool. Smarter does them once, for all of them."
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <FeatureCard accent="violet" key={item.title} {...item} />
            ))}
          </div>
        </Section>

        <Section
          id="try"
          accent="violet"
          eyebrow="See it work"
          title="Talk to an assistant whose only tool is a plugin"
        >
          <div className="mx-auto max-w-3xl rounded-xl border border-keen-200 bg-white p-8 text-center shadow-card">
            <p className="mb-6 text-lg text-keen-700">
              Stackademy is a fictional code academy with two course advisors. One answers
              from its database with a SqlPlugin, the other from its web API with an
              ApiPlugin. The case study lets you ask them both, read their manifests, and
              change them in the editor.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/case-studies/stackademy" icon="lucide:graduation-cap">
                The Stackademy case study
              </Button>
              <Button
                href="https://github.com/smarter-sh/example-manifests/tree/main/smarter/plugins"
                variant="secondary"
                icon="lucide:github"
              >
                Example plugin manifests
              </Button>
            </div>
            <p className="mt-6 text-sm text-keen-600">
              Every new Smarter platform loads these examples, so they are in your web
              console to copy from on the first day.
            </p>
          </div>
        </Section>

        <CtaBand
          title="Need a tool no plugin covers?"
          text="Write it in Python as an extension, or connect any MCP server. Both are governed the same way as plugins: listed in an assistant, inside its guardrails and budget, and on the record."
        >
          <Button href="/extensions" icon="lucide:puzzle">
            Extensions and MCP
          </Button>
          <Button href={PLUGIN_DOCS} variant="secondary" icon="lucide:book-open">
            Plugin documentation
          </Button>
        </CtaBand>
      </ManifestProvider>
    </PageShell>
  )
}
export default Plugins
