import SmartLink from '@/components/site/SmartLink'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Glow } from '@/components/site/Section'
import { COMMUNITY } from '@/common/constants'
import euclid from '@/assets/images/screens/euclid-chalkboard.webp'

const highlights = [
  { icon: 'lucide:github', text: 'Free and open source', color: 'text-primary' },
  { icon: 'lucide:server', text: 'Runs on your infrastructure', color: 'text-sky-400' },
  {
    icon: 'lucide:graduation-cap',
    text: 'In teaching use at UBC',
    color: 'text-emerald-400',
  },
]

// The theme's framed, split hero: the message on the left, the product on the right.
const Hero = () => {
  return (
    <section id="home" className="relative isolate overflow-hidden pb-10 pt-28">
      <Glow accent="primary" className="top-24 h-[28rem]" />
      <div className="px-4 lg:px-6">
        <div className="relative rounded-3xl border border-white/5 bg-gradient-to-br from-default-950/70 via-default-950/40 to-violet-950/40 backdrop-blur-sm">
          <div className="-z-1 absolute start-10 top-10 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none bg-primary/10" />
          <div className="-z-1 absolute bottom-10 end-1/2 h-14 w-14 animate-ping rounded-full bg-amber-400/30" />
          <div className="container">
            <div className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
              <div data-aos="fade-right" data-aos-easing="ease" data-aos-duration={900}>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-primary">
                  The Smarter Project
                </span>
                <h1 className="my-6 text-4xl/tight font-medium text-white md:text-5xl/tight xl:text-6xl/tight">
                  <span className="text-emerald-400">Learn</span> AI.{' '}
                  <span className="text-gradient">Build</span> with AI.{' '}
                  <span className="text-sky-400">Govern</span> AI.
                </h1>
                <p className="text-lg text-default-200 md:text-xl">
                  One open-source platform that takes your organization from its first AI
                  lesson to governed, production AI, on infrastructure you own.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {highlights.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-center gap-2 text-sm text-default-300"
                    >
                      <IconifyIcon icon={item.icon} className={`h-4 w-4 ${item.color}`} />
                      {item.text}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#what-is-smarter"
                    className="bg-gradient-brand inline-flex items-center gap-2 rounded-full py-1 pe-6 ps-1 text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                      <IconifyIcon icon="lucide:arrow-down" className="h-5 w-5" />
                    </span>
                    What is Smarter?
                  </a>
                  <SmartLink
                    href={COMMUNITY}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 py-1 pe-6 ps-1 text-white transition-all hover:border-primary"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <IconifyIcon icon="lucide:users" className="h-5 w-5" />
                    </span>
                    Join the community
                  </SmartLink>
                </div>
              </div>
              <div
                className="relative"
                data-aos="zoom-in"
                data-aos-easing="ease"
                data-aos-duration={900}
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 lg:rotate-1">
                  <img
                    src={euclid}
                    alt="Euclid, a math tutor built on Smarter, explaining the roots and vertex of a parabola on a chalkboard"
                    className="w-full"
                  />
                </div>
                <div className="absolute -start-6 top-8 hidden rounded-full border border-white/10 bg-default-950/80 px-5 py-3 text-sm font-medium text-white shadow-xl backdrop-blur-lg md:block">
                  <IconifyIcon
                    icon="lucide:sigma"
                    className="me-2 inline h-4 w-4 text-emerald-400"
                  />
                  Typeset math, diagrams and plots
                </div>
                <div className="absolute -bottom-6 end-6 hidden rounded-2xl border border-white/10 bg-default-950/80 px-5 py-3 shadow-xl backdrop-blur-lg md:block">
                  <p className="text-xs uppercase tracking-wider text-default-400">
                    This answer
                  </p>
                  <p className="text-sm font-medium text-white">
                    2,724 tokens · costed and recorded
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero
