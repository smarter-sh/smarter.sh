import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard, Symbol, toneOf } from '@/components/site/ConsoleCard'
import { accentCycle } from '@/helpers/accent'
import { erp, examples, questions, resources, safety } from '../data'

const exampleTones = ['primary', 'success', 'info', 'warning']

// Phase 2: the four patterns that organizations ask for first.
export const WhatYouBuild = () => (
  <ConsoleCard
    id="what-you-build"
    title="What your people will build"
    subtitle="Phase 2 · Production. These four patterns cover much of what organizations ask for first."
  >
    <div className="row g-6">
      {examples.map((item, idx) => (
        <div key={item.title} className="col-sm-6">
          <div className="home-tile">
            <Symbol icon={item.icon} tone={exampleTones[idx % exampleTones.length]} />
            <h3 className="fs-5 fw-bold text-gray-900 mt-5 mb-2">{item.title}</h3>
            <p className="text-gray-700 fs-7 mb-0">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </ConsoleCard>
)

// Guardrails, secrets, budgets and records, which apply to every assistant.
export const SafeByDefault = () => (
  <ConsoleCard
    id="safe-by-default"
    title="Safe by default, not by policy memo"
    subtitle="A policy memo asks people to remember the rules. Smarter enforces them on every message, for every assistant, whoever built it."
  >
    <ul className="home-list">
      {safety.map((item) => (
        <li key={item.title}>
          <Symbol
            icon={item.icon}
            tone="primary"
            size={40}
            iconSize={20}
            className="me-4"
          />
          <div>
            <h3 className="fs-6 fw-bold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-gray-700 fs-7 mb-0">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  </ConsoleCard>
)

// The destination: every AI resource, owned and recorded like an ERP's records.
export const ErpForAi = () => (
  <>
    <div className="col-xl-8">
      <ConsoleCard
        id="erp-for-ai"
        title="An ERP for AI resources"
        subtitle="Anything an organization must own, approve, pay for or answer for in order to use AI is a named, owned, recorded item, like an invoice or an employee record."
      >
        <div className="d-flex flex-wrap gap-2 mb-7">
          {resources.map((name, idx) => (
            <span
              key={name}
              className={`badge badge-light-${toneOf(accentCycle[idx % accentCycle.length])} fs-7 fw-semibold`}
            >
              {name}
            </span>
          ))}
        </div>
        <div className="table-responsive">
          <table className="table table-row-dashed align-middle gs-0 gy-4 mb-0">
            <thead>
              <tr className="fs-7 fw-bold text-gray-500 text-uppercase">
                <th>What your ERP manages</th>
                <th className="text-primary">What Smarter manages for AI</th>
              </tr>
            </thead>
            <tbody>
              {erp.map(([left, right]) => (
                <tr key={left}>
                  <td className="text-gray-600 fs-6">{left}</td>
                  <td className="text-gray-900 fw-semibold fs-6">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ConsoleCard>
    </div>
    <div className="col-xl-4">
      <section
        aria-label="Questions leadership can finally answer"
        className="card border-transparent h-100 home-questions"
      >
        <div className="card-body p-8">
          <span className="home-eyebrow home-eyebrow-sky">For leadership</span>
          <h2 className="fs-2 fw-bold text-white mt-4 mb-6">
            Questions leadership can finally answer
          </h2>
          <ul className="home-checks home-checks-light">
            {questions.map((question) => (
              <li key={question}>
                <IconifyIcon icon="lucide:circle-check" width={18} height={18} />
                {question}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  </>
)
