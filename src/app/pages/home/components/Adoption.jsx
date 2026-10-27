import { useState } from 'react'
import { SelfHost as SelfHostWidget } from '@smarter.sh/ui-widgets'
import SmartLink from '@/components/site/SmartLink'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard, Symbol, toneOf } from '@/components/site/ConsoleCard'
import { COMMUNITY, QUICK_START } from '@/common/constants'
import { audiences, faqsData, openSource, pilot } from '../data'

// Why Smarter is free and open source, beside the console's Self Host widget.
export const WhyOpenSource = () => (
  <>
    <div className="col-xl-6">
      <ConsoleCard
        id="why-open-source"
        title="Free and open source, for everyone"
        subtitle="Smarter is a community project, not a product. There is nothing to buy: organizations, instructors and students use the same software, under the AGPL-3.0 license."
      >
        <div className="row g-6">
          {openSource.map((item) => (
            <div key={item.title} className="col-sm-6">
              <div className="d-flex align-items-start">
                <Symbol icon={item.icon} tone={toneOf(item.accent)} className="me-4" />
                <div>
                  <h3 className="fs-5 fw-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-700 fs-7 mb-0">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 fs-7 mt-8 mb-0">
          Smarter is supported by its community. Organizations that want help installing
          or running it can work with an independent{' '}
          <SmartLink href="/partners" className="fw-semibold">
            partner
          </SmartLink>
          .
        </p>
      </ConsoleCard>
    </div>
    <div className="col-xl-6">
      <SelfHostWidget />
    </div>
  </>
)

// Where to go next, for each kind of organization.
export const WhoItsFor = () =>
  audiences.map((item) => (
    <div key={item.title} className="col-md-6 col-xl-3">
      <SmartLink href={item.href} className="card h-100 home-audience">
        <div className="card-body d-flex flex-column p-7">
          <Symbol icon={item.icon} tone={toneOf(item.accent)} size={60} iconSize={28} />
          <h3 className="fs-4 fw-bold text-gray-900 mt-6 mb-2">{item.title}</h3>
          <p className="text-gray-700 fs-7 mb-6">{item.text}</p>
          <span
            className={`mt-auto d-inline-flex align-items-center gap-2 fw-semibold fs-6 text-${toneOf(
              item.accent
            )}`}
          >
            {item.linkText}
            <IconifyIcon icon="lucide:move-right" width={16} height={16} />
          </span>
        </div>
      </SmartLink>
    </div>
  ))

// The pilot, as a timeline of one quarter.
export const Pilot = () => (
  <ConsoleCard
    id="pilot"
    fill={false}
    title="A practical first step"
    subtitle="The pilot follows the same arc as the platform: literacy, then production, then governance, in about one quarter."
  >
    <ol className="home-timeline">
      {pilot.map((item, idx) => (
        <li key={item.title}>
          <span className={`home-timeline-badge bg-${toneOf(item.accent)}`}>
            {idx + 1}
          </span>
          <div>
            <span className={`fs-7 fw-semibold text-${toneOf(item.accent)}`}>
              {item.when}
            </span>
            <h3 className="fs-5 fw-bold text-gray-900 mt-1 mb-1">{item.title}</h3>
            <p className="text-gray-700 fs-7 mb-0">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  </ConsoleCard>
)

// Cost, data, vendors, support and maturity, answered plainly. One question is open at a time.
export const Faqs = () => {
  const [open, setOpen] = useState(0)
  return (
    <ConsoleCard
      id="faq"
      title="Common questions"
      subtitle="Cost, data, vendors, support and maturity, answered plainly."
      toolbar={
        <a
          href={COMMUNITY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-light"
        >
          Ask the community
        </a>
      }
    >
      <div className="home-faqs">
        {faqsData.map((faq, idx) => (
          <div key={faq.question} className="home-faq">
            <button
              type="button"
              aria-expanded={open === idx}
              onClick={() => setOpen(open === idx ? -1 : idx)}
              className="home-faq-question"
            >
              <span>{faq.question}</span>
              <IconifyIcon
                icon="lucide:chevron-down"
                width={18}
                height={18}
                className={
                  open === idx
                    ? 'home-faq-chevron home-faq-chevron-open'
                    : 'home-faq-chevron'
                }
              />
            </button>
            {open === idx && <p className="text-gray-700 fs-6 mb-0 pb-5">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </ConsoleCard>
  )
}

// The closing call to action.
export const Cta = () => (
  <section
    aria-label="Get started"
    className="card border-transparent flex-grow-1 home-cta"
  >
    <div className="card-body d-flex flex-column justify-content-center p-10 text-center">
      <h2 className="fs-2x fw-bold home-ink mb-4">
        Start with a pilot, decide with your own data
      </h2>
      <p className="fs-5 home-lede mx-auto mb-8" style={{ maxWidth: '44rem' }}>
        Install Smarter yourself and run it for one quarter with a small cohort of your
        own staff. Leadership reviews real costs, usage and the audit trail before
        deciding how far to scale.
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <a
          href={QUICK_START}
          target="_blank"
          rel="noopener noreferrer"
          className="btn fw-semibold home-btn-brand"
        >
          Get started
        </a>
        <a
          href={COMMUNITY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn fw-semibold home-btn-white"
        >
          Join the community
        </a>
      </div>
    </div>
  </section>
)
