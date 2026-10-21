import { kindInfo } from '@smarter.sh/ui-widgets'
import weather from './weather.json'
import math from './math.json'
import smarterSdkGuide from './smarter_sdk_guide.json'
import smarterDeveloper from './smarter_developer.json'

/*
 * The architectures of the assistants on the home page, with a public link on every card.
 *
 * The trees are exported with --public, which leaves out the web console urls: those pages need a
 * login. Instead, each resource's card opens its manifest in the public smarter repository, an
 * Extension's opens its own repository, and a resource without a manifest of its own (the platform
 * creates the openai Provider and its Secret) opens its kind's page in the documentation.
 */

const APPS = 'https://github.com/smarter-sh/smarter/blob/main/smarter/smarter/apps'

const manifests = {
  'LLMClient weather': `${APPS}/llmclient/data/llm-clients/llmclient-weather.yaml`,
  'LLMClient math': `${APPS}/llmclient/data/llm-clients/llmclient-math.yaml`,
  'LLMClient smarter_sdk_guide': `${APPS}/llmclient/data/llm-clients/llmclient-smarter-sdk-guide.yaml`,
  'LLMClient smarter_developer': `${APPS}/llmclient/data/llm-clients/llmclient-smarter-developer.yaml`,
  'ImageSearchPlugin image_search': `${APPS}/llmtool/data/sample-plugins/image-search.yaml`,
  'ImageSearchPlugin diagram_image_search': `${APPS}/llmtool/data/sample-plugins/image-search-diagram.yaml`,
}

const kebab = (name) => name.replaceAll('_', '-')

/**
 * The public page of one resource, or null for the docs' page of its kind.
 *
 * @param {{kind: string, name: string|null}} node
 * @returns {string|null}
 */
const manifestUrl = ({ kind, name }) => {
  if (!name) return null
  switch (kind) {
    case 'Guardrail':
      return `${APPS}/guardrail/data/guardrails/${kebab(name)}.yaml`
    case 'MCPClient':
      return `${APPS}/mcpclient/data/mcpclients/${kebab(name)}.yaml.tpl`
    case 'Extension':
      return `https://github.com/smarter-sh/smarter-extension-${kebab(name)}`
    default:
      return manifests[`${kind} ${name}`] ?? null
  }
}

/**
 * A copy of a tree in which every readable resource links to its public page.
 *
 * @param {object} node - a tree node, as manage.py export_llmclient_architecture writes it
 * @returns {object}
 */
export const withPublicUrls = (node) => ({
  ...node,
  url: node.readable ? (manifestUrl(node) ?? kindInfo(node.kind).docsUrl) : null,
  children: node.children.map(withPublicUrls),
})

export const architectures = {
  weather: withPublicUrls(weather),
  math: withPublicUrls(math),
  smarterSdkGuide: withPublicUrls(smarterSdkGuide),
  smarterDeveloper: withPublicUrls(smarterDeveloper),
}
