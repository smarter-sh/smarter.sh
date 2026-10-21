import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { chatbots } from './src/common/chatbots.js'

/*
 * The dev server's proxy for the Smarter chatbots that the site embeds.
 *
 * A deployed chatbot allows https://smarter.sh only (its manifest's allowedOrigins), so a page on
 * http://localhost:5173 can't call it: the browser's CORS check blocks the chat, and the page shows
 * previews. In development, each chatbot is served from the dev server instead, at /chatbots/<name>/,
 * so that its requests are same-origin. The proxy rewrites the chatbot's own urls in its JSON answers
 * (the configuration's url_llmclient, where the chat sends its prompts) to the proxy's, and keeps the
 * platform's cookies on localhost. src/components/site/SmarterChatEmbed.jsx uses the proxy only when
 * __CHATBOT_PROXY__ is true, in `vite` (dev), never in a build.
 */
const chatbotProxy = Object.fromEntries(
  Object.values(chatbots).map((bot) => {
    const target = new URL(bot.chatbot)
    const prefix = `/chatbots/${bot.name}`
    return [
      prefix,
      {
        target: target.origin,
        changeOrigin: true,
        rewrite: (path) => path.slice(prefix.length) || '/',
        selfHandleResponse: true,
        configure: (proxy) => {
          // an uncompressed answer, so that its urls can be rewritten
          proxy.on('proxyReq', (proxyReq) =>
            proxyReq.setHeader('accept-encoding', 'identity')
          )
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const chunks = []
            proxyRes.on('data', (chunk) => chunks.push(chunk))
            proxyRes.on('end', () => {
              let body = Buffer.concat(chunks)
              if (String(proxyRes.headers['content-type']).includes('json')) {
                const local = `http://${req.headers.host}${prefix}/`
                body = Buffer.from(
                  body.toString('utf8').replaceAll(`${target.origin}/`, local)
                )
              }
              const headers = { ...proxyRes.headers }
              delete headers['content-length']
              delete headers['content-encoding']
              if (headers['set-cookie']) {
                headers['set-cookie'] = headers['set-cookie'].map((cookie) =>
                  cookie
                    .replace(/;\s*Domain=[^;]+/i, '')
                    .replace(/;\s*Secure/i, '')
                    .replace(/;\s*SameSite=None/i, '; SameSite=Lax')
                )
              }
              res.writeHead(proxyRes.statusCode ?? 502, headers)
              res.end(body)
            })
          })
        },
      },
    ]
  })
)

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  define: {
    __CHATBOT_PROXY__: JSON.stringify(command === 'serve' && !isPreview),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: chatbotProxy,
  },
}))
