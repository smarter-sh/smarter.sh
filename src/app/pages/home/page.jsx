import PageShell from '@/components/site/PageShell'
import CtaBand from '@/components/site/CtaBand'
import { LogoMarquee, WordMarquee } from '@/components/site/Marquee'
import Hero from './components/Hero'
import { Problem, WhatIsSmarter } from './components/Story'
import TryIt from './components/TryIt'
import { ErpForAi, Extend, SafeByDefault, WhatYouBuild } from './components/Governance'
import { Faqs, Pilot, WhoItsFor, WhyOpenSource } from './components/Adoption'
import { logos, words } from './data'

const Home = () => {
  return (
    <PageShell>
      <Hero />
      <LogoMarquee
        title="Works with the AI and the platforms you already use"
        logos={logos}
      />
      <Problem />
      <WhatIsSmarter />
      <WordMarquee rows={words} />
      <TryIt />
      <WhatYouBuild />
      <SafeByDefault />
      <Extend />
      <ErpForAi />
      <WhyOpenSource />
      <WhoItsFor />
      <Pilot />
      <Faqs />
      <CtaBand />
    </PageShell>
  )
}
export default Home
