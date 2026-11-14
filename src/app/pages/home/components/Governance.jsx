import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ConsoleCard, Symbol, toneOf } from '@/components/site/ConsoleCard'
import { examples } from '../data'

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

// Guardrails, secrets, budgets and records, which apply to every assistant: a dark card with the
// pitch deck's pipeline (story/SafeByDefault.jsx).
export { default as SafeByDefault } from './story/SafeByDefault'
