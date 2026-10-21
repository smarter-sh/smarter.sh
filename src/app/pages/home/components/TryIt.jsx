import { useState } from 'react'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard, toneOf } from '@/components/site/ConsoleCard'
import { chatbots } from '@/common/chatbots'

const tabs = [
  {
    id: 'euclid',
    accent: 'emerald',
    label: 'Euclid · Education',
    icon: 'lucide:sigma',
    bot: chatbots.math,
    title: 'A math tutor for students',
    text: 'Typesets equations, draws diagrams, plots functions and finds pictures, on a chalkboard of its own.',
    points: [
      'LaTeX math and Mermaid diagrams',
      'An image-search tool',
      'Its look, set in its manifest',
    ],
  },
  {
    id: 'sdk-guide',
    accent: 'amber',
    label: 'SDK Guide · Developers',
    icon: 'lucide:code-xml',
    bot: chatbots.sdkGuide,
    title: 'A developer advocate',
    text: 'Answers from the SDKs’ current code and documentation, through an MCP server, never from memory.',
    points: ['Python, Node.js and Go', 'Runnable examples', 'Links to its sources'],
  },
  {
    id: 'developer',
    accent: 'violet',
    label: 'Developer · Contributors',
    icon: 'lucide:git-branch',
    bot: chatbots.developer,
    title: 'A staff engineer',
    text: 'Explains how any part of Smarter works, and shows you the code, from the project’s own repositories.',
    points: ['Reads the source code', 'Knows the architecture', 'Cites files and lines'],
  },
]

// Three assistants that ship with Smarter, each with a live preview of its chat.
const TryIt = () => {
  const [active, setActive] = useState(tabs[0].id)
  const tab = tabs.find((item) => item.id === active)
  const tone = toneOf(tab.accent)
  return (
    <div className="col-12">
      <ConsoleCard
        id="try-it"
        title="Assistants built on Smarter"
        subtitle="Each one is a short manifest that ships with Smarter. Your people build assistants like these."
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
        <div role="tabpanel" className="row g-8">
          <div className="col-lg-5">
            <h3 className="fs-2 fw-bold text-gray-900 mb-4">{tab.title}</h3>
            <p className="fs-5 text-gray-700 mb-6">{tab.text}</p>
            <ul className="home-checks">
              {tab.points.map((point) => (
                <li key={point}>
                  <IconifyIcon
                    icon="lucide:check"
                    width={18}
                    height={18}
                    className={`text-${tone}`}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-7">
            <SmarterChatEmbed key={tab.id} bot={tab.bot} height="560px" />
          </div>
        </div>
      </ConsoleCard>
    </div>
  )
}
export default TryIt
