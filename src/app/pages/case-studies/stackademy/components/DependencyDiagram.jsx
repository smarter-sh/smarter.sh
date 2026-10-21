import { Fragment } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { useManifests } from '@/components/manifest/ManifestViewer'

// Each layer of the project, in the order that its manifests are applied, in the color of its topic.
const layers = [
  {
    label: 'Secrets',
    icon: 'lucide:key-round',
    color: 'border-sky-300 bg-sky-50',
    head: 'text-sky-700',
  },
  {
    label: 'Connections',
    icon: 'lucide:plug',
    color: 'border-teal-300 bg-teal-50',
    head: 'text-teal-700',
  },
  {
    label: 'Plugins (tools)',
    icon: 'lucide:wrench',
    color: 'border-violet-300 bg-violet-50',
    head: 'text-violet-700',
  },
  {
    label: 'LLMClients',
    icon: 'lucide:message-circle',
    color: 'border-orange-300 bg-orange-50',
    head: 'text-primary',
  },
]

// the two chains of references, from a Secret to an assistant
const chains = [
  {
    label: 'The database advisor',
    paths: [
      'secrets/smarter-test-db.yaml',
      'connections/sql/smarter-test-db.yaml',
      'plugins/sql/stackademy-sql.yaml',
      'llm-clients/stackademy-sql.yaml',
    ],
  },
  {
    label: 'The web API advisor',
    paths: [
      'secrets/smarter-test-api.yaml',
      'connections/api/smarter-test-api.yaml.tpl',
      'plugins/api/stackademy-api.yaml',
      'llm-clients/stackademy-api.yaml',
    ],
  },
]

const Card = ({ file, layer }) => {
  const { open } = useManifests()
  return (
    <button
      type="button"
      onClick={() => open(file.path)}
      className={cn(
        'group w-full rounded-lg border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-header',
        layer.color
      )}
    >
      <p className={cn('text-[11px] font-semibold uppercase tracking-wider', layer.head)}>
        {file.kind}
      </p>
      <p className="mt-0.5 break-all font-mono text-[13px] font-medium text-keen-900">
        {file.name}
      </p>
      <p className="mt-2 flex items-center gap-1 text-xs text-keen-600 group-hover:text-keen-900">
        <IconifyIcon icon="lucide:file-code" className="h-3.5 w-3.5" />
        Open the manifest
      </p>
    </button>
  )
}

const Arrow = () => (
  <div className="flex items-center justify-center py-1 text-keen-500 md:py-0">
    <IconifyIcon icon="lucide:arrow-down" className="h-5 w-5 md:hidden" />
    <IconifyIcon icon="lucide:arrow-right" className="hidden h-5 w-5 md:block" />
  </div>
)

/*
 * The resources of the Stackademy project and how they refer to one another, from the Secrets on the left to
 * the assistants on the right, with the Budget that limits them. Every card opens its manifest.
 */
const DependencyDiagram = () => {
  const { files } = useManifests()
  const byPath = Object.fromEntries(files.map((file) => [file.path, file]))
  const grid = 'md:grid md:grid-cols-[1fr_2rem_1fr_2rem_1fr_2rem_1fr] md:items-stretch'
  return (
    <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
      <div className={cn('mb-3 hidden', grid)}>
        {layers.map((layer, i) => (
          <Fragment key={layer.label}>
            {i > 0 && <span />}
            <p
              className={cn(
                'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider',
                layer.head
              )}
            >
              <IconifyIcon icon={layer.icon} className="h-4 w-4" />
              {i + 1}. {layer.label}
            </p>
          </Fragment>
        ))}
      </div>
      <div className="space-y-8 md:space-y-5">
        {chains.map((chain) => (
          <div key={chain.label}>
            <p className="mb-2 text-sm font-medium text-keen-700">{chain.label}</p>
            <div className={grid}>
              {chain.paths.map((path, i) => (
                <Fragment key={path}>
                  {i > 0 && <Arrow />}
                  <Card file={byPath[path]} layer={layers[i]} />
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 border-t border-keen-200 pt-6 md:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
            <IconifyIcon icon="lucide:wallet" className="h-4 w-4" />
            5. Budget, applied last
          </p>
          <BudgetCard file={byPath['budgets/stackademy-project.yaml']} />
        </div>
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
            <IconifyIcon icon="lucide:key-round" className="h-4 w-4" />A spare Secret
          </p>
          <Card
            file={byPath['secrets/smarter-test-db-proxy-password.yaml']}
            layer={layers[0]}
          />
        </div>
      </div>
      <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
        <strong className="text-keen-800">Figure 2.</strong> Ten resources, two chains.
        Each arrow is a reference by name: the LLMClient lists its plugin, the plugin
        names its connection, the connection names its Secret. The Budget limits the
        database advisor and its plugin. Select any card to read its manifest.
      </figcaption>
    </figure>
  )
}

const BudgetCard = ({ file }) => (
  <Card
    file={file}
    layer={{ color: 'border-amber-300 bg-amber-50', head: 'text-amber-700' }}
  />
)

export default DependencyDiagram
