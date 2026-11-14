import { useId, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { COMMUNITY } from '@/common/constants'
import { faqsData } from '../../data'
import { Panel, rise } from './Blocks'

// The questions take the deck's accents in turn: amber, green, blue and purple.
const ACCENTS = ['amber', 'green', 'blue', 'purple']

// Cost, data, vendors, support and maturity, answered plainly, as a dark card in the pitch deck's
// look: the heading and the community's link on the left, and the questions on the right, each a
// numbered tile in one of the deck's accents. One question is open at a time.
const Faqs = () => {
  const [open, setOpen] = useState(0)
  const base = useId()
  return (
    <Panel id="faq" label="Common questions" innerClassName="home-faq-layout">
      <header className="home-dark-head home-faq-head">
        <p className="home-kick home-k-amber">Answered plainly</p>
        <h2 className="home-dark-title">Common questions</h2>
        <p className="home-dark-subtitle">
          Cost, data, vendors, support and maturity, answered plainly.
        </p>
        <a
          href={COMMUNITY}
          target="_blank"
          rel="noopener noreferrer"
          className="home-dark-btn home-dark-btn-light home-faq-ask"
        >
          <IconifyIcon icon="lucide:messages-square" width={16} height={16} />
          Ask the community
        </a>
      </header>
      <ol className="home-faq-list">
        {faqsData.map((faq, idx) => {
          const isOpen = open === idx
          const answerId = `${base}-answer-${idx}`
          return (
            <li
              key={faq.question}
              className={`home-faq-item home-a-${ACCENTS[idx % ACCENTS.length]} home-rise${
                isOpen ? ' is-open' : ''
              }`}
              style={rise(idx + 1)}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpen(isOpen ? -1 : idx)}
                className="home-faq-toggle"
              >
                <b aria-hidden="true">{idx + 1}</b>
                <span>{faq.question}</span>
                <IconifyIcon
                  icon="lucide:chevron-down"
                  width={18}
                  height={18}
                  className="home-faq-toggle-chevron"
                />
              </button>
              {isOpen && (
                <p id={answerId} className="home-faq-answer">
                  {faq.answer}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </Panel>
  )
}
export default Faqs
