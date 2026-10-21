import { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'

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
