import Section from '@/components/site/Section'
import SmartLink from '@/components/site/SmartLink'
import Button from '@/components/site/Button'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { accent } from '@/helpers/accent'
import { COMMUNITY } from '@/common/constants'
import { audiences, faqsData, openSource, pilot } from '../data'

// The open-source points, in the theme's divided 2x2 panel.
export const WhyOpenSource = () => {
  return (
    <Section
      id="why-open-source"
      accent="teal"
      glow
      eyebrow="Why Smarter"
      title="Free and open source, for everyone"
      intro="Smarter is a community project, not a product. There is nothing to buy: organizations, instructors and students use the same software, under the AGPL-3.0 license."
    >
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-default-950/40 backdrop-blur-3xl sm:grid-cols-2">
        {openSource.map((item, idx) => (
          <div
            key={item.title}
            className={cn(
              'p-10',
              idx % 2 === 1 && 'sm:border-s sm:border-white/10',
              idx > 0 && 'border-t border-white/10 sm:border-t-0',
              idx > 1 && 'sm:border-t'
            )}
          >
            <span
              className={cn(
                'inline-flex h-16 w-16 items-center justify-center rounded-2xl',
                accent(item.accent).soft
              )}
            >
              <IconifyIcon icon={item.icon} className="h-8 w-8" />
            </span>
            <h3 className="mb-3 mt-6 text-2xl font-medium text-white">{item.title}</h3>
            <p className="text-default-300">{item.text}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-3xl text-center text-default-300">
        Smarter is supported by its community. Organizations that want help installing or
        running it can work with an independent{' '}
        <SmartLink href="/partners" className="text-primary hover:underline">
          partner
        </SmartLink>
        .
      </p>
    </Section>
  )
}

// The theme's tool cards, with their blob-shaped icons.
export const WhoItsFor = () => {
  return (
    <Section
      id="who-its-for"
      accent="amber"
      eyebrow="Where to next"
      title="Smarter for your organization"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {audiences.map((item) => (
          <SmartLink
            key={item.title}
            href={item.href}
            className={cn(
              'group rounded-xl border border-white/10 bg-default-950/40 p-8 text-center transition-all duration-500 hover:-translate-y-2',
              accent(item.accent).hoverBorder
            )}
          >
            <span
              className={cn(
                'inline-flex h-24 w-24 items-center justify-center',
                accent(item.accent).soft
              )}
              style={{ borderRadius: '28% 72% 50% 50%/26% 20% 80% 74%' }}
            >
              <IconifyIcon icon={item.icon} className="h-10 w-10" />
            </span>
            <h3 className="mt-6 text-xl font-medium text-white">{item.title}</h3>
            <p className="mb-6 mt-3 text-sm text-default-300">{item.text}</p>
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm text-white transition-colors',
                accent(item.accent).text
              )}
            >
              {item.linkText}
              <IconifyIcon icon="lucide:move-right" className="h-4 w-4" />
            </span>
          </SmartLink>
        ))}
      </div>
    </Section>
  )
}

// The pilot as a timeline.
export const Pilot = () => {
  return (
    <Section
      id="pilot"
      accent="emerald"
      eyebrow="Getting started"
      title="A practical first step"
      intro="The pilot follows the same arc as the platform: literacy, then production, then governance, in about one quarter."
    >
      <ol className="relative mx-auto max-w-3xl border-s-2 border-violet-400/40">
        {pilot.map((item, idx) => (
          <li
            key={item.title}
            className="mb-10 ms-10 last:mb-0"
            data-aos="fade-left"
            data-aos-delay={idx * 120}
          >
            <span
              className={cn(
                'absolute -start-5 flex h-10 w-10 items-center justify-center rounded-full font-semibold ring-8 ring-default-900',
                accent(item.accent).solid
              )}
            >
              {idx + 1}
            </span>
            <div
              className={cn(
                'rounded-xl border-s-2 bg-default-950/40 p-6',
                accent(item.accent).border
              )}
            >
              <p className={cn('text-sm font-medium', accent(item.accent).text)}>
                {item.when}
              </p>
              <h3 className="mt-1 text-xl font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-default-300">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

// The theme's split FAQ: the heading on the left, the questions on the right.
export const Faqs = () => {
  return (
    <section id="faq" className="py-16 lg:py-20">
      <div className="container">
        <div className="grid gap-10 xl:grid-cols-5">
          <div className="text-center xl:col-span-2 xl:text-start" data-aos="fade-right">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Questions
            </p>
            <h2 className="mb-4 text-3xl font-medium text-white lg:text-4xl">
              Common questions
            </h2>
            <p className="text-default-300">
              Cost, data, vendors, support and maturity, answered plainly.
            </p>
            <div className="mt-8">
              <Button href={COMMUNITY} variant="secondary" icon="lucide:message-circle">
                Ask the community
              </Button>
            </div>
          </div>
          <div className="space-y-4 xl:col-span-3" data-aos="fade-left">
            {faqsData.map((faq, idx) => (
              <details
                key={faq.question}
                open={idx === 0}
                className="group overflow-hidden rounded-lg border border-white/10 bg-default-950/40 backdrop-blur-3xl"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 text-white">
                  <span className="flex items-center gap-3 font-semibold">
                    <IconifyIcon
                      icon="lucide:circle-help"
                      className="h-5 w-5 text-primary"
                    />
                    {faq.question}
                  </span>
                  <IconifyIcon
                    icon="lucide:chevron-down"
                    className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="px-6 pb-5 text-default-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
