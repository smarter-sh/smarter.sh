---
name: smarter.sh-chatbots
description: Use when a smarter.sh page embeds a live Smarter chatbot, or when changing src/common/chatbots.js, SmarterChatEmbed.jsx, the version of @smarter.sh/ui-chat's embed script, or the dev server's chatbot proxy in vite.config.js, e.g. "add the math tutor to the education page", "the chat shows a preview instead of the live chat", "upgrade ui-chat". Covers the deployed LLMClients on ubc.smarter.sh, allowedOrigins and CORS, the preview fallback, per-chatbot session cookies, and testing.
---

# smarter.sh Chatbots

The site embeds real Smarter chatbots: built-in LLMClients of the Smarter platform, deployed on
ubc.smarter.sh. Each page loads the embed script of `@smarter.sh/ui-chat` from jsDelivr and renders
its `<smarter-chat>` element.

## The pieces

- **`src/common/chatbots.js`**: one entry per chatbot: `chatbot` (the deployed url),
  `workbenchUrl`, `name`, `apiKey` (public, optional), and the preview's `appName`, `welcome` and
  `examples`. `UI_CHAT_VERSION` pins the embed script's version. The manifests behind them are in
  the smarter repository (`smarter/smarter/apps/llmclient/data/llm-clients/`) and in stackademy
  (`llm-clients/`).
- **`src/components/site/SmarterChatEmbed.jsx`**: asks the chatbot for its config first, and shows
  the live chat only if it answers. Otherwise it shows `ChatPreview`: the welcome message, the
  example prompts and a link to the workbench. Each chatbot saves its session in its own cookie
  (`sessionCookieName(bot)`), so two chatbots on one page don't share a conversation.
- **The dev proxy** (`vite.config.js`): a deployed chatbot's manifest allows only
  `https://smarter.sh` (`spec.config.prompt.allowedOrigins`), so from `localhost:5173` the browser's
  CORS check would block it. In `yarn start`, each chatbot is served at `/chatbots/<name>/` through
  a proxy that rewrites its urls and cookies. `__CHATBOT_PROXY__` is true only in the dev server,
  never in a build or `vite preview`.

## Adding a chatbot

1. Make sure it exists and is deployed on ubc.smarter.sh, and that its manifest's `allowedOrigins`
   includes `https://smarter.sh`. That change is in the smarter or stackademy repository, not here;
   tell the user if it's missing.
2. Add its entry to `chatbots` (the proxy picks it up automatically).
3. Render `<SmarterChatEmbed bot={chatbots.<key>} />`.

## When it shows the preview instead of the chat

The config request failed: the chatbot isn't deployed, its host doesn't resolve, or its
`allowedOrigins` doesn't include the page's origin. In `vite preview` it is always the preview,
because there is no proxy and the origin is localhost. Check the chatbot's `config/` url directly
before changing code.

## Testing

Tests have no network: set `global.fetch = jest.fn(() => Promise.reject(new Error('offline')))`
and assert the preview by its test id, `chat-preview-<name>`. See
`src/components/site/SmarterChatEmbed.test.jsx`.
