import { useRef, useState } from 'react'
import { alreadyBuilt, situation } from '../../data'
import { Panel, rise, usePanel } from './Blocks'
import { canAnimate, useCanvasScene, useReducedMotion } from './motion'
import { gridScene } from './scenes'

// Dots light up across the organization, outside the corner that IT knows about: what people
// have built with AI on their own, as on the pitch deck's second slide. It plays once; when the
// visitor comes back to it, it shows its end. onDone tells the card that the last dot is lit.
const BuildersGrid = ({ onDone }) => {
  const { visible } = usePanel()
  const reduced = useReducedMotion()
  const played = useRef(false)
  const ref = useCanvasScene(
    (w, h) =>
      gridScene(w, h, {
        labels: alreadyBuilt,
        known: 'What IT knows about',
        rest: 'Everything else',
        finished: played.current || reduced,
        onDone: () => {
          played.current = true
          onDone()
        },
      }),
    visible
  )
  return (
    <canvas
      ref={ref}
      className="home-grid-canvas"
      role="img"
      aria-label={`AI tools that people built on their own, outside what IT knows about: ${alreadyBuilt
        .map((l) => l.text)
        .join(', ')}.`}
    />
  )
}

// The problem, with the pitch deck's picture of it: the situation as numbered steps, then the
// grid of everything people have already built. The point appears when the grid has lit up, as
// the deck reveals it.
const AlreadyInside = () => {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(!canAnimate || reduced)
  return (
    <Panel
      id="problem"
      kicker="What is already happening"
      title="AI is already inside your organization"
      subtitle="It didn’t arrive through procurement. It arrived through browsers and phones, and it brought value and risk with it."
    >
      <ol className="home-dark-steps">
        {situation.map((item, idx) => (
          <li key={item.text} className="home-rise" style={rise(idx + 1)}>
            <span>{idx + 1}</span>
            {item.text}
          </li>
        ))}
      </ol>
      <BuildersGrid onDone={() => setDone(true)} />
      <div className={`home-dark-reveal${done || reduced ? ' is-in' : ''}`}>
        <p className="home-dark-reveal-strong">The will to build is already there.</p>
        <p>
          What is missing is a place to do it well, and under your rules. Today it is
          called shadow engineering.
        </p>
      </div>
    </Panel>
  )
}
export default AlreadyInside
