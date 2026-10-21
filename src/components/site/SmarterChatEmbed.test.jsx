import { render, screen } from '@testing-library/react'
import SmarterChatEmbed, { isChatbotAvailable, loadEmbedScript } from './SmarterChatEmbed'
import { UI_CHAT_EMBED_URL, chatbots } from '@/common/chatbots'

const bot = {
  ...chatbots.math,
  chatbot: 'https://math.3141-5926-5359.api.example.com/',
  apiKey: '',
}

// a chatbot's answer to its config/ request: a JSON configuration.
const answers = () =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ data: {} }) })

const embedScripts = () => document.querySelectorAll(`script[src="${UI_CHAT_EMBED_URL}"]`)

afterEach(() => {
  embedScripts().forEach((script) => script.remove())
})

describe('isChatbotAvailable', () => {
  test('asks the chatbot for its configuration, as the chat does', async () => {
    global.fetch = jest.fn(answers)
    expect(await isChatbotAvailable(bot)).toBe(true)
    const [url, options] = global.fetch.mock.calls[0]
    expect(String(url)).toBe('https://math.3141-5926-5359.api.example.com/config/')
    expect(options.method).toBe('POST')
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' })
  })

  test('sends the api key, when there is one', async () => {
    global.fetch = jest.fn(answers)
    await isChatbotAvailable({ ...bot, apiKey: 'key-1' })
    expect(global.fetch.mock.calls[0][1].headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Token key-1',
    })
  })

  test('is false for an error, a failed request or no url', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 403 }))
    expect(await isChatbotAvailable(bot)).toBe(false)
    global.fetch = jest.fn(() => Promise.reject(new Error('cors')))
    expect(await isChatbotAvailable(bot)).toBe(false)
    expect(await isChatbotAvailable({ ...bot, chatbot: '' })).toBe(false)
  })

  test("is false for a host's html page, which isn't a configuration", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject(new SyntaxError('not json')),
      })
    )
    expect(await isChatbotAvailable(bot)).toBe(false)
  })
})

describe('loadEmbedScript', () => {
  test('adds the embed script once', () => {
    loadEmbedScript()
    loadEmbedScript()
    expect(embedScripts()).toHaveLength(1)
    expect(embedScripts()[0].async).toBe(true)
  })
})

describe('SmarterChatEmbed', () => {
  test('previews a chatbot that does not answer, with a link to its live chat', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 400 }))
    render(<SmarterChatEmbed bot={bot} />)
    expect(await screen.findByTestId('chat-preview-math')).toBeInTheDocument()
    expect(screen.getByText(bot.examples[0])).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open the live chat/ })).toHaveAttribute(
      'href',
      bot.workbenchUrl
    )
    expect(embedScripts()).toHaveLength(0)
  })

  test('shows the live chat of a chatbot that answers', async () => {
    global.fetch = jest.fn(answers)
    render(<SmarterChatEmbed bot={{ ...bot, apiKey: 'key-1' }} height="500px" />)
    const chat = await screen.findByTestId('chat-live-math')
    expect(chat.tagName.toLowerCase()).toBe('smarter-chat')
    expect(chat.getAttribute('chatbot')).toBe(bot.chatbot)
    expect(chat.getAttribute('api-key')).toBe('key-1')
    expect(chat.getAttribute('mode')).toBe('inline')
    expect(chat.getAttribute('height')).toBe('500px')
    expect(chat.getAttribute('session-cookie-name')).toBe(
      `smarter_chat_session_${bot.name}`
    )
    expect(embedScripts()).toHaveLength(1)
  })
})
