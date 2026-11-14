import { createContext, useContext } from 'react'
import { cn } from '@/helpers/cn'
import { useInView } from './motion'

// Whether the panel around a component has scrolled into view, and whether it is on screen now.
const PanelContext = createContext({ seen: true, visible: true })
export const usePanel = () => useContext(PanelContext)

// A dark panel in the look of the Smarter pitch deck (story.css): the deck's background and glow,
// its kicker, heading and subtitle. By default it is a card in the dashboard's grid; bleed makes it
// a band as wide as the window, as the cover is. Its .home-rise children rise into place, in --i
// order, when it first scrolls into view.
export const Panel = ({
  id,
  label,
  kicker,
  accent = 'amber',
  title,
  subtitle,
  bleed = false,
  className,
  innerClassName,
  children,
}) => {
  const [ref, view] = useInView(0.15)
  return (
    <section
      id={id}
      ref={ref}
      aria-label={label ?? title}
      className={cn(
        'home-dark',
        bleed ? 'home-dark-band' : 'home-dark-card',
        view.seen && 'is-on',
        className
      )}
    >
      <div className={cn(bleed && 'home-dark-band-inner', innerClassName)}>
        {(kicker || title) && (
          <header className="home-dark-head">
            {kicker && <p className={`home-kick home-k-${accent}`}>{kicker}</p>}
            {title && <h2 className="home-dark-title">{title}</h2>}
            {subtitle && <p className="home-dark-subtitle">{subtitle}</p>}
          </header>
        )}
        <PanelContext.Provider value={view}>{children}</PanelContext.Provider>
      </div>
    </section>
  )
}

// The order in which an element rises, as the --i css variable.
export const rise = (i, style) => ({ '--i': i, ...style })

// A filled check mark, in the color of its parent's --home-c.
export const Check = ({ className }) => (
  <i className={cn('home-check', className)} aria-hidden="true" />
)
