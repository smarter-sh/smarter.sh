export const about = [
  {
    name: 'Quickstart',
    icon: 'lucide:settings',
    iconClass: 'bg-orange-500/20 text-orange-500',
    detail:
      'A 1-click Docker deployment that gets Smarter running on your desktop in less than 10 minutes.',
    link_text: 'Get started',
    url: 'https://github.com/smarter-sh/smarter-deploy',
  },
  {
    name: 'Read the Docs',
    icon: 'lucide:file-text',
    iconClass: 'bg-red-500/20 text-red-500',
    detail: 'Official Smarter documentation to help you get started quickly.',
    link_text: 'Go to ReadTheDocs',
    url: 'https://smarter.readthedocs.io/',
  },
  {
    name: 'Support Smarter!',
    icon: 'lucide:heart',
    iconClass: 'bg-pink-500/20 text-pink-500',
    detail: 'Donate to the Smarter Project and help us keep improving.',
    link_text: 'Support Smarter',
    url: 'https://github.com/sponsors/lpm0073',
  },
  {
    name: 'Swagger API docs',
    icon: 'lucide:book-open',
    iconClass: 'bg-white/20 text-white',
    detail:
      'Getting started with the Smarter API is easy with Swagger.',
    link_text: 'View API Docs',
    url: 'https://ubc.smarter.sh/docs/swagger/',
  },
  {
    name: 'Command-Line Interface',
    icon: 'lucide:terminal',
    iconClass: 'bg-sky-500/20 text-sky-500',
    detail:
      'The Smarter CLI runs on Windows, MacOS, and Linux and works just like kubectl. It is the fastest way to get started.',
    link_text: 'Download',
    url: '/cli/',
  },
  {
    name: 'Web Integrations',
    icon: 'lucide:globe-2',
    iconClass: 'bg-teal-700/20 text-teal-700',
    detail:
      'An example web integration using the Smarter NPM package to build customer-facing chat applications.',
    link_text: 'View on GitHub',
    url: 'https://github.com/smarter-sh/web-integration-example',
  },
  {
    name: 'Helm Charts',
    icon: 'lucide:ship',
    iconClass: 'bg-blue-500/20 text-blue-500',
    detail:
      'Use our official Helm Charts to deploy Smarter cloud infrastructure in your Kubernetes cluster.',
    link_text: 'View on ArtifactHUB',
    url: 'https://artifacthub.io/packages/helm/project-smarter/smarter',
  },
  {
    name: 'Docker Hub',
    icon: 'lucide:box',
    iconClass: 'bg-cyan-500/20 text-cyan-500',
    detail:
      'Use our official Docker images to deploy Smarter cloud infrastructure in your containerized environments.',
    link_text: 'View on Docker Hub',
    url: 'https://hub.docker.com/r/mcdaniel0073/smarter',
  },
  {
    name: 'Terraforms',
    icon: 'lucide:server',
    iconClass: 'bg-purple-500/20 text-purple-500',
    detail:
      'Use our Terraform module to build Smarter cloud infrastructure in your AWS account. It takes just a few minutes to get started.',
    link_text: 'View on GitHub',
    url: 'https://github.com/smarter-sh/smarter-infrastructure',
  },
  {
    name: 'PyPi',
    icon: 'lucide:package',
    iconClass: 'bg-default-500/20 text-default-500',
    detail:
      'Write Python? The Smarter Python SDK makes it easy to integrate Smarter into your existing Python applications and workflows.',
    link_text: 'Get it on PyPi',
    url: 'https://pypi.org/project/smarter-api/',
  },
  {
    name: 'NPM',
    icon: 'lucide:package',
    iconClass: 'bg-indigo-500/20 text-indigo-500',
    detail:
      'The Smarter NPM package makes it easy to integrate Smarter into your customer-facing chat applications.',
    link_text: 'Get it on NPM',
    url: 'https://www.npmjs.com/package/@smarter.sh/ui-chat',
  },
  {
    name: 'Source Code',
    icon: 'lucide:github',
    iconClass: 'bg-yellow-500/20 text-yellow-500',
    link_text: 'Fork on GitHub',
    detail:
      'Get involved! Smarter is open source under the GNU Affero General Public License Version 3, 19 November 2007.',
    url: 'https://github.com/smarter-sh/smarter',
  },
  {
    name: 'Contributing',
    icon: 'lucide:git-pull-request',
    iconClass: 'bg-pink-500/20 text-pink-500',
    detail:
      'We welcome contributions from the community! Please read our guidelines and watch the developer onboarding guides before getting started.',
    link_text: 'Create a pull request',
    url: 'https://github.com/smarter-sh/smarter/blob/main/.github/CONTRIBUTING.md',
  },
  {
    name: 'VS Code Extension',
    icon: 'lucide:code',
    iconClass: 'bg-blue-600/20 text-blue-600',
    detail:
      'Boost your productivity with the official Smarter VS Code extension. Write, validate, and deploy Smarter manifests directly from your editor—no context switching required.',
    link_text: 'Get the Extension',
    url: 'https://marketplace.visualstudio.com/items?itemName=querium.smarter-manifest',
  },
]
export const saas = [
  {
    icon: 'lucide:cloud',
    title: 'SaaS',
    description:
      'Smarter as a Service: scalable, secure, and ready for your enterprise AI workflows.',
    url: '#',
  },
  {
    icon: 'lucide:headset',
    title: 'Support',
    description:
      'Expert assistance whenever you need it—keeping your AI workflows running smoothly and securely.',
  },
]
export const faqsData = [
  {
    id: 1,
    question: 'What does “declarative AI orchestration” mean?',
    answer:
      'It means describing what you want in a YAML file — like database queries, API calls, or function definitions — instead of writing imperative code. Smarter sets up and runs your workflow based on those declarations.',
  },
  {
    id: 2,
    question: 'Who can use Smarter? Do I need to be a developer or know Python?',
    answer:
      'No. Smarter is designed so that enterprise domain experts (analysts, product owners, etc.) can define AI workflows with YAML, without writing Python or interacting directly with LLM APIs. New prompt engineers can write their first workflow around an hour.',
  },
  {
    id: 3,
    question: 'What kind of integrations are supported (databases, APIs, etc.)?',
    answer:
      'Smarter supports a wide range of native integrations, including popular databases (including PostgreSQL, MySQL, MS SQL Server, Oracle, Sybase, DB2 and others), It works natively with any REST APIs, and GraphQL endpoints. If you have a specific integration in mind, feel free to ask!',
  },
  {
    id: 4,
    question: 'How is security, logging, and moderation handled?',
    answer:
      'Smarter follows industry best practices for VPCs, Kubernetees infrastructure and generic ingress and egress configurations. Smarter incorporates security, configurable logging, and moderation at every layer. All data is encrypted in transit and at rest, and access controls are enforced through role-based permissions. Detailed logs are maintained for all actions and are suitable for long-term cold storage, and automated moderation tools are in place to ensure compliance with organizational policies.',
  },
  {
    id: 5,
    question: 'Can I build agentic AI workflows with Smarter?',
    answer:
      'Yes. Smarter provides the building blocks — like chaining API calls, querying databases, and function calling — so you can create workflows that resemble agent behavior. Safety, auditability, and governance are built in.',
  },
  {
    id: 6,
    question: 'How scalable and multi-tenant is the platform?',
    answer:
      'Smarter is built for enterprise scale and runs on Kubernetes. It natively supports multi-tenant setups where different teams/projects can share infrastructure but maintain isolated cost accounting, permissions, and governance.',
  },
  {
    id: 7,
    question: 'How do I get started? What’s the onboarding process?',
    answer:
      'You can start by writing simple YAML manifests, using existing templates, or following our quickstart guide. We provide documentation, training, and examples so domain experts can get up and running without jumping into code.',
  },
  {
    id: 8,
    question: 'What if I need customization or enterprise support?',
    answer:
      'See our providers list. They offer services such as consulting, custom integration setup, installation assistance, and training to ensure Smarter fits your organization’s requirements and standards.',
  },
  {
    id: 9,
    question:
      'How is Smarter different from writing custom pipelines in Python, or using other orchestration tools?',
    answer:
      'Unlike custom Python pipelines, Smarter reduces boilerplate, removes the need for direct LLM API calls, standardizes governance, and lets you define workflows declaratively. This reduces complexity and learning curves for non-developers.',
  },
  {
    id: 10,
    question: 'What deployment options are available?',
    answer:
      'Smarter can be deployed to your AWS account, or on-premises. You control credentials, resource limits, and compliance based on your environment. For evaluation purposes, a hosted SaaS option is also available.',
  },
  {
    id: 11,
    question: "What is Smarter's technology stack?",
    answer:
      'The Smarter Api and prompt engineer web console are both developed on Python-Django and leverage Pydantic for manifest processing and Django Rest Framework for the Api. The platform is containerized using Docker and orchestrated with Kubernete. User-facing chats are implemented with React. The command-line interface (CLI) is written in Golang.',
  },
]
export const footerLinks = [
  {
    title: 'Sponsorship & About',
    links: [
      {
        name: 'Patreon Page',
        url: 'https://patreon.com/FullStackWithLawrence?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink'
      },
      {
        name: 'Donate to Smarter',
        url: 'https://github.com/sponsors/lpm0073'
      },
      {
        name: 'Project Origins',
        url: '/about'
      },
      {
        name: 'About the author',
        url: 'https://lawrencemcdaniel.com',
      },
    ],
  },
  {
    title: 'Community & Resources',
    links: [
      {
        name: 'GitHub Repositories',
        url: 'https://github.com/orgs/smarter-sh/repositories',
      },
      {
        name: 'Contributing Guide',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework/guides/contributing.html'
      },
      {
        name: 'Code of Conduct',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework/guides/code-of-conduct.html',
      },
      {
        name: 'Discussions & Support',
        url: 'https://github.com/smarter-sh/smarter/discussions',
      },
      {
        name: 'Report an Issue',
        url: 'https://github.com/smarter-sh/smarter/issues',
      },
      {
        name: 'Release Notes',
        url: 'https://github.com/smarter-sh/smarter/blob/main/CHANGELOG.md'
        },
    ],
  },
  {
    title: 'Technical Guides',
    links: [
      {
        name: 'Smarter Platform Overview',
        url: 'https://docs.smarter.sh/en/latest/smarter-platform.html'
      },
      {
        name: 'Smarter Resources Overview',
        url: 'https://docs.smarter.sh/en/latest/smarter-resources.html'
      },
      {
        name: 'Smarter Framework Overview',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework.html'
      },
      {
        name: 'React UI Integration Guide',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework/smarter-react-ui.html',
      },
      {
        name: 'OpenAI Getting Started Guide',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework/guides/openai-api-getting-started-guide.html',
      },
      {
        name: 'Semantic Versioning Guide',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework/guides/semantic-versioning.html',
      },
      {
        name: 'Good Coding Practices',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework/guides/developer-guidelines.html',
      },
      {
        name: '12-Factor App Methodology',
        url: 'https://docs.smarter.sh/en/latest/smarter-framework/guides/12-factor-app.html',
      },
    ],
  },
]
