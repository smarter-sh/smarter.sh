import { useEffect, useState } from 'react'
import SmartLink from './site/SmartLink'

// The key in localStorage that remembers that the visitor closed the notice. The web console's
// notice (smarter/templates/common/cookie-notice.html) uses the same key, on its own origin.
export const DISMISSED_KEY = 'smarter-cookie-notice-dismissed'

const isDismissed = () => {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

// The cookie notice, on every page, until the visitor closes it. It sits at the bottom left, away
// from the back-to-top button. Without localStorage, e.g. in a private window, it shows again on
// the next visit.
const CookieNotice = () => {
  // shown after the first render, so that a visitor who closed it before never sees it flash
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(!isDismissed()), [])

  if (!visible) return null

  const close = () => {
    setVisible(false)
    try {
      window.localStorage.setItem(DISMISSED_KEY, '1')
    } catch {
      // the notice closes for this visit only
    }
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-40 flex items-center gap-6 rounded-lg border border-keen-300 bg-white px-6 py-5 shadow-2xl sm:inset-x-auto sm:start-5 sm:bottom-5 sm:max-w-md"
    >
      <p className="text-base text-keen-900">
        We use cookies to improve your experience.{' '}
        <SmartLink href="/privacy" className="underline hover:text-primary">
          Privacy policy
        </SmartLink>
      </p>
      <button
        type="button"
        onClick={close}
        className="shrink-0 rounded-md bg-keen-900 px-5 py-2.5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-keen-800"
      >
        Close
      </button>
    </div>
  )
}
export default CookieNotice
