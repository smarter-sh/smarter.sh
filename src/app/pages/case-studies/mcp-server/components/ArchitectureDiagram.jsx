import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'

// The server's two paths, each from its source down to the database that they share.
const paths = [
  {
    label: 'Indexing',
    when: 'every hour, while nobody waits',
    color: 'border-sky-300 bg-sky-50',
    head: 'text-sky-700',
    boxes: [
      {
        icon: 'lucide:github',
        title: 'GitHub and the blog',
        text: '21 repositories, as archives; every post, from WordPress’s REST API',
      },
      {
        icon: 'lucide:timer',
        title: 'A Celery worker',
        text: 'index_repositories and index_blog, scheduled by Celery Beat',
      },
    ],
    verb: 'writes',
  },
  {
    label: 'Answering',
    when: 'on every tool call',
    color: 'border-amber-300 bg-amber-50',
    head: 'text-amber-700',
    boxes: [
      {
        icon: 'lucide:message-circle',
        title: 'An MCP client',
        text: 'a Smarter LLMClient’s MCPClient, Claude Code, an IDE… POSTs JSON-RPC',
      },
      {
        icon: 'lucide:server',
        title: 'A Django view and the MCP server',
        text: 'rate limit, validate, run one of 8 read-only tools',
      },
    ],
    verb: 'reads',
  },
]

const Arrow = ({ label }) => (
  <div className="flex items-center justify-center gap-1.5 py-1.5 text-xs text-keen-600">
    <IconifyIcon icon="lucide:arrow-down" className="h-4 w-4 text-keen-700" />
    {label}
  </div>
)

/*
 * Figure 2 of the MCP server case: indexing and answering are separate paths that meet at one database.
 */
const ArchitectureDiagram = () => (
  <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
    <div className="grid gap-6 md:grid-cols-2">
      {paths.map((path) => (
        <div key={path.label} className={cn('rounded-xl border p-4', path.color)}>
          <p className={cn('text-xs font-semibold uppercase tracking-widest', path.head)}>
            {path.label}
          </p>
          <p className="mb-3 text-sm text-keen-600">{path.when}</p>
          {path.boxes.map((box, i) => (
            <div key={box.title}>
              {i > 0 && <Arrow />}
              <div className="flex gap-3 rounded-lg border border-keen-300 bg-white p-3">
                <IconifyIcon
                  icon={box.icon}
                  className={cn('mt-0.5 h-5 w-5 shrink-0', path.head)}
                />
                <div>
                  <p className="text-sm font-semibold text-keen-900">{box.title}</p>
                  <p className="text-[13px] leading-snug text-keen-600">{box.text}</p>
                </div>
              </div>
            </div>
          ))}
          <Arrow label={path.verb} />
        </div>
      ))}
    </div>
    <div className="mt-2 flex gap-3 rounded-xl border border-teal-300 bg-teal-50 p-4">
      <IconifyIcon
        icon="lucide:database"
        className="mt-0.5 h-5 w-5 shrink-0 text-teal-700"
      />
      <div>
        <p className="text-sm font-semibold text-keen-900">The platform’s database</p>
        <p className="text-[13px] leading-snug text-keen-600">
          <span className="font-mono">RepositoryIndex</span>: one row per repository, with
          the indexed commit. <span className="font-mono">RepositoryFile</span>: one row
          per text file, or blog post.
        </p>
      </div>
    </div>
    <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
      <strong className="text-keen-800">Figure 2.</strong> Two paths that meet at one
      database. Everything slow, unreliable or rate-limited happens on the left. The right
      never leaves the platform.
    </figcaption>
  </figure>
)
export default ArchitectureDiagram
