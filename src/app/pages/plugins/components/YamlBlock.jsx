import { Fragment } from 'react'
import { cn } from '@/helpers/cn'

// a line's key, e.g. "  - name:", and the rest of it
const KEY = /^(\s*(?:-\s+)?)([\w./-]+)(:)(.*)$/
// a {placeholder} of a query, which the model fills in
const PLACEHOLDER = /(\{\w+\})/

// The rest of a line, with its {placeholders} marked.
const Value = ({ text }) =>
  text.split(PLACEHOLDER).map((part, i) =>
    PLACEHOLDER.test(part) ? (
      <mark key={i} className="rounded bg-amber-400/25 px-0.5 text-amber-200">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )

/**
 * A few lines of a manifest in the console's dark code panel, with its file name above it. Keys
 * are colored, and a query's {placeholders}, the only parts the model fills in, are marked.
 * `shell` shows a command instead, in the color of the site's other commands.
 */
const YamlBlock = ({ file, code, shell = false, className }) => (
  <figure
    className={cn(
      'min-w-0 overflow-hidden rounded-xl border-s-2 border-violet-400 bg-code-bg shadow-card',
      className
    )}
  >
    <figcaption className="border-b border-white/10 px-5 py-3 font-mono text-xs text-keen-500">
      {file}
    </figcaption>
    <pre
      className={cn(
        'overflow-x-auto p-5 font-mono text-[13px] leading-6',
        shell ? 'text-orange-300' : 'text-code-text'
      )}
    >
      {shell
        ? code
        : code.split('\n').map((line, i) => {
            const match = line.match(KEY)
            return (
              <div key={i}>
                {match ? (
                  <>
                    {match[1]}
                    <span className="text-sky-300">{match[2]}</span>
                    {match[3]}
                    <Value text={match[4]} />
                  </>
                ) : (
                  <Value text={line || ' '} />
                )}
              </div>
            )
          })}
    </pre>
  </figure>
)
export default YamlBlock
