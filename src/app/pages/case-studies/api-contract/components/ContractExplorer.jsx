import { useMemo, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'

const METHODS = ['get', 'post', 'put', 'patch', 'delete']

const methodColors = {
  GET: 'bg-sky-50 text-sky-700 ring-sky-200',
  POST: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  DELETE: 'bg-red-50 text-red-700 ring-red-200',
}

/**
 * What a reader can see of an OpenAPI document: its versions, its operations and its manifest kinds.
 *
 * @param {object} document - an OpenAPI document, parsed
 * @returns {{openapi: string, version: string, paths: number, schemas: number, kinds: string[],
 *   operations: Array<{method: string, path: string, operationId: string, summary: string}>}}
 */
export const summarize = (document) => {
  const operations = []
  for (const [path, item] of Object.entries(document.paths ?? {})) {
    for (const method of METHODS) {
      const operation = item[method]
      if (operation) {
        operations.push({
          method: method.toUpperCase(),
          path,
          operationId: operation.operationId ?? '',
          summary: operation.summary ?? '',
        })
      }
    }
  }
  const schemas = document.components?.schemas ?? {}
  return {
    openapi: document.openapi,
    version: document.info?.version,
    paths: Object.keys(document.paths ?? {}).length,
    schemas: Object.keys(schemas).length,
    kinds: schemas.SAMKind?.enum ?? [],
    operations,
  }
}

const Stat = ({ label, value }) => (
  <div className="rounded-lg border border-keen-300 bg-white px-3 py-2">
    <p className="text-xs text-keen-600">{label}</p>
    <p className="font-mono text-lg font-semibold text-keen-900">{value}</p>
  </div>
)

/*
 * Figure 8 of the API contract case: the committed openapi.json, loaded from GitHub when the reader asks
 * (it's about 800 KB), with its operations filtered as they type. raw.githubusercontent.com allows any
 * web site to read it; a platform's own /docs/openapi.json doesn't, so the page can't read that one.
 */
const ContractExplorer = ({ url }) => {
  const [state, setState] = useState({ status: 'idle' })
  const [query, setQuery] = useState('')

  const load = async () => {
    setState({ status: 'loading' })
    try {
      const response = await fetch(url)
      if (!response?.ok) throw new Error(`${url} answered ${response?.status}`)
      setState({ status: 'ready', summary: summarize(await response.json()) })
    } catch {
      setState({ status: 'failed' })
    }
  }

  const matches = useMemo(() => {
    if (state.status !== 'ready') return []
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    return state.summary.operations.filter((operation) => {
      const text =
        `${operation.method} ${operation.path} ${operation.operationId} ${operation.summary}`.toLowerCase()
      return words.every((word) => text.includes(word))
    })
  }, [state, query])

  return (
    <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
      {state.status !== 'ready' && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-[15px] text-keen-700">
            Load the platform’s committed <span className="font-mono">openapi.json</span>{' '}
            from GitHub, about 800 KB, and explore it here.
          </p>
          <button
            type="button"
            onClick={load}
            disabled={state.status === 'loading'}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-60"
          >
            <IconifyIcon
              icon={state.status === 'loading' ? 'lucide:loader' : 'lucide:download'}
              className={cn('h-4 w-4', state.status === 'loading' && 'animate-spin')}
            />
            {state.status === 'loading' ? 'Loading…' : 'Load the contract'}
          </button>
          {state.status === 'failed' && (
            <p role="alert" className="text-sm text-red-700">
              GitHub didn’t answer.{' '}
              <a
                href={url}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the file on GitHub
              </a>{' '}
              instead, or try again.
            </p>
          )}
        </div>
      )}

      {state.status === 'ready' && (
        <div>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <Stat label="OpenAPI" value={state.summary.openapi} />
            <Stat label="API version" value={state.summary.version} />
            <Stat label="Paths" value={state.summary.paths} />
            <Stat label="Operations" value={state.summary.operations.length} />
            <Stat label="Schemas" value={state.summary.schemas} />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-keen-600">
            The SAMKind enum: {state.summary.kinds.length} kinds
          </p>
          <ul className="mb-5 flex flex-wrap gap-1.5">
            {state.summary.kinds.map((kind) => (
              <li
                key={kind}
                className="rounded-full border border-keen-300 px-2.5 py-0.5 font-mono text-xs text-keen-700"
              >
                {kind}
              </li>
            ))}
          </ul>
          <label className="mb-3 block">
            <span className="mb-1 block text-sm font-medium text-keen-800">
              Filter the operations
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. cli, guardrail, prompt"
              className="w-full rounded-md border border-keen-300 px-3 py-2 text-sm"
            />
          </label>
          <p className="mb-2 text-sm text-keen-600">
            {matches.length} of {state.summary.operations.length} operations
          </p>
          <div className="max-h-96 overflow-auto rounded-lg border border-keen-200">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="sticky top-0 bg-keen-100 text-xs uppercase tracking-wider text-keen-600">
                <tr>
                  <th className="px-3 py-2 font-semibold">Method</th>
                  <th className="px-3 py-2 font-semibold">Path, under /api/v1</th>
                  <th className="px-3 py-2 font-semibold">operationId</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-keen-200">
                {matches.map((operation) => (
                  <tr key={`${operation.method} ${operation.path}`}>
                    <td className="px-3 py-1.5">
                      <span
                        className={cn(
                          'rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold ring-1',
                          methodColors[operation.method] ??
                            'bg-keen-100 text-keen-700 ring-keen-300'
                        )}
                      >
                        {operation.method}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 font-mono text-[12px] text-keen-900">
                      {operation.path}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-[12px] text-keen-700">
                      {operation.operationId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
        <strong className="text-keen-800">Figure 8.</strong> The contract, as a client
        reads it. Every request of every client is one of these operations, and the
        clients’ contract tests say so.
      </figcaption>
    </figure>
  )
}
export default ContractExplorer
