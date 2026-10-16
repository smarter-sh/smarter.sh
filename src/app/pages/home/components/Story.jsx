import Section from '@/components/site/Section'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { accent, accentCycle } from '@/helpers/accent'
import { cn } from '@/helpers/cn'
import { gaps, journey, situation } from '../data'

// The situation as numbered cards, and the two gaps as one divided panel.
export const Problem = () => {
  return (
    <Section
      id="problem"
      eyebrow="The situation"
      title="AI is already inside your organization"
      intro="It didn’t arrive through procurement. It arrived through browsers and phones, and it brought value and risk with it."
    >
      <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {situation.map((item, idx) => (
          <div
            key={item.text}
            className={cn(
              'relative overflow-hidden rounded-xl border-t-2 bg-default-950/40 p-6',
              accent(accentCycle[idx]).border
            )}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <span className="absolute -end-2 -top-6 text-8xl font-semibold text-white/5">
              0{idx + 1}
            </span>
            <span
              className={cn(
                'mb-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold',
                accent(accentCycle[idx]).solid
              )}
            >
              {idx + 1}
            </span>
            <p className="text-lg text-default-100">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-default-950/40 backdrop-blur-3xl">
        <div className="border-b border-white/10 px-8 py-6 text-center">
          <h3 className="text-2xl font-medium text-white">
            Two gaps stand between you and the value
          </h3>
        </div>
        <div className="grid md:grid-cols-2">
          {gaps.map((gap, idx) => (
            <div
              key={gap.title}
              className={
                idx ? 'border-t border-white/10 p-10 md:border-s md:border-t-0' : 'p-10'
              }
            >
              <span
                className={cn(
                  'inline-flex h-16 w-16 items-center justify-center rounded-2xl',
                  accent(gap.accent).soft
                )}
              >
                <IconifyIcon icon={gap.icon} className="h-8 w-8" />
              </span>
              <h4 className="mb-3 mt-6 text-2xl font-medium text-white">{gap.title}</h4>
              <p className="text-default-300">{gap.text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 bg-gradient-to-r from-emerald-500/15 via-primary/15 to-sky-500/15 px-8 py-5 text-center text-default-100">
          Most organizations try to close the control gap first, with policies and bans.{' '}
          <span className="font-semibold text-white">
            Smarter closes both gaps, in the right order.
          </span>
        </div>
      </div>
    </Section>
  )
}

// The one-sentence definition, and the journey as connected steps.
export const WhatIsSmarter = () => {
  return (
    <Section id="what-is-smarter" eyebrow="Smarter, in one sentence" accent="violet" glow>
      <p className="mx-auto mb-16 max-w-4xl text-center text-2xl/relaxed font-medium text-white md:text-4xl/snug">
        A free, open-source platform where your people{' '}
        <span className="text-emerald-400">learn to build AI applications</span>, and then{' '}
        <span className="text-gradient">build the real ones</span>, on infrastructure{' '}
        <span className="text-sky-400">you own and govern</span>.
      </p>
      <div className="relative mx-auto max-w-6xl">
        <div className="absolute inset-x-[16%] top-10 hidden h-px bg-gradient-to-r from-emerald-400/0 via-violet-400 to-sky-400/0 md:block" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {journey.map((item, idx) => (
            <div
              key={item.title}
              className="relative text-center"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <span
                className={cn(
                  'relative z-10 mx-auto inline-flex h-20 w-20 items-center justify-center bg-default-900 ring-2',
                  accent(item.accent).ring
                )}
                style={{ borderRadius: '28% 72% 50% 50%/26% 20% 80% 74%' }}
              >
                <IconifyIcon
                  icon={item.icon}
                  className={cn('h-9 w-9', accent(item.accent).text)}
                />
              </span>
              <p
                className={cn(
                  'mt-6 text-xs font-semibold uppercase tracking-widest',
                  accent(item.accent).text
                )}
              >
                {item.step}
              </p>
              <h3 className="mt-2 text-2xl font-medium text-white">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-default-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
