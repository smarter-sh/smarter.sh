import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import SmartLink from '@/components/site/SmartLink'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

/*
 * The case studies: teaching cases, each built on a real, running Smarter project, with live assistants
 * and labs. Each case is its own page, in a folder beside this one.
 */

export const cases = [
  {
    path: '/case-studies/stackademy',
    icon: 'lucide:graduation-cap',
    eyebrow: 'Tool calling over private data',
    title: 'Stackademy Online Coding Academy',
    text: 'How a fictitious code academy that no AI model has heard of gets course advisors that answer from its private database and web API, with no-code plugins, governed with git.',
    topics: ['SqlPlugin', 'ApiPlugin', 'Secrets', 'Budgets', 'git'],
    duration: 'About 45 minutes',
  },
  {
    path: '/case-studies/mcp-server',
    icon: 'lucide:server',
    eyebrow: 'Retrieval for a codebase',
    title: 'The Smarter Project MCP Server',
    text: 'How an open source project lets any AI model answer from its 21 repositories and its blog instead of from memory: MCP, an hourly index, keyword search, and prompts written for an LLM.',
    topics: ['MCP', 'JSON-RPC', 'RAG', 'TF-IDF', 'MCPClient'],
    duration: 'About 60 minutes',
  },
  {
    path: '/case-studies/guardrails',
    icon: 'lucide:shield-check',
    eyebrow: 'Trust, input and output',
    title: 'Guardrails: Can You Trust the Model?',
    text: 'How a public AI assistant decides what may reach its model and what may reach its visitors: guardrails declared in YAML, a chat that treats every reply as untrusted HTML, and an HTTP client that refuses private addresses a model chooses.',
    topics: ['Guardrails', 'Prompt injection', 'XSS', 'SSRF', 'DOMPurify'],
    duration: 'About 60 minutes',
  },
  {
    path: '/case-studies/ai-coding-agents',
    icon: 'lucide:bot',
    eyebrow: 'AI agents in a large codebase',
    title: 'Converge or Diverge: AI Coding Agents',
    text: 'How a 240,000-line platform kept Claude Code on course for 19 releases in 18 days, what the agent actually read, and the antipattern that nearly made the codebase diverge.',
    topics: ['Claude Code', 'Agent Skills', 'CLAUDE.md', 'git', 'testing'],
    duration: 'About 60 minutes',
  },
  {
    path: '/case-studies/multi-tenancy',
    icon: 'lucide:building-2',
    eyebrow: 'Tenant isolation',
    title: 'One Platform, Many Tenants',
    text: 'How one Django application and one shared database keep every account’s chatbots, Secrets and conversations apart, and treat every value a client sends as a claim to check.',
    topics: ['QuerySets', 'BOLA', 'CORS', 'Sessions', 'API keys'],
    duration: 'About 60 minutes',
  },
  {
    path: '/case-studies/deploy',
    icon: 'lucide:rocket',
    eyebrow: 'From manifest to live URL',
    title: 'What Happens When You Click Deploy',
    text: 'How one command gives an AI chatbot its own address on the internet: one DNS record, one Kubernetes Ingress and one Let’s Encrypt certificate per host, custom domains that must be proven, and a daily sweep for leftovers.',
    topics: ['DNS', 'TLS / ACME', 'Kubernetes Ingress', 'Celery', 'Route 53'],
    duration: 'About 60 minutes',
  },
  {
    path: '/case-studies/api-contract',
    icon: 'lucide:file-json',
    eyebrow: 'Contracts between programs',
    title: 'One Contract, Five Clients',
    text: 'How one generated OpenAPI document and a JSON Schema per manifest kind keep SDKs in three languages, a CLI, a VS Code extension and a React chat in agreement with a Django platform, with no shared code.',
    topics: ['OpenAPI', 'JSON Schema', 'code generation', 'contract tests', 'semver'],
    duration: 'About 60 minutes',
  },
]

const CaseStudies = () => (
  <PageShell
    title="Case Studies"
    description="Teaching cases built on real, running Smarter projects, each with live AI assistants, labs and discussion questions."
  >
    <PageHero
      eyebrow="Case studies"
      title="Learn from"
      highlight="real projects"
      accent="emerald"
      lead="Each case is a lesson built on a project that is running on Smarter today, with live assistants to talk to, labs to work through and questions to discuss."
    />
    <section className="pb-20">
      <div className="container">
        <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {cases.map((item) => (
            <li key={item.path}>
              <SmartLink
                href={item.path}
                className="group flex h-full flex-col rounded-xl border border-keen-300 bg-white p-6 shadow-card transition-colors hover:border-emerald-400 md:p-8"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <IconifyIcon icon={item.icon} className="h-6 w-6" />
                </span>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  {item.eyebrow}
                </p>
                <h2 className="mb-3 text-2xl font-semibold text-keen-900 group-hover:text-primary">
                  {item.title}
                </h2>
                <p className="mb-5 text-[15px] leading-relaxed text-keen-700">
                  {item.text}
                </p>
                <ul className="mb-5 flex flex-wrap gap-1.5">
                  {item.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-keen-300 px-2.5 py-0.5 font-mono text-xs text-keen-700"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto flex items-center gap-2 text-sm text-keen-600">
                  <IconifyIcon icon="lucide:clock" className="h-4 w-4" />
                  {item.duration}
                  <IconifyIcon
                    icon="lucide:arrow-right"
                    className="ms-auto h-4 w-4 text-primary transition-transform group-hover:translate-x-1"
                  />
                </p>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </PageShell>
)
export default CaseStudies
