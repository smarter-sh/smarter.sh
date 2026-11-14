import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { COMMUNITY, SLACK } from '@/common/constants'
import { highlights } from '../../data'
import { Panel, rise, usePanel } from './Blocks'
import { useCanvasScene } from './motion'
import { loopScene } from './scenes'

const LOOP_WORDS = ['Learn', 'Build', 'Govern']

// The Smarter loop, drawing itself while its panel is on screen: people flow around it from
// learning to building to governing.
const Loop = () => {
  const { visible } = usePanel()
  const ref = useCanvasScene((w, h) => loopScene(w, h, { words: LOOP_WORDS }), visible)
  return (
    <canvas
      ref={ref}
      className="home-loop"
      role="img"
      aria-label="The Smarter loop: learn, build, govern"
    />
  )
}

// The landing page's first screen, from the pitch deck's cover: its headline word by word, its
// three words, and the loop, in a band as wide as the window.
const Cover = () => (
  <Panel id="home" label="The Smarter Project" bleed innerClassName="home-cover">
    <div>
      <p className="home-kick home-k-amber home-rise" style={rise(0)}>
        The Smarter Project
      </p>
      <h1 className="home-cover-title">
        <span style={rise(0)}>Build AI</span> <span style={rise(1)}>without</span>{' '}
        <span style={rise(2)}>engineers</span>
      </h1>
      <p className="home-cover-tag">
        <span className="home-c-green" style={rise(0)}>
          Simple.
        </span>{' '}
        <span className="home-c-build" style={rise(1)}>
          Fast.
        </span>{' '}
        <span className="home-c-blue" style={rise(2)}>
          In control.
        </span>
      </p>
      <p className="home-cover-lead home-rise" style={rise(10)}>
        One open-source platform where your people learn to build AI applications, then
        build the real ones, on infrastructure you own and govern.
      </p>
      <ul className="home-cover-highlights home-rise" style={rise(12)}>
        {highlights.map((item) => (
          <li key={item.text}>
            <IconifyIcon icon={item.icon} width={16} height={16} />
            {item.text}
          </li>
        ))}
      </ul>
      <div className="home-cover-buttons home-rise" style={rise(14)}>
        <a href="#what-is-smarter" className="home-dark-btn home-dark-btn-brand">
          What is Smarter?
        </a>
        <a
          href={COMMUNITY}
          target="_blank"
          rel="noopener noreferrer"
          className="home-dark-btn home-dark-btn-light"
        >
          Join the community
        </a>
        <a
          href={SLACK}
          target="_blank"
          rel="noopener noreferrer"
          className="home-dark-btn home-dark-btn-slack"
        >
          <IconifyIcon icon="simple-icons:slack" width={16} height={16} />
          Join us on Slack
        </a>
      </div>
    </div>
    <Loop />
  </Panel>
)
export default Cover
