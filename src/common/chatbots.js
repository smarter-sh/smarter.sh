/*
 * The Smarter chatbots that smarter.sh embeds with the embed script of @smarter.sh/ui-chat.
 *
 * Each one is a built-in LLMClient of the Smarter platform, whose manifest is in
 * smarter/smarter/apps/llmclient/data/llm-clients/ of github.com/smarter-sh/smarter.
 *
 * `chatbot` is the url of the *deployed* LLMClient on ubc.smarter.sh, where the platform's
 * init job deploys every built-in LLMClient for the Smarter account, 3141-5926-5359. Its manifest
 * allows https://smarter.sh in spec.config.prompt.allowedOrigins. A workbench url can't be used
 * here: it requires a logged-in user.
 *
 * `apiKey` is a Smarter api key, for an LLMClient whose manifest names one in spec.apiKey. It is
 * public, as is everything in a web page; it lets the key be revoked, and its use be budgeted.
 *
 * The page asks the chatbot for its configuration first, and shows the live chat only if it
 * answers. Otherwise, it shows a preview of the chatbot (its name, welcome message and example
 * prompts), with a link to `workbenchUrl`, the chatbot in the web console, which requires a login.
 */

// the version of @smarter.sh/ui-chat whose embed script the site loads.
export const UI_CHAT_VERSION = '0.11.0'
export const UI_CHAT_EMBED_URL = `https://cdn.jsdelivr.net/npm/@smarter.sh/ui-chat@${UI_CHAT_VERSION}/dist/embed.js`

export const chatbots = {
  math: {
    workbenchUrl: 'https://ubc.smarter.sh/workbench/llm-clients/rMTAwMDAyNAx/prompt/',
    name: 'math',
    chatbot: 'https://math.3141-5926-5359.api.ubc.smarter.sh/',
    apiKey: '',
    appName: 'Euclid the Math Tutor',
    assistant: 'Euclid',
    welcome:
      "Welcome! I'm Euclid. Ask me about algebra, geometry, calculus, number theory or anything else in math.",
    examples: [
      'Derive the quadratic formula, step by step.',
      'Draw a flowchart of the Euclidean algorithm, then use it to find gcd(1071, 462).',
      'Plot y = x² - 2x - 3 from x = -2 to x = 4, and find its roots and vertex.',
      'Explain the Seven Bridges of Königsberg, with a graph of the bridges.',
    ],
  },
  sdkGuide: {
    workbenchUrl: 'https://ubc.smarter.sh/workbench/llm-clients/rMTAwMDAyOAx/prompt/',
    name: 'smarter_sdk_guide',
    chatbot: 'https://smarter-sdk-guide.3141-5926-5359.api.ubc.smarter.sh/',
    apiKey: '',
    appName: 'Smarter SDK Guide',
    assistant: 'Ada',
    welcome:
      "Welcome! Tell me what you're building, and in which language, and I'll show you how to call Smarter.",
    examples: [
      'How do I send a prompt to an LLMClient from Python?',
      'Show me how to apply a manifest with the Node.js SDK.',
      'How does the Go SDK authenticate, and where does it read my api key?',
      'What does smarter apply do, and which api endpoint does it call?',
    ],
  },
  developer: {
    workbenchUrl: 'https://ubc.smarter.sh/workbench/llm-clients/rMTAwMDAyNwx/prompt/',
    name: 'smarter_developer',
    chatbot: 'https://smarter-developer.3141-5926-5359.api.ubc.smarter.sh/',
    apiKey: '',
    appName: 'Smarter Developer Guide',
    assistant: 'Sam',
    welcome:
      "Welcome! Ask me how any part of The Smarter Project works, and I'll show you the code.",
    examples: [
      'How do I add a new SAM resource kind to Smarter?',
      "Where is a prompt's tool call dispatched to an MCP server?",
      'How are Celery tasks scheduled, and which queue does each one use?',
      'Which files does the smarter cli change when a new api route is added?',
    ],
  },
}
