import { oneSentenceFacts, oneSentenceWords } from '../../data'
import { Check, Panel, rise } from './Blocks'

// The pitch deck's Smarter in one sentence slide: the definition, its three words, and three
// facts. The cover's What is Smarter? button links here.
const OneSentence = () => (
  <Panel
    id="what-is-smarter"
    label="Smarter, in one sentence"
    kicker="Smarter, in one sentence"
  >
    <h2 className="home-dark-sentence home-rise" style={rise(1)}>
      An open-source platform where your people{' '}
      <span className="home-c-green">learn to build</span> AI applications, then{' '}
      <span className="home-c-build">build the real ones</span>, on infrastructure{' '}
      <span className="home-c-blue">you own and govern</span>.
    </h2>
    <ul className="home-words">
      {oneSentenceWords.map((item, idx) => (
        <li
          key={item.word}
          className={`home-a-${item.accent} home-rise`}
          style={rise(idx + 4)}
        >
          <p className="home-word">{item.word}</p>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
    <ul className="home-facts home-rise" style={rise(8)}>
      {oneSentenceFacts.map((fact) => (
        <li key={fact} className="home-a-green">
          <Check />
          {fact}
        </li>
      ))}
    </ul>
  </Panel>
)
export default OneSentence
