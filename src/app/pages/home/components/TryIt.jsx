import { useState } from 'react'
import Section from '@/components/site/Section'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { accent } from '@/helpers/accent'
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

// The theme's tabbed panel, holding three assistants that were built on Smarter.
const TryIt = () => {
  const [active, setActive] = useState(tabs[0].id)
  const tab = tabs.find((item) => item.id === active)
  return (
    <Section
      id="try-it"
      accent="emerald"
      glow
      eyebrow="See it for yourself"
      title="Assistants built on Smarter"
      intro="Each one is a short manifest that ships with Smarter. Your people build assistants like these."
    >
      <div className="rounded-2xl border border-white/10 bg-default-950/40 p-4 md:p-6">
        <nav role="tablist" className="grid gap-3 md:grid-cols-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === active}
              onClick={() => setActive(item.id)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-4 text-base font-medium text-white transition-all',
                item.id === active
                  ? cn(accent(item.accent).solid, 'border-transparent')
                  : accent(item.accent).hoverBorder
              )}
            >
              <IconifyIcon icon={item.icon} className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div role="tabpanel" className="mt-6 grid gap-6 lg:grid-cols-5">
          <div
            className={cn(
              'rounded-xl border-t-2 bg-default-950/40 p-6 lg:col-span-2',
              accent(tab.accent).border
            )}
          >
            <h3 className="text-3xl font-medium text-white">{tab.title}</h3>
            <p className="mt-4 text-default-200">{tab.text}</p>
            <ul className="mt-6 space-y-3">
              {tab.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-default-100">
                  <IconifyIcon
                    icon="lucide:check"
                    className={cn('h-5 w-5', accent(tab.accent).text)}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-[520px] lg:col-span-3">
            <SmarterChatEmbed key={tab.id} bot={tab.bot} height="560px" />
          </div>
        </div>
      </div>
    </Section>
  )
}
export default TryIt
