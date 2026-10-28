import { cn } from '@/helpers/cn'

// The labels of a deployed chatbot's hostname, each with where it comes from.
const labels = [
  {
    text: 'weather',
    name: 'The LLMClient’s name',
    from: 'metadata.name, made RFC 1034 compliant',
    color: 'border-orange-300 bg-orange-50 text-primary',
  },
  {
    text: '3141-5926-5359',
    name: 'The account number',
    from: 'the owner’s account: the tenant boundary',
    color: 'border-sky-300 bg-sky-50 text-sky-700',
  },
  {
    text: 'api.ubc.smarter.sh',
    name: 'The environment’s API domain',
    from: 'its own Route 53 zone, and its own ClusterIssuer',
    color: 'border-teal-300 bg-teal-50 text-teal-700',
  },
]

/*
 * Figure 2 of the deploy case: a chatbot's default hostname, label by label.
 */
const HostnameDiagram = () => (
  <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
    <p
      className="mb-6 flex flex-wrap items-center justify-center gap-1 font-mono text-sm md:text-lg"
      aria-label="weather.3141-5926-5359.api.ubc.smarter.sh"
    >
      {labels.map((label, i) => (
        <span key={label.text} className="flex items-center gap-1">
          {i > 0 && <span className="text-keen-500">.</span>}
          <span className={cn('rounded-md border px-2 py-1', label.color)}>
            {label.text}
          </span>
        </span>
      ))}
    </p>
    <dl className="grid gap-3 md:grid-cols-3">
      {labels.map((label) => (
        <div key={label.text} className={cn('rounded-lg border p-3', label.color)}>
          <dt className="text-sm font-semibold">{label.name}</dt>
          <dd className="text-[13px] leading-snug text-keen-700">{label.from}</dd>
        </div>
      ))}
    </dl>
    <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
      <strong className="text-keen-800">Figure 2.</strong> A deployed chatbot’s hostname.
      Two accounts can both have a chatbot called weather; their account numbers keep
      their hostnames, records and certificates apart.
    </figcaption>
  </figure>
)
export default HostnameDiagram
