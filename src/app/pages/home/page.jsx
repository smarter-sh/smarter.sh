import {
  DidYouKnow as DidYouKnowWidget,
  Extensions as ExtensionsWidget,
  Instructors as InstructorsWidget,
} from '@smarter.sh/ui-widgets'
import PageShell from '@/components/site/PageShell'
import { ConsoleDashboard } from '@/components/site/ConsoleCard'
import Cover from './components/story/Cover'
import { Problem, WorksWith } from './components/Story'
import OneSentence from './components/story/OneSentence'
import TryIt from './components/TryIt'
import { SafeByDefault, WhatYouBuild } from './components/Governance'
import ThirtyDays from './components/story/ThirtyDays'
import { WhoItsFor, WhyOpenSource } from './components/Adoption'
import Faqs from './components/story/Faqs'
import './home.css'
import './story.css'

// The landing page. It opens with the cover of the Smarter pitch deck, a dark band as wide as the
// window, then lays out as the Smarter web console's dashboard, in its default light mode: rows of
// cards on the console's grid, with the console's own widgets (@smarter.sh/ui-widgets) where the
// story calls for them. Below the cover, as below the console's title, is the fact of the day: the
// same Did you know? fact that the console shows today. Then the story, in its order: the
// problem, the solution, then the project itself. Where the deck pictures a point the page makes,
// the card is a dark one in the deck's look (components/story/, story.css).
const Home = () => {
  return (
    <PageShell>
      <Cover />
      <ConsoleDashboard className="home home-after-cover">
        <div className="row g-5 g-xl-10">
          <div className="col-12">
            <DidYouKnowWidget />
          </div>
          {/* the problem */}
          <Problem />
          {/* the solution */}
          <div className="col-12">
            <OneSentence />
          </div>
          <InstructorsWidget className="col-xl-6" />
          <div className="col-xl-6">
            <WhatYouBuild />
          </div>
          <TryIt />
          <div className="col-xl-6">
            <SafeByDefault />
          </div>
          <div id="extend" className="col-xl-6">
            <ExtensionsWidget />
          </div>
          {/* the project: what it works with, how it's licensed and run, who it's for */}
          <WorksWith />
          <WhyOpenSource />
          <WhoItsFor />
          <div className="col-12">
            <Faqs />
          </div>
          <div className="col-12">
            <ThirtyDays />
          </div>
        </div>
      </ConsoleDashboard>
    </PageShell>
  )
}
export default Home
