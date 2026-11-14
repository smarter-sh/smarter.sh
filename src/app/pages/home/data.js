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

// Three ways to respond to people building with AI on their own, from the pitch deck, and what
// the dots on its canvas are doing in each.
export const responses = [
  {
    accent: 'amber',
    title: 'Ignore it',
    text: 'Everyone keeps building on their own. Nothing is shared and nobody sees it.',
  },
  {
    accent: 'gray',
    title: 'Ban it',
    text: 'Some people stop. Others go around the rule. The business slows down.',
  },
  {
    accent: 'green',
    title: 'Enable it',
    text: 'Give people one place to build. The easy path is also the governed one.',
  },
]
export const flowLabels = {
  noRecord: 'No support, no record',
  banned: 'Banned',
  stopped: 'Stopped',
  around: 'Going around the rule',
  onePlace: 'One place to build',
  rules: 'Rules',
  live: 'Live, with a record',
}

export const oneSentenceWords = [
  {
    word: 'Simple',
    accent: 'green',
    text: 'An AI app is a short text file. You fill it in like a form. No code.',
  },
  {
    word: 'Fast',
    accent: 'amber',
    text: 'The file a person writes on day one is the one that goes live. Nothing is rewritten.',
  },
  {
    word: 'In control',
    accent: 'blue',
    text: 'Rules, budgets and a full record apply to every app, whoever built it.',
  },
]
export const oneSentenceFacts = [
  'Free and open source',
  'Runs on your infrastructure',
  'Works with the models you already use',
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
    question: 'What can leadership see?',
    answer:
      'Every AI resource is a named, owned, recorded item, so leadership can answer the questions it usually can’t: what AI the organization is running and who owns it, what data each assistant can reach, what it said and why, what it is costing and where, which vendors the organization depends on and whether it could switch, and whether it is following policy.',
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

// From the Smarter pitch deck, woven into the page's own story (components/story/).

// The cover's highlights, under its headline.
export const highlights = [
  { icon: 'lucide:github', text: 'Free and open source' },
  { icon: 'lucide:server', text: 'Runs on your infrastructure' },
  { icon: 'lucide:graduation-cap', text: 'In teaching use at UBC' },
]

// What people have already built on their own, named on the dot grid at these places (fractions
// of its width and height), each on its own row so that the labels don't overlap in a half-width
// card. A phone shows the first four.
export const alreadyBuilt = [
  { text: 'Sales bot for quotes', x: 0.22, y: 0.3 },
  { text: 'Agent connected to the ERP', x: 0.42, y: 0.5 },
  { text: 'GPT with the price list', x: 0.88, y: 0.67, left: true },
  { text: 'Script that sends emails', x: 0.12, y: 0.84 },
  { text: 'Macro that summarizes contracts', x: 0.12, y: 1 },
  { text: 'Invoice automation', x: 0.9, y: 0.17, left: true },
]

// One message's way through Smarter, and the record it leaves: a question that passes, then one
// that a guardrail stops.
export const pipeline = [
  { title: 'Person', text: 'Types a question', accent: 'amber' },
  { title: 'Guardrail', text: 'Checks the message', accent: 'blue' },
  { title: 'Smarter', text: 'Uses the stored credential', accent: 'blue' },
  { title: 'AI model', text: 'Generates the answer', accent: 'amber' },
  { title: 'Guardrail', text: 'Checks the reply', accent: 'blue' },
  { title: 'Answer', text: 'Delivered and recorded', accent: 'green' },
]
export const pipelineLog = {
  ok: [
    ['09:14:02', 'ana.r · hr-helpdesk · message received'],
    ['09:14:02', 'guardrail in · nothing found'],
    ['09:14:02', 'smarter · stored credential applied'],
    ['09:14:04', 'model · answer generated'],
    ['09:14:04', 'guardrail out · nothing found'],
    ['09:14:04', 'answer delivered · cost 0.004 USD', 'ok'],
  ],
  blocked: [
    ['09:15:31', 'luis.m · sales-quotes · message received'],
    ['09:15:31', 'guardrail in · card number detected', 'bad'],
    ['09:15:31', 'message blocked · event logged', 'bad'],
  ],
}

// How to start, in thirty days: the phases, of so many days each, and what you have at the end.
export const thirtyDays = [
  {
    days: 7,
    when: 'Days 1 to 7',
    accent: 'blue',
    title: 'Platform ready',
    text: 'Smarter is installed. IT sets roles, rules and budgets.',
  },
  {
    days: 7,
    when: 'Days 8 to 14',
    accent: 'green',
    title: 'Your team learns by building',
    text: 'A hands-on course for business people. Each one builds a first AI app.',
  },
  {
    days: 15,
    when: 'Days 15 to 29',
    accent: 'amber',
    title: 'Real cases',
    text: 'The team builds apps for the problems it chose, with company data. Real users try them.',
  },
  {
    days: 1,
    when: 'Day 30',
    accent: 'purple',
    title: 'Review with leadership',
    text: 'The team shows what it built. Leadership sees real costs and usage, and decides how far to scale.',
  },
]
export const thirtyDayOutcomes = [
  'Platform running',
  'Rules and budgets set',
  'A team that can build',
  'Real apps working',
  'Real cost and usage data',
]
