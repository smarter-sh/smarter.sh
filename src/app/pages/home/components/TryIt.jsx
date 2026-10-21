import { useState } from 'react'
import { ResourceTree, kindInfo } from '@smarter.sh/ui-widgets'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard, toneOf } from '@/components/site/ConsoleCard'
import { chatbots } from '@/common/chatbots'
import { architectures } from '@/common/architectures'

/*
 * Four assistants that ship with Smarter: each one's live chat, beside its architecture, the tree of the
 * Smarter resources that it is built from, and above them, what each of those resources does for it.
 *
 * The trees are src/common/architectures/<name>.json, written by the platform's
 *   python manage.py export_llmclient_architecture --name <name> --public --output <name>.json
 * which leaves out owners and web console urls. Run it again when an assistant's manifest changes.
 * src/common/architectures/index.js links each card to the resource's public manifest instead.
 */

const OPENAI = {
  kind: 'Provider',
  name: 'openai',
  text: 'The AI vendor that answers. Its api key is a Secret, encrypted, that neither the model nor the user ever sees.',
}

// OpenAI's function calling guide, whose get_weather example the Weather assistant implements.
const OPENAI_FUNCTION_CALLING =
  'https://developers.openai.com/api/docs/guides/function-calling'

const tabs = [
  {
    id: 'weather',
    accent: 'sky',
    label: 'Weather · Extensions',
    icon: 'lucide:cloud-sun',
    bot: chatbots.weather,
    tree: architectures.weather,
    title: 'A weather forecaster',
    text: (
      <>
        The <span className="home-inline-name">get_weather</span> tool of OpenAI’s{' '}
        <a
          href={OPENAI_FUNCTION_CALLING}
          target="_blank"
          rel="noopener noreferrer"
          className="link-primary fw-semibold text-decoration-underline"
        >
          function calling guide
        </a>{' '}
        is an example that OpenAI never implemented. Smarter did: current conditions and
        the next hours’ forecast for any place, with a picture of it. One LLMClient that
        combines four kinds of resources, each a manifest of its own.
      </>
    ),
    resources: [
      {
        kind: 'LLMClient',
        name: 'weather',
        text: 'The assistant: its instructions, its model and its look.',
      },
      OPENAI,
      {
        kind: 'Extension',
        name: 'weather',
        text: 'A tool that a developer packaged in Python, and an administrator installed from the signed Smarter Extension registry, without a redeploy.',
      },
      {
        kind: 'ImageSearchPlugin',
        name: 'image_search',
        text: 'A tool that is configured, not coded: it finds a picture of the place.',
      },
      {
        kind: 'Guardrail',
        name: 'prompt_injection_keyword_input',
        text: 'Screens every prompt for manipulation attempts before the model sees it.',
      },
    ],
  },
  {
    id: 'euclid',
    accent: 'emerald',
    label: 'Euclid · Education',
    icon: 'lucide:sigma',
    bot: chatbots.math,
    tree: architectures.math,
    title: 'A math tutor for students',
    text: 'Typesets equations, draws diagrams, plots functions and finds pictures, on a chalkboard of its own, set in its manifest.',
    resources: [
      {
        kind: 'LLMClient',
        name: 'math',
        text: 'The tutor: its teaching style, its model, and its chalkboard look.',
      },
      OPENAI,
      {
        kind: 'Extension',
        name: 'calculator',
        text: 'Exact arithmetic, so that the model doesn’t guess at numbers.',
      },
      {
        kind: 'ImageSearchPlugin',
        name: 'image_search, diagram_image_search',
        text: 'Two configured tools that find pictures and diagrams, each with its own Provider.',
      },
      {
        kind: 'Guardrail',
        name: 'moderation_input, moderation_output, self_harm_input',
        text: 'Three guardrails that keep the conversation safe for students, in both directions.',
      },
    ],
  },
  {
    id: 'sdk-guide',
    accent: 'amber',
    label: 'SDK Guide · Developers',
    icon: 'lucide:code-xml',
    bot: chatbots.sdkGuide,
    tree: architectures.smarterSdkGuide,
    title: 'A developer advocate',
    text: 'Answers from the SDKs’ current code and documentation, never from memory, and shows a runnable example in your language.',
    resources: [
      {
        kind: 'LLMClient',
        name: 'smarter_sdk_guide',
        text: 'The guide, Ada: its instructions and its model.',
      },
      OPENAI,
      {
        kind: 'MCPClient',
        name: 'smarter_project_github, _cli, _golang, _nodejs, _python',
        text: 'Five MCP servers’ tools, one for each repository, so that it reads the code it explains.',
      },
      {
        kind: 'Guardrail',
        name: 'prompt_injection_keyword_input, secrets_redaction_input, …',
        text: 'Four guardrails, against manipulation, injected scripts and leaked secrets, in both directions.',
      },
    ],
  },
  {
    id: 'developer',
    accent: 'violet',
    label: 'Developer · Contributors',
    icon: 'lucide:git-branch',
    bot: chatbots.developer,
    tree: architectures.smarterDeveloper,
    title: 'A staff engineer',
    text: 'Explains how any part of Smarter works, and shows you the code, from the project’s own repositories.',
    resources: [
      {
        kind: 'LLMClient',
        name: 'smarter_developer',
        text: 'The engineer, Sam: its instructions and its model.',
      },
      OPENAI,
      {
        kind: 'MCPClient',
        name: 'smarter_project',
        text: 'The Smarter Project MCP server: it searches the documentation and the code, and reads files.',
      },
      {
        kind: 'Guardrail',
        name: 'prompt_injection_keyword_input, secrets_redaction_input, …',
        text: 'Four guardrails, against manipulation, injected scripts and leaked secrets, in both directions.',
      },
    ],
  },
]

// What each of an assistant's resources does for it, colored like its card in the tree.
const Resources = ({ items }) => (
  <ul className="home-resources">
    {items.map((item) => {
      // Keen's dark tone, the Guardrails', is a dark gray, which a dark card hides: a neutral badge instead.
      const { tone } = kindInfo(item.kind)
      const badge =
        tone === 'dark' ? 'badge-light text-gray-800' : `badge-light-${tone} text-${tone}`
      return (
        <li key={`${item.kind}-${item.name}`}>
          <span className={`badge ${badge} fw-bold`}>{item.kind}</span>
          <div>
            <span className="home-resource-name">{item.name}</span>
            <p className="text-gray-700 fs-7 mb-0">{item.text}</p>
          </div>
        </li>
      )
    })}
  </ul>
)

const TryIt = () => {
  const [active, setActive] = useState(tabs[0].id)
  const tab = tabs.find((item) => item.id === active)
  return (
    <div className="col-12">
      <ConsoleCard
        id="try-it"
        title="Assistants built on Smarter"
        subtitle="Each one is a short manifest that ships with Smarter, built from other Smarter resources. Chat with it live, beside the tree of the resources that it is made of."
      >
        <div role="tablist" className="d-flex flex-wrap gap-3 mb-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === active}
              onClick={() => setActive(item.id)}
              className={`btn fw-semibold d-inline-flex align-items-center gap-2 ${
                item.id === active ? `btn-light-${toneOf(item.accent)}` : 'btn-light'
              }`}
            >
              <IconifyIcon icon={item.icon} width={18} height={18} />
              {item.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" aria-label={tab.label}>
          <h3 className="fs-2 fw-bold text-gray-900 mb-3">{tab.title}</h3>
          <p className="fs-5 text-gray-700 mb-6">{tab.text}</p>
          <Resources items={tab.resources} />
          <div className="row g-6 mt-2">
            <div className="col-xl-6">
              <h4 className="home-panel-title">The live chat</h4>
              <SmarterChatEmbed key={tab.id} bot={tab.bot} height="600px" />
            </div>
            <div className="col-xl-6">
              <h4 className="home-panel-title">Its architecture</h4>
              <div className="home-architecture">
                <ResourceTree
                  key={tab.id}
                  tree={tab.tree}
                  label={`The resources that ${tab.bot.appName} is built from`}
                  defaultCollapsed
                />
              </div>
            </div>
          </div>
        </div>
      </ConsoleCard>
    </div>
  )
}
export default TryIt
