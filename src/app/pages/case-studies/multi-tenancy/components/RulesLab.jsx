import { useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { mayChange, mayRead, people, resources } from '../data'

const Answer = ({ allowed, label }) => (
  <span
    aria-label={`${label}: ${allowed ? 'yes' : 'no'}`}
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
      allowed ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
    )}
  >
    <IconifyIcon icon={allowed ? 'lucide:check' : 'lucide:x'} className="h-3.5 w-3.5" />
    {allowed ? 'yes' : 'no'}
  </span>
)

/*
 * Lab 1 of the multi-tenancy case: choose a person, and see which of a small platform's resources the
 * two queryset rules let them read and change. The rules are mayRead() and mayChange() in ../data.js,
 * the same logic as with_read_permission_for() and with_ownership_permission_for().
 */
const RulesLab = () => {
  const [selected, setSelected] = useState(people[0].id)
  const person = people.find((p) => p.id === selected)
  return (
    <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
      <p className="mb-3 text-sm font-semibold text-keen-900">Who is asking?</p>
      <div className="mb-2 flex flex-wrap gap-2" role="group" aria-label="People">
        {people.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={p.id === selected}
            onClick={() => setSelected(p.id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm transition-colors',
              p.id === selected
                ? 'border-emerald-400 bg-emerald-50 font-medium text-emerald-800'
                : 'border-keen-300 text-keen-700 hover:bg-keen-100'
            )}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="mb-5 text-sm text-keen-600">
        {person.name}, {person.description}.{' '}
        {person.profiles.length
          ? `Profiles: ${person.profiles.map((profile) => profile.id).join(', ')}.`
          : 'No profile at all.'}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-keen-600">
            <tr className="border-b border-keen-200">
              <th className="py-2 pe-3 font-semibold">Resource</th>
              <th className="py-2 pe-3 font-semibold">Owner</th>
              <th className="py-2 pe-3 font-semibold">May read</th>
              <th className="py-2 font-semibold">May change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-keen-200">
            {resources.map((resource) => (
              <tr key={resource.name}>
                <td className="py-2.5 pe-3">
                  <span className="font-mono text-keen-900">{resource.name}</span>
                  <span className="ms-2 text-xs text-keen-500">{resource.kind}</span>
                </td>
                <td className="py-2.5 pe-3 text-keen-700">
                  {resource.owner}
                  <span className="block text-xs text-keen-500">{resource.account}</span>
                </td>
                <td className="py-2.5 pe-3">
                  <Answer
                    allowed={mayRead(person, resource)}
                    label={`${resource.name} read`}
                  />
                </td>
                <td className="py-2.5">
                  <Answer
                    allowed={mayChange(person, resource)}
                    label={`${resource.name} change`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
        <strong className="text-keen-800">Figure 2.</strong> The two rules of Part 4,
        applied to a small platform of three accounts. The people and resources are made
        up; the rules are Smarter’s.
      </figcaption>
    </figure>
  )
}
export default RulesLab
