import { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { UI_CHAT_EMBED_URL } from '@/common/chatbots'
import { QUICK_START } from '@/common/constants'

// Adds the embed script of @smarter.sh/ui-chat to the page, once. Without a data-chatbot
// attribute it only defines the <smarter-chat> element, which the component renders itself.
export const loadEmbedScript = (doc = document) => {
  if (doc.querySelector(`script[src="${UI_CHAT_EMBED_URL}"]`)) return
  const script = doc.createElement('script')
  script.src = UI_CHAT_EMBED_URL
  script.async = true
  doc.head.appendChild(script)
}

// What the chatbot looks like, for a chatbot that isn't deployed yet.
const ChatPreview = ({ bot }) => {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border border-default-700 bg-default-950/70"
      data-testid={`chat-preview-${bot.name}`}
    >
      <div className="flex items-center gap-3 border-b border-default-800 bg-default-900/80 px-5 py-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
          <IconifyIcon icon="lucide:sparkles" className="h-5 w-5" />
        </span>
        <div>
          <p className="font-medium text-white">{bot.appName}</p>
          <p className="text-xs text-default-400">Built and run on Smarter</p>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-5">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-default-800 px-4 py-3 text-sm text-default-100">
          {bot.welcome}
        </div>
        <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-default-400">
          Try asking
        </p>
        <ul className="space-y-2">
          {bot.examples.map((example) => (
            <li
              key={example}
              className="rounded-lg border border-default-700 px-4 py-2 text-sm text-default-200"
            >
              {example}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-default-800 px-5 py-4">
        <a
          href={bot.workbenchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all hover:bg-primary/80"
        >
          <IconifyIcon icon="lucide:message-circle" className="h-4 w-4" />
          Open the live chat
        </a>
        <p className="text-xs text-default-400">
          Needs a ubc.smarter.sh login.{' '}
          <a
            href={QUICK_START}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Or run it yourself
          </a>
          .
        </p>
      </div>
    </div>
  )
}

// Whether a deployed chatbot answers: the request that the chat itself makes first.
export const isChatbotAvailable = async (bot) => {
  if (!bot.chatbot) return false
  try {
    const response = await fetch(new URL('config/', bot.chatbot), {
      credentials: 'include',
      headers: bot.apiKey ? { Authorization: `Token ${bot.apiKey}` } : {},
    })
    return Boolean(response?.ok)
  } catch {
    return false
  }
}

// A Smarter chatbot, inline in the page: the live chat if the deployed chatbot answers,
// and a preview of it otherwise.
const SmarterChatEmbed = ({ bot, height = '640px' }) => {
  const [live, setLive] = useState(false)
  useEffect(() => {
    let active = true
    isChatbotAvailable(bot).then((available) => {
      if (!active || !available) return
      loadEmbedScript()
      setLive(true)
    })
    return () => {
      active = false
    }
  }, [bot])
  if (!live) return <ChatPreview bot={bot} />
  return (
    <smarter-chat
      chatbot={bot.chatbot}
      api-key={bot.apiKey || undefined}
      mode="inline"
      height={height}
      label={bot.appName}
      data-testid={`chat-live-${bot.name}`}
    />
  )
}
export default SmarterChatEmbed
