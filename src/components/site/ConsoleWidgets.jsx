import { cn } from '@/helpers/cn'

// A row of the Smarter web console's dashboard widgets, from @smarter.sh/ui-widgets, which look
// here as they do in the console. The Keen theme's stylesheet, public/keen/style.scoped.css (see
// keen/scope-keen.cjs), applies only inside the .keen wrapper, so the site's own Tailwind design
// is untouched around it. The children are Bootstrap grid columns: widgets that set their own
// width (className="col-xl-4"), or <div className="col-..."> around the ones that fill their
// parent. rowClassName adds classes to the row, e.g. justify-content-center.
const ConsoleWidgets = ({ className, rowClassName, children }) => (
  <div className={cn('keen', className)}>
    <div className={cn('row g-5 g-xl-10', rowClassName)}>{children}</div>
  </div>
)

export default ConsoleWidgets
