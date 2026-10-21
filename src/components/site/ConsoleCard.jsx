import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'

// Building blocks for pages that look like the Smarter web console's dashboard. They use the Keen
// theme's markup, so they must be inside a .keen wrapper (see ConsoleWidgets and ConsoleDashboard).

// The site's topic colors (helpers/accent.js), as the Keen theme's semantic colors.
const TONES = {
  primary: 'warning',
  amber: 'warning',
  emerald: 'success',
  teal: 'success',
  sky: 'primary',
  violet: 'info',
  rose: 'danger',
}
export const toneOf = (accent) => TONES[accent] ?? 'primary'

// A card with the dashboard's header: a bold title, a muted subtitle and an optional toolbar. It
// fills its column's height unless fill is false.
export const ConsoleCard = ({
  id,
  title,
  subtitle,
  toolbar,
  className,
  bodyClassName,
  fill = true,
  children,
}) => (
  <section id={id} aria-label={title} className={cn('card', fill && 'h-100', className)}>
    {(title || subtitle || toolbar) && (
      <div className="card-header border-0 pt-6">
        <h2 className="card-title align-items-start flex-column">
          {title && (
            <span className="card-label fw-bold text-gray-900 fs-3">{title}</span>
          )}
          {subtitle && (
            <span className="text-muted mt-1 fw-semibold fs-6">{subtitle}</span>
          )}
        </h2>
        {toolbar && <div className="card-toolbar">{toolbar}</div>}
      </div>
    )}
    <div className={cn('card-body pt-4', bodyClassName)}>{children}</div>
  </section>
)

// The Keen theme's icon tile: an icon on a tint of its color.
export const Symbol = ({
  icon,
  tone = 'primary',
  size = 45,
  iconSize = 22,
  className,
}) => (
  <span className={cn(`symbol symbol-${size}px`, className)}>
    <span className={`symbol-label bg-light-${tone}`}>
      <IconifyIcon
        icon={icon}
        width={iconSize}
        height={iconSize}
        className={`text-${tone}`}
      />
    </span>
  </span>
)

// A dashboard page: the Keen theme in its dark mode, on the console's grid. Children are rows of
// Bootstrap columns.
export const ConsoleDashboard = ({ className, children }) => (
  <div className="keen">
    <div data-bs-theme="dark" className={cn('console-dashboard', className)}>
      <div className="container-xxl">{children}</div>
    </div>
  </div>
)
