import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SmartLink from '@/components/site/SmartLink'
import YouTubeVideo from '@/components/site/YouTubeVideo'
import { useManifests } from '@/components/manifest/ManifestViewer'
import { cn } from '@/helpers/cn'
import YamlBlock from './YamlBlock'

/**
 * One plugin: what it does and a question it answers, beside the lines of its manifest that make
 * it what it is. Its whole manifest opens from GitHub in the editor. `flip` puts the manifest on the
 * left, so that the page alternates. A plugin with a video shows it below, at full width.
 */
const PluginShowcase = ({ plugin, flip = false }) => {
  const { open } = useManifests()
  return (
    <article
      id={plugin.id}
      aria-labelledby={`${plugin.id}-title`}
      className="scroll-mt-28 border-t border-keen-200 py-14 first:border-t-0 first:pt-0 lg:py-20"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn('min-w-0', flip && 'lg:order-last')}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <IconifyIcon icon={plugin.icon} className="h-6 w-6" />
            </span>
            <span className="font-mono text-sm font-semibold text-violet-600">
              kind: {plugin.kind}
            </span>
            {plugin.badge && (
              <span className="rounded-full border border-keen-300 px-2.5 py-0.5 text-xs font-medium text-keen-600">
                {plugin.badge}
              </span>
            )}
          </div>
          <h3
            id={`${plugin.id}-title`}
            className="mb-4 text-2xl font-semibold text-keen-900 lg:text-3xl"
          >
            {plugin.tagline}
          </h3>
          <p className="mb-5 text-lg text-keen-700">{plugin.pitch}</p>
          <blockquote className="mb-6 rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-keen-800">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-violet-600">
              Ask it
            </span>
            “{plugin.ask}”
          </blockquote>
          <ul className="mb-8 space-y-2.5">
            {plugin.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-keen-700">
                <IconifyIcon
                  icon="lucide:check"
                  className="mt-1 h-4 w-4 shrink-0 text-violet-600"
                />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => open(plugin.file.path)}
              className="inline-flex items-center gap-2 rounded-full border border-keen-300 bg-white px-5 py-2.5 text-sm font-medium text-keen-800 transition-colors hover:border-violet-400 hover:text-violet-600"
            >
              <IconifyIcon icon="lucide:file-code" className="h-4 w-4" />
              Open the whole manifest
            </button>
            <SmartLink
              href={plugin.docs}
              className="inline-flex items-center gap-1 px-2 py-2.5 text-sm font-medium text-violet-600 hover:underline"
            >
              {plugin.kind} documentation
              <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
            </SmartLink>
          </div>
        </div>
        <YamlBlock file={plugin.file.path.split('/').pop()} code={plugin.excerpt} />
      </div>
      {plugin.video && (
        <figure className="mx-auto mt-12 max-w-4xl">
          <YouTubeVideo id={plugin.video.id} title={plugin.video.title} />
          <figcaption className="mt-3 text-center text-sm text-keen-600">
            {plugin.video.caption}
          </figcaption>
        </figure>
      )}
    </article>
  )
}
export default PluginShowcase
