import { DOCS, OPENAPI_DOCS } from '@/common/constants'

const R = `${DOCS}/smarter-resources`
const F = `${DOCS}/smarter-framework`

export const layers = [
  {
    id: 'models',
    accent: 'primary',
    eyebrow: 'Model connectivity',
    title: 'Any model, any vendor, or your own',
    intro:
      'Applications talk to Smarter, not to a vendor, so moving a workload between vendors, or onto a model you host, is a configuration change rather than a rewrite.',
    features: [
      {
        icon: 'lucide:messages-square',
        title: 'Assistants (LLMClients)',
        text: 'An assistant is a short manifest: which model, which instructions, which tools and which guardrails. Publish it with one command, at its own web address.',
        href: `${R}/smarter-llmclient.html`,
      },
      {
        icon: 'lucide:building',
        title: 'Commercial vendors',
        text: 'OpenAI, Anthropic, Google, Meta and DeepSeek. Each vendor’s models pass compatibility checks before teams can use them, and again periodically.',
        href: `${R}/smarter-provider.html`,
      },
      {
        icon: 'lucide:server-cog',
        title: 'Self-hosted models',
        text: 'Run open-weight models on your own Kubernetes cluster with vLLM or Ollama, with health checks, cost tracking and the same governance as any vendor.',
        href: `${R}/smarter-llmhost.html`,
      },
      {
        icon: 'lucide:workflow',
        title: 'Multi-agent orchestration',
        text: 'Coordinate several assistants toward one goal: sequential hand-offs, parallel fan-out, supervisor and workers, routing by intent, or voting.',
        href: `${R}/smarter-orchestrator.html`,
      },
      {
        icon: 'lucide:globe-lock',
        title: 'Custom domains',
        text: 'Serve assistants from your own web address, such as advisor.example.edu, with a verified domain and its own TLS certificate.',
        href: `${R}/smarter-custom-domain.html`,
      },
    ],
  },
  {
    id: 'tools',
    accent: 'violet',
    eyebrow: 'Extensibility',
    title: 'Connect AI to your data and systems',
    intro:
      'An AI model knows only what it was trained on. Tools let it look things up, query systems and take actions, under the platform’s rules.',
    features: [
      {
        icon: 'lucide:plug',
        title: 'No-code plugins',
        text: 'Declare a tool in a manifest: answer from static data, run a SQL query, call a REST API, follow a skill, search the web, or search for images.',
        href: `${R}/smarter-llmtool.html`,
      },
      {
        icon: 'lucide:file-search',
        title: 'Your documents (RAG)',
        text: 'Load PDFs, manuals and policies into a managed vector database, self-hosted Qdrant, Qdrant Cloud or Pinecone, and answer from them with citations.',
        href: `${R}/smarter-vectorstore.html`,
      },
      {
        icon: 'lucide:cable',
        title: 'MCP servers',
        text: 'Use the tools of any Model Context Protocol server, your own or a vendor’s, under the same governance as every other tool.',
        href: `${R}/smarter-mcpclient.html`,
      },
      {
        icon: 'lucide:puzzle',
        title: 'Installable extensions',
        text: 'Python packages that add tools, installed at run time from the web console or a signed registry, much as WordPress installs plugins.',
        href: '/extensions',
        linkText: 'Explore extensions',
      },
      {
        icon: 'lucide:image',
        title: 'Image search',
        text: 'Assistants can find and show pictures alongside their answers, as Euclid the math tutor does.',
        href: `${R}/llmtool/plugin/image-search.html`,
        badge: 'Experimental',
      },
    ],
  },
  {
    id: 'governance',
    accent: 'sky',
    eyebrow: 'Access and governance',
    title: 'Control what AI can reach, say and spend',
    intro:
      'Protections are part of the platform, so every assistant gets them automatically, whoever built it.',
    features: [
      {
        icon: 'lucide:shield-check',
        title: 'Guardrails',
        text: 'Deterministic checks on input and output: personal data, leaked secrets, prompt injection, jailbreaks, invented citations and harmful content.',
        href: `${R}/smarter-guardrail.html`,
      },
      {
        icon: 'lucide:key-round',
        title: 'Encrypted secrets',
        text: 'Passwords and API keys are encrypted and resolved on the server. Models never receive them, and vendor keys are never handed to teams.',
        href: `${R}/smarter-secret.html`,
      },
      {
        icon: 'lucide:wallet',
        title: 'Budgets',
        text: 'Spending limits in dollars or tokens, per hour, day, week, month or in total, on any user, team or application, with budget-versus-actual charts.',
        href: `${R}/smarter-budget.html`,
      },
      {
        icon: 'lucide:arrow-right-left',
        title: 'Vendor proxy',
        text: 'Existing code that uses the OpenAI, Anthropic or Gemini SDKs keeps working, unchanged, with its keys, spending and logs moved under governance.',
        href: `${R}/smarter-proxy.html`,
      },
      {
        icon: 'lucide:users',
        title: 'Accounts, teams and API keys',
        text: 'Every resource has an owner and an account. Per-user API keys can be revoked individually, with warnings when a key outlives its maximum age.',
        href: `${R}/smarter-account.html`,
      },
    ],
  },
  {
    id: 'operations',
    accent: 'teal',
    eyebrow: 'Records and operations',
    title: 'Know what happened, and run it with confidence',
    intro:
      'Every answer is traceable, from the conversation back through the guardrails, tools and model that produced it, to the account and budget that authorized it.',
    features: [
      {
        icon: 'lucide:scroll-text',
        title: 'Conversation records',
        text: 'Every prompt, tool call, guardrail result and cost is recorded per request in ordinary database tables, so a chargeback report is a SQL query.',
        href: `${R}/smarter-prompt.html`,
      },
      {
        icon: 'lucide:monitor-cog',
        title: 'Infrastructure manager',
        text: 'The platform keeps a ledger of the cloud resources it creates, from DNS records and certificates to Kubernetes workloads, and emails a log of every job.',
        href: `${DOCS}/smarter-platform/cloud-infrastructure.html`,
      },
      {
        icon: 'lucide:layout-dashboard',
        title: 'Web console',
        text: 'Build, test and manage every resource in the browser, with a prompt workbench, a manifest editor and a dashboard. In English, Spanish, French and Brazilian Portuguese.',
        href: `${DOCS}/smarter-platform/smarter-web-console.html`,
      },
      {
        icon: 'lucide:file-json',
        title: 'Published API contract',
        text: 'Every operation is described in one OpenAPI document, generated from the platform’s own models and checked against its real responses.',
        href: OPENAPI_DOCS,
        linkText: 'Browse the API',
      },
      {
        icon: 'lucide:container',
        title: 'Laptop to Kubernetes',
        text: 'The same container images run under Docker on a laptop and on Kubernetes in production, with an official Helm chart and Terraform for AWS.',
        href: `${DOCS}/smarter-platform/installation.html`,
      },
    ],
  },
]

export const chat = {
  title: 'A chat window that fits your brand',
  text: 'Every assistant gets Smarter Chat: markdown, highlighted code, typeset math and diagrams, file attachments, and progress messages while it works. Its logo, colors, fonts and background are set in the assistant’s manifest, so a math tutor can look like a chalkboard and a support assistant like your website.',
  href: `${F}/smarter-chat.html`,
}

export const manifest = `apiVersion: smarter.sh/v1
kind: LLMClient
metadata:
  name: hr_policy_assistant
  description: Answers staff questions from our HR handbook.
spec:
  config:
    prompt:
      provider: openai
      defaultModel: gpt-6-luna
  plugins:
    - hr_policy_search
  guardrails:
    - pii_redaction_input
    - prompt_injection_llm_judge_input
    - secrets_leak_output`
