import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { accent as accentOf } from '@/helpers/accent'
import SmartLink from './SmartLink'

// A card with an icon, a title, a short text and an optional link, in the color of its topic: the
// web console's light card, white with a hairline border and a soft shadow.
const FeatureCard = ({
  icon,
  title,
  text,
  href,
  linkText = 'Learn more',
  badge,
  accent,
  className,
}) => {
  const colors = accentOf(accent)
  const body = (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        {icon && (
          <div
            className={cn(
              'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
              colors.soft
            )}
          >
            <IconifyIcon icon={icon} className="h-6 w-6" />
          </div>
        )}
        {badge && (
          <span className="rounded-full border border-keen-300 px-2.5 py-0.5 text-xs font-medium text-keen-600">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-keen-900">{title}</h3>
      <p className="text-sm leading-relaxed text-keen-600">{text}</p>
      {href && (
        <span
          className={cn(
            'mt-4 inline-flex items-center gap-1 text-sm opacity-80 group-hover:opacity-100',
            colors.text
          )}
        >
          {linkText}
          <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
        </span>
      )}
    </>
  )
  const classes = cn(
    'group block rounded-xl border border-s-2 border-keen-200 bg-white p-6 shadow-card transition-all duration-500',
    colors.borderStart,
    href && 'hover:-translate-y-1 hover:shadow-header',
    className
  )
  if (!href) return <div className={classes}>{body}</div>
  return (
    <SmartLink href={href} className={classes}>
      {body}
    </SmartLink>
  )
}
export default FeatureCard
