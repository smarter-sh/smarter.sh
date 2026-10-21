import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import SmartLink from './SmartLink'

const variants = {
  primary:
    'bg-gradient-brand text-white shadow-lg shadow-primary/20 hover:brightness-110',
  secondary:
    'border border-keen-300 bg-white text-keen-800 hover:border-primary hover:text-primary',
}

const Button = ({ href, icon, variant = 'primary', className, children }) => {
  return (
    <SmartLink
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-all duration-300',
        variants[variant],
        className
      )}
    >
      {icon && <IconifyIcon icon={icon} className="h-5 w-5" />}
      {children}
    </SmartLink>
  )
}
export default Button
