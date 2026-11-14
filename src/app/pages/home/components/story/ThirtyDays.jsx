import { thirtyDayOutcomes, thirtyDays } from '../../data'
import { Check, Panel, rise } from './Blocks'

// The bar's ticks, one a day, colored by their phase, at their place on the bar: each phase has a
// quarter of its width, whatever its number of days, as on the deck.
const TOTAL_DAYS = thirtyDays.reduce((sum, phase) => sum + phase.days, 0)
const ticks = thirtyDays.flatMap((phase, k) =>
  Array.from({ length: phase.days }, (_, q) => {
    const width = 100 / thirtyDays.length
    return { accent: phase.accent, left: k * width + (width * (q + 0.5)) / phase.days }
  })
)

// The pitch deck's How to start slide: the bar of days fills as the card scrolls into view, above
// the four phases and what an organization has at the end.
const ThirtyDays = () => (
  <Panel
    id="thirty-days"
    kicker="How to start"
    accent="green"
    title="Thirty days, with real cases"
  >
    <div className="home-days" aria-hidden="true">
      <div className="home-days-ends home-rise" style={rise(0)}>
        <span>Day 1</span>
        <span>Day {TOTAL_DAYS}</span>
      </div>
      <div className="home-days-bar">
        <i className="home-days-fill" />
        {ticks.map((tick, idx) => (
          <u
            key={tick.left}
            className={`home-a-${tick.accent}`}
            style={{ left: `${tick.left}%`, '--i': idx }}
          />
        ))}
      </div>
    </div>
    <ol className="home-phases">
      {thirtyDays.map((phase, idx) => (
        <li
          key={phase.title}
          className={`home-a-${phase.accent} home-rise`}
          style={rise(2 + idx * 3)}
        >
          <p className="home-phase-when">{phase.when}</p>
          <h3>{phase.title}</h3>
          <p>{phase.text}</p>
        </li>
      ))}
    </ol>
    <div className="home-outcomes home-rise" style={rise(15)}>
      <b>At the end you have</b>
      <ul>
        {thirtyDayOutcomes.map((item) => (
          <li key={item} className="home-a-green">
            <Check />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </Panel>
)
export default ThirtyDays
