import {
  Extensions as ExtensionsWidget,
  Instructors as InstructorsWidget,
} from '@smarter.sh/ui-widgets'
import PageShell from '@/components/site/PageShell'
import { ConsoleDashboard } from '@/components/site/ConsoleCard'
import Hero from './components/Hero'
import { Problem, WhatIsSmarter, WorksWith } from './components/Story'
import TryIt from './components/TryIt'
import { ErpForAi, SafeByDefault, WhatYouBuild } from './components/Governance'
import { Cta, Faqs, Pilot, WhoItsFor, WhyOpenSource } from './components/Adoption'
import './home.css'

// The landing page, laid out as the Smarter web console's dashboard, in its dark mode: rows of
// cards on the console's grid, with the console's own widgets (@smarter.sh/ui-widgets) where the
// story calls for them.
const Home = () => {
  return (
    <PageShell console>
      <ConsoleDashboard className="home">
        <div className="row g-5 g-xl-10">
          <Hero />
          <WorksWith />
          <Problem />
          <WhatIsSmarter />
          <InstructorsWidget className="col-xl-6" />
          <div className="col-xl-6">
            <WhatYouBuild />
          </div>
          <TryIt />
          <div className="col-xl-6">
            <SafeByDefault />
          </div>
          <div id="extend" className="col-xl-6">
            {/* @smarter.sh/ui-widgets 0.36.0-alpha.4's Extensions card doesn't pin the light theme
                itself, so it would turn dark here. Later versions do, which makes this unnecessary. */}
            <div data-bs-theme="light" className="h-100">
              <ExtensionsWidget />
            </div>
          </div>
          <ErpForAi />
          <WhyOpenSource />
          <WhoItsFor />
          <div className="col-xl-6 d-flex flex-column gap-5 gap-xl-10">
            <Pilot />
            <Cta />
          </div>
          <div className="col-xl-6">
            <Faqs />
          </div>
        </div>
      </ConsoleDashboard>
    </PageShell>
  )
}
export default Home
