import { DOCS, GITHUB } from '@/common/constants'

// Ways to get involved that the Contribute widget (@smarter.sh/ui-widgets) doesn't link to: it has
// the contributing guide and the open issues.
export const contribute = [
  {
    icon: 'lucide:bot',
    title: 'Develop with AI agents',
    text: 'The repository ships Agent Skills, so Claude Code and other coding agents follow its conventions. Most new Smarter code is written this way.',
    href: `${DOCS}/smarter-framework/guides/claude-code/claude-code-with-smarter.html`,
  },
  {
    icon: 'lucide:messages-square',
    title: 'Discussions',
    text: 'Ask questions, propose features and share what you have built.',
    href: `${GITHUB}/smarter/discussions`,
  },
]

export const resources = [
  {
    name: 'Quick start',
    icon: 'lucide:rocket',
    detail:
      'Run the whole platform on your own computer with Docker in about ten minutes.',
    link_text: 'Get started',
    url: `${DOCS}/smarter-platform/installation/quick-start.html`,
  },
  {
    name: 'Documentation',
    icon: 'lucide:file-text',
    detail:
      'Guides and the technical reference for every resource, published from the source code.',
    link_text: 'docs.smarter.sh',
    url: `${DOCS}/`,
  },
  {
    name: 'Source code',
    icon: 'lucide:github',
    detail:
      'The platform: Django, Django REST Framework, Pydantic, Celery and React. AGPL-3.0.',
    link_text: 'smarter-sh/smarter',
    url: `${GITHUB}/smarter`,
  },
  {
    name: 'SDKs and APIs',
    icon: 'lucide:code-xml',
    detail:
      'Python, Node.js and Go SDKs, the CLI, and the OpenAPI contract that they share.',
    link_text: 'SDKs and APIs',
    url: '/sdks',
  },
  {
    name: 'Extensions',
    icon: 'lucide:puzzle',
    detail:
      'Package tools in Python, and publish them to the signed Smarter Extension registry.',
    link_text: 'Extensions',
    url: '/extensions',
  },
  {
    name: 'Integrations',
    icon: 'lucide:globe',
    detail:
      'WordPress, Drupal, Shopify, Google Tag Manager and documentation-site plugins, all open source.',
    link_text: 'Integrations',
    url: '/integrations',
  },
  {
    name: 'Helm chart',
    icon: 'lucide:ship',
    detail: 'Deploy Smarter to your Kubernetes cluster with the official Helm chart.',
    link_text: 'Artifact Hub',
    url: 'https://artifacthub.io/packages/helm/project-smarter/smarter',
  },
  {
    name: 'Docker images',
    icon: 'lucide:box',
    detail: 'The official container images, patched at least monthly.',
    link_text: 'Docker Hub',
    url: 'https://hub.docker.com/r/mcdaniel0073/smarter',
  },
  {
    name: 'Terraform for AWS',
    icon: 'lucide:server',
    detail:
      'Build the whole AWS environment: EKS, Route 53, ACM, S3 and SES, with remote state.',
    link_text: 'smarter-infrastructure',
    url: `${GITHUB}/smarter-infrastructure`,
  },
  {
    name: 'Release notes',
    icon: 'lucide:list-checks',
    detail: 'Semantic-versioned releases, with a changelog for every one.',
    link_text: 'Changelog',
    url: `${GITHUB}/smarter/blob/main/CHANGELOG.md`,
  },
  {
    name: 'Sponsor Smarter',
    icon: 'lucide:heart',
    detail: 'Support the project’s maintainers and help keep Smarter free.',
    link_text: 'GitHub Sponsors',
    url: 'https://github.com/sponsors/lpm0073',
  },
  {
    name: 'All repositories',
    icon: 'lucide:folder-git-2',
    detail: 'The platform, CLI, SDKs, chat, extensions, integrations and infrastructure.',
    link_text: 'github.com/smarter-sh',
    url: `${GITHUB}/`,
  },
]
