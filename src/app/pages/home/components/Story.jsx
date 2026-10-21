import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard, Symbol, toneOf } from '@/components/site/ConsoleCard'
import { gaps, journey, logos, situation } from '../data'

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

// The situation, as numbered steps, and the two gaps.
export const Problem = () => (
  <>
    <div className="col-xl-6">
      <ConsoleCard
        id="problem"
        title="AI is already inside your organization"
        subtitle="It didn’t arrive through procurement. It arrived through browsers and phones, and it brought value and risk with it."
      >
        <ol className="home-steps">
          {situation.map((item, idx) => (
            <li key={item.text}>
              <span className="home-step-number">{idx + 1}</span>
              <span className="fs-5 text-gray-800">{item.text}</span>
            </li>
          ))}
        </ol>
      </ConsoleCard>
    </div>
    <div className="col-xl-6">
      <ConsoleCard
        title="Two gaps stand between you and the value"
        subtitle="Most organizations try to close the control gap first, with policies and bans."
      >
        <div className="d-flex flex-column gap-7">
          {gaps.map((gap) => (
            <div key={gap.title} className="d-flex align-items-start">
              <Symbol
                icon={gap.icon}
                tone={toneOf(gap.accent)}
                size={50}
                className="me-5"
              />
              <div>
                <h3 className="fs-4 fw-bold text-gray-900 mb-1">{gap.title}</h3>
                <p className="text-gray-700 fs-6 mb-0">{gap.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="home-note mt-8">
          Smarter closes both gaps, in the right order.
        </div>
      </ConsoleCard>
    </div>
  </>
)

// The one-sentence definition, and the journey as three connected phases.
export const WhatIsSmarter = () => (
  <div className="col-12">
    <ConsoleCard
      id="what-is-smarter"
      title="Smarter, in one sentence"
      subtitle="Literacy, then production, then governance"
    >
      <p className="home-sentence">
        A free, open-source platform where your people{' '}
        <span className="home-learn">learn to build AI applications</span>, and then{' '}
        <span className="home-build">build the real ones</span>, on infrastructure{' '}
        <span className="home-govern">you own and govern</span>.
      </p>
      <ol className="home-journey">
        {journey.map((item) => (
          <li key={item.title}>
            <Symbol icon={item.icon} tone={toneOf(item.accent)} size={60} iconSize={28} />
            <span className={`home-journey-step text-${toneOf(item.accent)}`}>
              {item.step}
            </span>
            <h3 className="fs-3 fw-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-700 fs-6 mb-0">{item.text}</p>
          </li>
        ))}
      </ol>
    </ConsoleCard>
  </div>
)
