import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { accent as accentOf } from '@/helpers/accent'
import SmartLink from './SmartLink'

// A card with an icon, a title, a short text and an optional link, in the color of its topic.
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
          <span className="rounded-full border border-default-600 px-2.5 py-0.5 text-xs font-medium text-default-300">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-default-300">{text}</p>
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
    'group block rounded-xl border-s-2 bg-default-950/40 p-6 backdrop-blur-3xl transition-all duration-500',
    colors.border,
    href && 'hover:-translate-y-1 hover:bg-default-950/70',
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
