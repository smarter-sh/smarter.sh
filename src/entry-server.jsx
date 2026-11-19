import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { basePath } from './common/constants'

/*
 * The server side of the site's pre-rendering (scripts/prerender.mjs), built by `vite build --ssr`.
 *
 * Renders the page at a url to HTML, the same tree that src/main.jsx hydrates in the browser.
 * prerenderToNodeStream waits for every lazily loaded page and Suspense boundary, so the HTML holds
 * the page's whole content, not a loading state. React 19 hoists each page's <title>, <meta> and
 * <link> (PageMetaData, through react-helmet-async) to the front of the HTML, where the prerender
 * script moves them into <head>.
 */
export const render = async (url) => {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url} basename={basePath}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
  const chunks = []
  for await (const chunk of prelude) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}
