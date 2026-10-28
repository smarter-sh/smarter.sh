import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'

// What sits on each side of the seam, and the seam itself.
const columns = [
  {
    label: 'Behind the seam',
    sub: 'the platform’s business, free to change',
    color: 'border-keen-300 bg-keen-100',
    head: 'text-keen-700',
    icon: 'lucide:server',
    items: [
      'Django models and migrations',
      'A broker per manifest kind',
      'Pydantic SAM models',
      'Multi-tenant accounts',
      'Kubernetes deployments',
      'The Smarter Journal',
    ],
  },
  {
    label: 'The seam',
    sub: 'generated, committed, tested',
    color: 'border-emerald-300 bg-emerald-50',
    head: 'text-emerald-700',
    icon: 'lucide:file-json',
    items: [
      'openapi.json',
      'sam/<Kind>.schema.json × 25',
      'sam/<Kind>.example.json × 25',
      'chat-contract.schema.json',
    ],
    mono: true,
  },
  {
    label: 'In front of the seam',
    sub: 'the clients’ business, in their own languages',
    color: 'border-amber-300 bg-amber-50',
    head: 'text-amber-700',
    icon: 'lucide:users',
    items: [
      'smarter-python (Python)',
      'smarter-nodejs (TypeScript)',
      'smarter-golang (Go)',
      'smarter-cli (Go)',
      'smarter-vscode-yaml (VS Code)',
      'Smarter Chat (React)',
    ],
  },
]

/*
 * Figure 1 of the API contract case: the platform's internals, the contract, and the clients, with the
 * contract as the only thing that both sides depend on.
 */
const SeamDiagram = () => (
  <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {columns.map((column, i) => (
        <div key={column.label} className="contents">
          {i > 0 && (
            <div
              aria-hidden="true"
              className="flex items-center justify-center text-keen-500"
            >
              <IconifyIcon
                icon="lucide:arrow-left-right"
                className="h-5 w-5 rotate-90 md:rotate-0"
              />
            </div>
          )}
          <div className={cn('rounded-xl border p-4', column.color)}>
            <p
              className={cn(
                'flex items-center gap-2 text-xs font-semibold uppercase tracking-widest',
                column.head
              )}
            >
              <IconifyIcon icon={column.icon} className="h-4 w-4" />
              {column.label}
            </p>
            <p className="mb-3 text-sm text-keen-600">{column.sub}</p>
            <ul className="space-y-1.5">
              {column.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    'rounded-md border border-keen-300 bg-white px-2.5 py-1.5 text-[13px] text-keen-800',
                    column.mono && 'font-mono text-[12px]'
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
    <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
      <strong className="text-keen-800">Figure 1.</strong> The seam. Nothing on the left
      crosses it, and no client shares a line of code with the platform. The only question
      that matters to a client is whether a file in the middle changed.
    </figcaption>
  </figure>
)
export default SeamDiagram
