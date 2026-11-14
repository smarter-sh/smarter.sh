import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard } from '@/components/site/ConsoleCard'
import { logos } from '../data'
import AlreadyInside from './story/AlreadyInside'
import ThreeWays from './story/ThreeWays'

// The AI vendors and platforms that Smarter works with, as a strip of logos.
export const WorksWith = () => (
  <div className="col-12">
    <ConsoleCard
      title="Works with the AI and the platforms you already use"
      subtitle="Commercial vendors, models you host yourself, and the infrastructure you run"
    >
      <ul className="home-logos">
        {logos.map((logo) => (
          <li key={logo.label}>
            <IconifyIcon icon={logo.icon} width={22} height={22} />
            {logo.label}
          </li>
        ))}
      </ul>
    </ConsoleCard>
  </div>
)

// The situation, with the pitch deck's picture of what people have already built, and its three
// ways to respond.
export const Problem = () => (
  <>
    <div className="col-xl-7">
      <AlreadyInside />
    </div>
    <div className="col-xl-5">
      <ThreeWays />
    </div>
  </>
)
