import { useEffect, useState } from 'react'
import { pipeline, pipelineLog, safety } from '../../data'
import { Check, Panel, rise, usePanel } from './Blocks'
import { canAnimate, useReducedMotion } from './motion'

// The steps of the pipeline's loop: a question passes every check, then another is blocked at the
// first guardrail. Each step is [run, how far it got, milliseconds until the next step].
const STEPS = [
  ...pipeline.map((_, k) => ['ok', k, k === pipeline.length - 1 ? 2600 : 780]),
  ['bad', 0, 560],
  ['bad', 1, 560],
  ['bad', 2, 4200],
]

// Guardrails, secrets, budgets and records, which apply to every assistant, with the pitch deck's
// picture of them: a message travels through Smarter's checks and the record fills in. The loop
// runs while the card is on screen.
const SafeByDefault = () => {
  const { visible } = usePanel()
  const reduced = useReducedMotion()
  const instant = !canAnimate || reduced
  const [step, setStep] = useState(instant ? STEPS.length - 1 : 0)
  useEffect(() => {
    if (instant || !visible) return
    const id = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step][2])
    return () => clearTimeout(id)
  }, [step, visible, instant])
  const [run, k] = STEPS[step]
  const blocked = run === 'bad'
  const at = blocked ? 0 : k
  const log = blocked
    ? [...pipelineLog.ok, ...pipelineLog.blocked.slice(0, k + 1)]
    : pipelineLog.ok.slice(0, k + 1)
  return (
    <>
      <ol className="home-pipe-nodes" aria-label="One message’s way through Smarter">
        {pipeline.map((node, idx) => {
          const state =
            blocked && idx === 1 && k >= 1 ? ' is-blocked' : idx <= at ? ' is-active' : ''
          return (
            <li key={`${node.title}-${idx}`} className={`home-a-${node.accent}${state}`}>
              <b>{node.title}</b>
              <span>{node.text}</span>
            </li>
          )
        })}
      </ol>
      <div className="home-screen home-log">
        <p className="home-dark-label">Record of every conversation</p>
        <ol>
          {log.map(([time, text, tone]) => (
            <li key={`${time}-${text}`} className={tone ? `is-${tone}` : undefined}>
              <i>{time}</i>
              {text}
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

const SafeByDefaultCard = () => (
  <Panel
    id="safe-by-default"
    kicker="In control"
    accent="blue"
    title="Safe by default, not by policy memo"
    subtitle="A policy memo asks people to remember the rules. Smarter enforces them on every message, for every assistant, whoever built it."
  >
    <div className="home-rise" style={rise(1)}>
      <SafeByDefault />
    </div>
    <ul className="home-safety">
      {safety.map((item, idx) => (
        <li key={item.title} className="home-rise" style={rise(idx + 2)}>
          <Check />
          <div>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  </Panel>
)
export default SafeByDefaultCard
