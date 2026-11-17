import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import IconifyIcon from './wrappers/IconifyIcon'
import SmartLink from './site/SmartLink'

// A navbar entry that opens a panel of links instead of going to a page. Its trigger is a
// button, not a link, so a hub page that used to sit behind the label (e.g. /developers)
// goes in the panel's footer, where it reads as "see everything" rather than as a duplicate
// of the label. On a desktop the panel opens on hover or click; inside the collapsed phone
// menu it opens inline, below the trigger, so nothing overflows a 375px screen.
const NavDropdown = ({ label, items, footer }) => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const panelId = useId()
  const links = [...items.map((item) => item.link), ...(footer ? [footer.link] : [])]
  const active = links.some((link) => pathname.startsWith(link))

  // close on navigation, on a click elsewhere, and on Escape
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return undefined
    const onClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // hover only opens the panel where there is a pointer that hovers (not a phone's tap)
  const hoverable = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(hover: hover) and (min-width: 1024px)').matches

  return (
    <li
      ref={ref}
      className={`nav-item relative ${active ? 'active' : ''}`}
      onMouseEnter={() => hoverable() && setOpen(true)}
      onMouseLeave={() => hoverable() && setOpen(false)}
    >
      <button
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-controls={panelId}
        // where hover already opened the panel, a click must not toggle it shut again
        onClick={() => setOpen(hoverable() ? true : !open)}
      >
        {/* the navbar's css makes .nav-link a block, so this inner span keeps the label
            and its chevron on one line */}
        <span className="flex items-center gap-1 whitespace-nowrap">
          {label}
          <IconifyIcon
            icon="lucide:chevron-down"
            className={`h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>
      <div
        id={panelId}
        className={`${open ? 'block' : 'hidden'} mt-2 lg:absolute lg:left-1/2 lg:top-full lg:z-50 lg:mt-0 lg:w-[22rem] lg:-translate-x-1/2 lg:pt-3`}
      >
        <div className="overflow-hidden rounded-xl border border-keen-200 bg-white lg:shadow-lg">
          <ul className="p-2">
            {items.map((item) => (
              <li key={item.link}>
                <SmartLink
                  href={item.link}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-keen-200"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                    <IconifyIcon icon={item.icon} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-keen-900">
                      {item.label}
                    </span>
                    <span className="block text-sm text-keen-600">
                      {item.description}
                    </span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
          {footer && (
            <SmartLink
              href={footer.link}
              className="flex items-center justify-between gap-3 border-t border-keen-200 bg-keen-100 px-5 py-3 text-sm transition-colors hover:bg-keen-200"
            >
              <span>
                <span className="block font-semibold text-keen-900">{footer.label}</span>
                <span className="block text-keen-600">{footer.description}</span>
              </span>
              <IconifyIcon
                icon="lucide:arrow-right"
                className="h-4 w-4 shrink-0 text-primary"
              />
            </SmartLink>
          )}
        </div>
      </div>
    </li>
  )
}

export default NavDropdown
