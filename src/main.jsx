import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { basePath } from './common/constants'
import { clearPrerender } from './routes/prerender'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Every page's HTML is pre-rendered when the site is built (scripts/prerender.mjs). The browser
// hydrates it, unless it was rendered for another url (index.html, served for any url without a
// page of its own), or not at all (the dev server): then the app renders the page itself.
if (clearPrerender(document, container, window.location.pathname)) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
