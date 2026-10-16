import { DOCS } from '@/common/constants'

export const situation = [
  {
    icon: 'lucide:smartphone',
    text: 'Staff use public AI tools with work information, often on personal accounts.',
  },
  {
    icon: 'lucide:shopping-cart',
    text: 'Departments buy AI features one vendor at a time, each with its own rules.',
  },
  {
    icon: 'lucide:circle-help',
    text: 'Few leaders can say what it all costs, what data it saw, or what it said.',
  },
]

export const gaps = [
  {
    icon: 'lucide:graduation-cap',
    title: 'The literacy gap',
    accent: 'emerald',
    text: 'Most people don’t yet know what AI can do, what it can’t, or how to use it safely with real information.',
  },
  {
    icon: 'lucide:eye-off',
    title: 'The control gap',
    accent: 'sky',
    text: 'Leadership can’t see which AI is in use, who owns it, what data it touches, or what it costs.',
  },
]

export const journey = [
  {
    step: 'Phase 1',
    icon: 'lucide:book-open',
    title: 'Literacy',
    accent: 'emerald',
    text: 'Staff learn how AI works by building with it, from the first class. No programming required.',
  },
  {
    step: 'Phase 2',
    icon: 'lucide:rocket',
    title: 'Production',
    accent: 'violet',
    text: 'The same people build real solutions for the organization, on the same platform. Nothing is rewritten.',
  },
  {
    step: 'The result',
    icon: 'lucide:layout-grid',
    title: 'An ERP for AI',
    accent: 'sky',
    text: 'One system of record for every AI resource you own: who built it, what it reaches, what it costs.',
  },
]

export const examples = [
  {
    icon: 'lucide:book-marked',
    title: 'Policy assistant',
    iconClass: 'bg-sky-500/20 text-sky-400',
    text: 'Answers staff questions from your own handbooks and policies, and cites them.',
  },
  {
    icon: 'lucide:user-round-check',
    title: 'Student or customer advisor',
    iconClass: 'bg-emerald-500/20 text-emerald-400',
    text: 'Lives on your website, under your own name and web address, in your colors.',
  },
  {
    icon: 'lucide:database',
    title: 'Data assistant',
    iconClass: 'bg-violet-500/20 text-violet-400',
    text: 'Answers plain-English questions from approved databases and business systems.',
  },
  {
    icon: 'lucide:search',
    title: 'Research assistant',
    iconClass: 'bg-amber-500/20 text-amber-400',
    text: 'Searches the web and your sources, and shows where its answers came from.',
  },
]

export const safety = [
  {
    icon: 'lucide:shield-check',
    title: 'Guardrails on every message',
    text: 'Personal data, leaked secrets, manipulation attempts, invented citations and harmful content are checked on the way in and on the way out.',
    href: `${DOCS}/smarter-resources/smarter-guardrail.html`,
  },
  {
    icon: 'lucide:key-round',
    title: 'The AI never holds the passwords',
    text: 'Credentials for your systems are encrypted and stay with the platform. Neither the AI model nor the user ever sees them.',
    href: `${DOCS}/smarter-resources/smarter-secret.html`,
  },
  {
    icon: 'lucide:wallet',
    title: 'Spending caps',
    text: 'Budgets in dollars or tokens, per hour, day, week or month, for every person, team and application. Hard stops, not surprise invoices.',
    href: `${DOCS}/smarter-resources/smarter-budget.html`,
  },
  {
    icon: 'lucide:scroll-text',
    title: 'A complete record',
    text: 'Every conversation is recorded, and traceable to the person and budget that allowed it.',
    href: `${DOCS}/smarter-resources/smarter-prompt.html`,
  },
]

export const resources = [
  'AI models and vendors',
  'Credentials',
  'Data sources',
  'Tools',
  'Guardrails',
  'Budgets',
  'AI assistants',
  'Conversations',
]

export const erp = [
  ['Approved suppliers', 'Approved AI vendors, and models you host yourself'],
  [
    'Budgets and cost centers',
    'Spending caps, and the cost of every conversation by team',
  ],
  ['Roles and permissions', 'Who may build, use and change each AI resource'],
  ['Asset register', 'Every assistant, data connection and tool, each with an owner'],
  ['Audit trail', 'Every conversation, traced to who authorized it and what it cost'],
]

export const questions = [
  'What AI are we running, and who owns it?',
  'What data can each assistant reach?',
  'What did it say, and why?',
  'What is it costing us, and where?',
  'Which vendors do we depend on, and could we switch?',
  'Is it following our policies?',
]

export const openSource = [
  {
    icon: 'lucide:badge-dollar-sign',
    title: 'Free',
    accent: 'primary',
    text: 'No license fees or seat counts. You pay AI vendors only for what you use.',
  },
  {
    icon: 'lucide:building-2',
    title: 'Yours',
    accent: 'teal',
    text: 'Runs on your own computers or cloud account. Your data stays where you put it.',
  },
  {
    icon: 'lucide:shuffle',
    title: 'Portable',
    accent: 'violet',
    text: 'Works with OpenAI, Anthropic, Google, Meta, DeepSeek and others, or with models you host.',
  },
  {
    icon: 'lucide:scan-eye',
    title: 'Open',
    accent: 'sky',
    text: 'Every line of code is public, so your security team can inspect it.',
  },
]

export const audiences = [
  {
    icon: 'lucide:graduation-cap',
    title: 'Universities and schools',
    accent: 'emerald',
    text: 'Teach AI by building it, with 21 free course designs, and give students and staff assistants that run on your own infrastructure.',
    href: '/education',
    linkText: 'Smarter for education',
  },
  {
    icon: 'lucide:landmark',
    title: 'Organizations',
    accent: 'sky',
    text: 'Bring scattered AI pilots onto one governed platform, with budgets, guardrails and a full audit trail.',
    href: '/platform',
    linkText: 'Tour the platform',
  },
  {
    icon: 'lucide:globe',
    title: 'Websites and stores',
    accent: 'violet',
    text: 'Put an assistant on WordPress, Drupal, Shopify, a documentation site, or any web page, with no code.',
    href: '/integrations',
    linkText: 'See integrations',
  },
  {
    icon: 'lucide:code-xml',
    title: 'Software developers',
    accent: 'amber',
    text: 'Call Smarter from Python, Node.js or Go, extend it with your own tools, and contribute to the project.',
    href: '/sdks',
    linkText: 'SDKs and APIs',
  },
]

export const pilot = [
  {
    when: 'Weeks 1–4',
    title: 'Pilot cohort',
    accent: 'emerald',
    text: '20–30 staff from several departments take one course on a shared installation.',
  },
  {
    when: 'Weeks 5–10',
    title: 'First real solution',
    accent: 'violet',
    text: 'The cohort builds one assistant for a problem they chose, and puts it in front of real users.',
  },
  {
    when: 'Week 12',
    title: 'Governance review',
    accent: 'sky',
    text: 'Leadership reviews actual costs, usage and the audit trail, and decides how far to scale.',
  },
]

export const faqsData = [
  {
    question: 'What is Smarter, in plain terms?',
    answer:
      'Smarter is free, open-source software that your organization installs and runs itself. People use it to learn how AI works, to build AI assistants that work with your own documents and systems, and to put those assistants in front of staff, students or customers. Leadership uses it to see and control everything AI-related: who built what, what it can reach, what it said, and what it cost.',
  },
  {
    question: 'Do our people need to know how to program?',
    answer:
      'No. An assistant is described in a short, readable text file, a “manifest”, that names the AI model to use, the documents and tools it may use, and the safety rules it must follow. A business analyst, an administrator or a faculty member can write one in the first class. Programmers can do more, but they aren’t required.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. Smarter is a community open-source project under the AGPL-3.0 license, and nothing is for sale: no license fees, no seat counts, no paid edition. Like any software you run yourself, it needs a computer or cloud account to run on, and the AI vendors you choose charge for their own usage, which Smarter’s budgets cap and its records report.',
  },
  {
    question: 'Where does our data go?',
    answer:
      'Smarter runs on your own computers or in your own cloud account, so conversations, documents and credentials stay there. Questions are sent only to the AI vendors you approve, and, for sensitive work, Smarter can use AI models that you host yourself, so the data never leaves your network.',
  },
  {
    question: 'Which AI vendors does it work with?',
    answer:
      'OpenAI, Anthropic, Google, Meta and DeepSeek, plus open models you run yourself with vLLM or Ollama. Applications talk to Smarter rather than to a vendor, so changing vendors is a one-line change, not a rewrite.',
  },
  {
    question: 'Who supports it?',
    answer:
      'Smarter is community supported: the documentation, GitHub discussions and issues, and independent partners who offer installation, hosting, training and customization. There is no vendor support desk or service-level agreement, so an organization needs either in-house IT capacity or a partner.',
  },
  {
    question: 'How mature is it?',
    answer:
      'Smarter has been open source since 2024 and is in teaching use at the University of British Columbia. It is pre-1.0, with semantic-versioned releases, automated tests with published coverage, monthly patched container images and full documentation. Single sign-on with SAML or OIDC providers, and automated provisioning on clouds other than AWS, need integration work today.',
  },
]

export const logos = [
  { icon: 'simple-icons:openai', label: 'OpenAI' },
  { icon: 'simple-icons:anthropic', label: 'Anthropic' },
  { icon: 'simple-icons:googlegemini', label: 'Google Gemini' },
  { icon: 'simple-icons:meta', label: 'Meta' },
  { icon: 'simple-icons:deepseek', label: 'DeepSeek' },
  { icon: 'simple-icons:ollama', label: 'Ollama' },
  { icon: 'simple-icons:kubernetes', label: 'Kubernetes' },
  { icon: 'simple-icons:amazonwebservices', label: 'AWS' },
  { icon: 'simple-icons:wordpress', label: 'WordPress' },
  { icon: 'simple-icons:drupal', label: 'Drupal' },
  { icon: 'simple-icons:shopify', label: 'Shopify' },
  { icon: 'simple-icons:postgresql', label: 'PostgreSQL' },
]

export const words = [
  [
    'Guardrails',
    'Budgets',
    'Audit trail',
    'Your documents',
    'Your databases',
    'Your website',
  ],
  [
    'Any AI vendor',
    'Self-hosted models',
    'MCP servers',
    'Extensions',
    'No code',
    'Open source',
  ],
]
