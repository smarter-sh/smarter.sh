import { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import SmartLink from '@/components/site/SmartLink'

// The callouts of a lesson: a term defined, an idea to remember, something to do, and a warning.
const callouts = {
  term: {
    icon: 'lucide:book-a',
    label: 'Key term',
    classes: 'border-sky-200 bg-sky-50',
    head: 'text-sky-700',
  },
  idea: {
    icon: 'lucide:lightbulb',
    label: 'Key idea',
    classes: 'border-amber-200 bg-amber-50',
    head: 'text-amber-700',
  },
  exercise: {
    icon: 'lucide:pencil-line',
    label: 'Exercise',
    classes: 'border-emerald-200 bg-emerald-50',
    head: 'text-emerald-700',
  },
  caution: {
    icon: 'lucide:triangle-alert',
    label: 'Caution',
    classes: 'border-red-200 bg-red-50',
    head: 'text-red-700',
  },
}

export const Callout = ({ type = 'idea', title, children, className }) => {
  const style = callouts[type]
  return (
    <aside className={cn('my-6 rounded-xl border p-5', style.classes, className)}>
      <p
        className={cn(
          'mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest',
          style.head
        )}
      >
        <IconifyIcon icon={style.icon} className="h-4 w-4" />
        {style.label}
        {title && <span className="normal-case tracking-normal">· {title}</span>}
      </p>
      <div className="space-y-2 text-[15px] leading-relaxed text-keen-800">
        {children}
      </div>
    </aside>
  )
}

// A numbered part of the case, e.g. "Part 3 · Tool calling". Its text keeps a readable measure; its
// figures, chats and editors may use the column's whole width.
export const Part = ({ id, number, title, children }) => (
  <section
    id={id}
    className="scroll-mt-28 border-t border-keen-200 py-14 first:border-t-0"
  >
    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
      Part {number}
    </p>
    <h2 className="mb-6 max-w-3xl text-3xl font-semibold text-keen-900">{title}</h2>
    <div className="[&>aside]:max-w-3xl [&>h3]:mb-3 [&>h3]:mt-10 [&>h3]:max-w-3xl [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-keen-900 [&>p]:mb-4 [&>p]:max-w-3xl [&>p]:text-[17px] [&>p]:leading-relaxed [&>p]:text-keen-700">
      {children}
    </div>
  </section>
)

// Inline code, in the site's code colors.
export const Code = ({ children }) => (
  <code className="rounded bg-keen-200 px-1.5 py-0.5 font-mono text-[0.88em] text-keen-900">
    {children}
  </code>
)

/*
 * A block of code, in the site's code colors, with an optional numbered caption, e.g. "Figure 4. …".
 * `copy` adds a button that copies the code, for a command the reader should run.
 */
export const CodeBlock = ({ code, number, caption, copy = false }) => {
  const [copied, setCopied] = useState(false)
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // a browser that doesn't allow it: nothing to do
    }
  }
  return (
    <figure className="my-6 max-w-full">
      <div className="relative">
        <pre className="overflow-x-auto rounded-xl bg-code-bg p-5 font-mono text-[13px] leading-6 text-code-text">
          {code}
        </pre>
        {copy && (
          <button
            type="button"
            onClick={copyCode}
            aria-label={copied ? 'Copied' : 'Copy'}
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs text-code-text transition-colors hover:bg-white/20"
          >
            <IconifyIcon
              icon={copied ? 'lucide:check' : 'lucide:copy'}
              className="h-3.5 w-3.5"
            />
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 max-w-3xl text-sm text-keen-600">
          {number && <strong className="text-keen-800">Figure {number}. </strong>}
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// The case's contents, beside it on wide screens, with the part that the reader is in highlighted.
export const Contents = ({ sections }) => {
  const [current, setCurrent] = useState(sections[0].id)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setCurrent(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    for (const { id } of sections) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [sections])
  return (
    <nav aria-label="Contents" className="sticky top-28">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-keen-600">
        Contents
      </p>
      <ol className="space-y-1 border-s border-keen-300">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                '-ms-px block border-s-2 py-1 ps-4 text-sm transition-colors',
                current === section.id
                  ? 'border-emerald-500 font-medium text-keen-900'
                  : 'border-transparent text-keen-600 hover:text-keen-900'
              )}
            >
              <span className="me-1.5 tabular-nums text-keen-500">{index + 1}.</span>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/*
 * The case at a glance, below its hero: what the reader will learn, beside the case's facts.
 *
 * @param {string[]} objectives - the learning objectives
 * @param {Array<[string, string]>} facts - the case's facts, as [term, value]
 * @param {string} duration - how long the case takes, e.g. "About 45 minutes, with both labs."
 */
export const Glance = ({ objectives, facts, duration }) => (
  <section className="pb-6" aria-label="The case at a glance">
    <div className="container">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-card md:p-8">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            <IconifyIcon icon="lucide:target" className="h-4 w-4" />
            Learning objectives
          </p>
          <p className="mb-4 text-keen-700">
            After working through this case, you will be able to:
          </p>
          <ol className="space-y-3">
            {objectives.map((objective, i) => (
              <li key={objective} className="flex gap-3 text-[15px] text-keen-800">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  {i + 1}
                </span>
                {objective}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-keen-300 bg-white p-6 shadow-card md:p-8">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-keen-600">
            <IconifyIcon icon="lucide:clipboard-list" className="h-4 w-4" />
            Case facts
          </p>
          <dl className="divide-y divide-keen-200">
            {facts.map(([term, value]) => (
              <div
                key={term}
                className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 text-sm"
              >
                <dt className="font-medium text-keen-600">{term}</dt>
                <dd className="text-keen-900">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-center gap-2 text-sm text-keen-600">
            <IconifyIcon icon="lucide:clock" className="h-4 w-4" />
            {duration}
          </p>
        </div>
      </div>
    </div>
  </section>
)

// Steps in order, on a vertical line, e.g. the steps of a pull request. Each step is text or a node.
export const Steps = ({ steps }) => (
  <ol className="mb-6 max-w-3xl space-y-0">
    {steps.map((step, i) => (
      <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
        {i < steps.length - 1 && (
          <span
            aria-hidden="true"
            className="absolute left-[13px] top-7 h-[calc(100%-1.5rem)] border-s-2 border-keen-300"
          />
        )}
        <span className="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-keen-900 text-xs font-semibold text-white">
          {i + 1}
        </span>
        <div className="pt-0.5 text-[15px] leading-relaxed text-keen-700">{step}</div>
      </li>
    ))}
  </ol>
)

// The case's discussion questions, numbered Q1, Q2, …
export const Questions = ({ questions }) => (
  <ol className="max-w-3xl space-y-4">
    {questions.map((question, i) => (
      <li key={question} className="flex gap-4">
        <span className="font-mono text-sm font-semibold text-emerald-600">Q{i + 1}</span>
        <p className="text-[16px] leading-relaxed text-keen-800">{question}</p>
      </li>
    ))}
  </ol>
)

// The case's further reading: {title, url} links, in two columns.
export const ReadingList = ({ items }) => (
  <ul className="grid max-w-3xl gap-2 sm:grid-cols-2">
    {items.map((item) => (
      <li key={item.url}>
        <SmartLink
          href={item.url}
          className="group flex items-center gap-2 rounded-lg border border-keen-300 bg-white px-4 py-3 text-sm text-keen-800 transition-colors hover:border-primary hover:text-primary"
        >
          <IconifyIcon
            icon="lucide:book-open"
            className="h-4 w-4 shrink-0 text-keen-500 group-hover:text-primary"
          />
          {item.title}
        </SmartLink>
      </li>
    ))}
  </ul>
)

// A grid of cards, each {icon, title, text}. `numbered` adds 01, 02, … beside each icon.
export const CardGrid = ({ cards, numbered = false }) => (
  <div className="my-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {cards.map((card, i) => (
      <div
        key={card.title}
        className="rounded-xl border border-keen-300 bg-white p-5 shadow-card"
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-keen-100 text-keen-800">
            <IconifyIcon icon={card.icon} className="h-5 w-5" />
          </span>
          {numbered && (
            <span className="text-xs font-semibold text-keen-500">
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
        </div>
        <h3 className="mb-1.5 font-semibold text-keen-900">{card.title}</h3>
        <p className="text-sm leading-relaxed text-keen-600">{card.text}</p>
      </div>
    ))}
  </div>
)

// A link in the case's prose.
export const TextLink = ({ href, children }) => (
  <SmartLink href={href} className="text-primary hover:underline">
    {children}
  </SmartLink>
)

/*
 * A table of rows, each an array of cells, one per heading. The first column is a name, in a
 * monospaced font unless `mono` is false.
 */
export const Table = ({ head, rows, mono = true }) => (
  <div className="my-6 overflow-x-auto rounded-xl border border-keen-300 bg-white shadow-card">
    <table className="w-full min-w-[32rem] text-left text-sm">
      <thead className="bg-keen-100 text-xs uppercase tracking-wider text-keen-600">
        <tr>
          {head.map((cell) => (
            <th key={cell} className="px-4 py-3 font-semibold">
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-keen-200">
        {rows.map(([first, ...rest], r) => (
          <tr key={r}>
            <td
              className={cn('px-4 py-3 font-medium text-keen-900', mono && 'font-mono')}
            >
              {first}
            </td>
            {rest.map((cell, i) => (
              <td key={i} className="px-4 py-3 text-keen-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// A list's marker: a number, or a letter, in a small emerald circle.
const Marker = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200',
      className
    )}
  >
    {children}
  </span>
)

const letter = (i) => String.fromCharCode(97 + i)

// A lab's experiments with a live chatbot: what to ask, and what to observe.
export const Experiments = ({ experiments }) => (
  <ol className="max-w-3xl space-y-4">
    {experiments.map((experiment, i) => (
      <li
        key={experiment.prompt}
        className="rounded-xl border border-keen-300 bg-white p-5 shadow-card"
      >
        <p className="mb-2 flex items-start gap-3">
          <Marker>{i + 1}</Marker>
          <span className="font-medium text-keen-900">
            Ask: <em>“{experiment.prompt}”</em>
          </span>
        </p>
        <p className="ps-9 text-[15px] leading-relaxed text-keen-700">
          <strong className="text-keen-800">Observe. </strong>
          {experiment.observe}
        </p>
      </li>
    ))}
  </ol>
)

// A lab's exercises, lettered a, b, c…, each {title, text}.
export const Exercises = ({ exercises }) => (
  <ol className="mb-6 max-w-3xl space-y-3">
    {exercises.map((exercise, i) => (
      <li key={exercise.title} className="flex gap-3 text-[15px] leading-relaxed">
        <Marker className="mt-0.5">{letter(i)}</Marker>
        <span className="text-keen-700">
          <strong className="text-keen-900">{exercise.title}. </strong>
          {exercise.text}
        </span>
      </li>
    ))}
  </ol>
)

// Commands for the reader to run, lettered a, b, c…, each {title, text, code}, with a copy button.
export const Commands = ({ commands }) => (
  <ol className="max-w-full space-y-8">
    {commands.map((command, i) => (
      <li key={command.title}>
        <p className="mb-1 flex max-w-3xl items-start gap-3 font-medium text-keen-900">
          <Marker>{letter(i)}</Marker>
          {command.title}
        </p>
        <p className="max-w-3xl ps-9 text-[15px] leading-relaxed text-keen-700">
          {command.text}
        </p>
        <div className="ps-9">
          <CodeBlock code={command.code} copy />
        </div>
      </li>
    ))}
  </ol>
)
