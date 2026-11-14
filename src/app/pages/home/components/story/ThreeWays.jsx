import { useRef } from 'react'
import { flowLabels, responses } from '../../data'
import { Panel, rise, usePanel } from './Blocks'
import { useAutoStep, useCanvasScene } from './motion'
import { flowScene } from './scenes'

// The pitch deck's fourth slide: three ways to respond to people building with AI on their own,
// each shown on the canvas above them. They take turns while the card is on screen, until the
// visitor picks one.
const Choices = () => {
  const { visible } = usePanel()
  const [mode, pick] = useAutoStep(responses.length, 6000, visible)
  const modeRef = useRef(mode)
  modeRef.current = mode
  const ref = useCanvasScene(
    (w, h) => flowScene(w, h, { getMode: () => modeRef.current, labels: flowLabels }),
    visible
  )
  return (
    <>
      <div className="home-screen home-flow home-rise" style={rise(1)}>
        <canvas
          ref={ref}
          role="img"
          aria-label={`Each dot is a person building with AI. Now showing: ${responses[mode].title}.`}
        />
        <p className="home-flow-note">Each dot is a person building with AI</p>
      </div>
      <div className="home-options" role="group" aria-label="Three ways to respond">
        {responses.map((item, idx) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={mode === idx}
            onClick={() => pick(idx)}
            className={`home-option home-a-${item.accent}${mode === idx ? ' is-active' : ''}`}
          >
            <span className="home-option-title">
              <b>{idx + 1}</b>
              {item.title}
            </span>
            <span className="home-option-text">{item.text}</span>
          </button>
        ))}
      </div>
    </>
  )
}

const ThreeWays = () => (
  <Panel id="three-ways" kicker="The decision" title="Three ways to respond">
    <Choices />
  </Panel>
)
export default ThreeWays
