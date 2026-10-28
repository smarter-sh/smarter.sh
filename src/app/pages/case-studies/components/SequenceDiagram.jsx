import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'

// an actor's colors: its own `color`, or a neutral gray.
const colorOf = (actor) => actor.color ?? 'bg-keen-200 text-keen-800'

const Actor = ({ actor }) => (
  <div className="flex flex-col items-center text-center">
    <span
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full',
        colorOf(actor)
      )}
    >
      <IconifyIcon icon={actor.icon} className="h-5 w-5" />
    </span>
    <p className="mt-2 text-sm font-semibold text-keen-900">{actor.label}</p>
    {actor.sub && <p className="text-xs text-keen-600">{actor.sub}</p>}
  </div>
)

const Label = ({ step }) => (
  <span
    className={cn(
      'text-[13px] leading-snug text-keen-800',
      step.code && 'font-mono text-[12px] text-keen-900'
    )}
  >
    {step.text}
  </span>
)

/*
 * A UML sequence diagram of a tool call: the participants across the top, each with its lifeline, and the
 * messages between them, in order, as arrows. On a phone, the same messages as a numbered list.
 *
 * `actors` are {id, label, sub?, icon, color?}; `steps` are {from, to, text, code?}; `caption` is the
 * figure's caption.
 */
const SequenceDiagram = ({ actors, steps, caption }) => {
  const index = Object.fromEntries(actors.map((actor, i) => [actor.id, i]))
  const n = actors.length
  return (
    <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
      {/* wide screens: lanes and arrows */}
      <div className="hidden md:block">
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {actors.map((actor) => (
            <Actor key={actor.id} actor={actor} />
          ))}
        </div>
        <div className="relative mt-4">
          {/* lifelines */}
          {actors.map((actor, i) => (
            <div
              key={actor.id}
              aria-hidden="true"
              className="absolute bottom-0 top-0 border-s border-dashed border-keen-400"
              style={{ left: `${((i + 0.5) / n) * 100}%` }}
            />
          ))}
          <ol className="relative">
            {steps.map((step, i) => {
              const from = index[step.from]
              const to = index[step.to]
              const left = Math.min(from, to)
              const right = Math.max(from, to)
              const span = right - left + 1
              const inset = `${50 / span}%`
              const rightward = to > from
              return (
                <li
                  key={i}
                  className="grid py-2"
                  style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
                >
                  <div
                    style={{
                      gridColumn: `${left + 1} / ${right + 2}`,
                      marginLeft: inset,
                      marginRight: inset,
                    }}
                  >
                    <div
                      className={cn(
                        'mb-1 flex items-start gap-2 px-3',
                        !rightward && 'justify-end text-right'
                      )}
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-keen-900 text-[11px] font-semibold text-white">
                        {i + 1}
                      </span>
                      <Label step={step} />
                    </div>
                    <div className="relative h-2">
                      <div className="absolute inset-x-0 top-1/2 border-t-2 border-keen-700" />
                      <IconifyIcon
                        icon={rightward ? 'lucide:chevron-right' : 'lucide:chevron-left'}
                        className={cn(
                          'absolute top-1/2 h-4 w-4 -translate-y-1/2 text-keen-700',
                          rightward ? '-right-1.5' : '-left-1.5'
                        )}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {/* phones: a numbered list */}
      <ol className="space-y-3 md:hidden">
        {steps.map((step, i) => {
          const from = actors[index[step.from]]
          const to = actors[index[step.to]]
          return (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-keen-900 text-xs font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <p className="mb-1 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                  <span className={cn('rounded px-1.5 py-0.5', colorOf(from))}>
                    {from.label}
                  </span>
                  <IconifyIcon
                    icon="lucide:arrow-right"
                    className="h-3 w-3 text-keen-600"
                  />
                  <span className={cn('rounded px-1.5 py-0.5', colorOf(to))}>
                    {to.label}
                  </span>
                </p>
                <Label step={step} />
              </div>
            </li>
          )
        })}
      </ol>
      {caption && (
        <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
export default SequenceDiagram
