/*
 * The ways a page shows its manifests in the site's manifest editor:
 *
 * - ManifestProvider, around the page, with the repository and its manifests, opens any of them in a dialog;
 * - ManifestLink, in the text, is a link to a manifest on GitHub that opens it in the dialog instead;
 * - ManifestLab is a file browser of the repository's manifests, beside the editor.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import ManifestEditor from './ManifestEditor'

const ManifestContext = createContext(null)

/** The page's manifests: {repo, files, open(path)}. */
export const useManifests = () => {
  const context = useContext(ManifestContext)
  if (!context) throw new Error('useManifests() needs a <ManifestProvider>')
  return context
}

// The dialog, over the page, with one manifest in the editor. Escape, the close button and a click
// outside it close it, and the focus goes back to where it was.
const ManifestDialog = ({ repo, file, onClose }) => {
  const closeRef = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [onClose])
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-keen-900/60 px-4 py-8 backdrop-blur-sm md:py-16"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manifest-dialog-title"
        className="w-full max-w-4xl"
      >
        <div className="mb-3 flex items-center justify-between gap-4 text-white">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              {file.kind}
            </p>
            <h2 id="manifest-dialog-title" className="truncate text-xl font-semibold">
              {file.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <IconifyIcon icon="lucide:x" className="h-5 w-5" />
          </button>
        </div>
        {file.role && <p className="mb-4 max-w-3xl text-sm text-white/85">{file.role}</p>}
        <ManifestEditor repo={repo} file={file} maxHeight={520} />
      </div>
    </div>
  )
}

/**
 * Lets the page open its manifests.
 *
 * @param {object} props
 * @param {object} props.repo - githubRepository() of manifests.js
 * @param {Array<{path: string, kind: string, name: string, role?: string}>} props.files
 */
export const ManifestProvider = ({ repo, files, children }) => {
  const [openPath, setOpenPath] = useState(null)
  const open = useCallback((path) => setOpenPath(path), [])
  const close = useCallback(() => setOpenPath(null), [])
  const file = files.find((item) => item.path === openPath)
  return (
    <ManifestContext.Provider value={{ repo, files, open }}>
      {children}
      {file && <ManifestDialog repo={repo} file={file} onClose={close} />}
    </ManifestContext.Provider>
  )
}

/**
 * A manifest's name in the text: a link to its file on GitHub, which opens it in the editor instead.
 * A click with a modifier key, or the middle button, still opens GitHub in a new tab.
 */
export const ManifestLink = ({ path, children, className }) => {
  const { repo, open } = useManifests()
  return (
    <a
      href={repo.pageUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        open(path)
      }}
      className={cn(
        'inline-flex items-baseline gap-1 rounded bg-orange-50 px-1.5 py-0.5 font-mono text-[0.9em] text-primary ring-1 ring-orange-200 transition-colors hover:bg-orange-100',
        className
      )}
    >
      <IconifyIcon icon="lucide:file-code" className="h-3.5 w-3.5 translate-y-0.5" />
      {children ?? path.split('/').pop()}
    </a>
  )
}

/** The files, by folder, in the order that they're listed. */
const byFolder = (files) => {
  const folders = new Map()
  for (const file of files) {
    const folder = file.path.split('/').slice(0, -1).join('/')
    if (!folders.has(folder)) folders.set(folder, [])
    folders.get(folder).push(file)
  }
  return [...folders]
}

/**
 * The repository's manifests, by folder, beside the editor. `initialPath` is the manifest it opens with.
 */
export const ManifestLab = ({ initialPath }) => {
  const { repo, files } = useManifests()
  const [selected, setSelected] = useState(initialPath ?? files[0].path)
  const file = files.find((item) => item.path === selected)
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <nav
        aria-label={`The manifests of ${repo.repository}`}
        className="min-w-0 rounded-xl border border-keen-300 bg-white p-3 shadow-card"
      >
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex items-center gap-2 px-2 py-1 font-mono text-xs font-semibold text-keen-800 hover:text-primary"
        >
          <IconifyIcon icon="lucide:github" className="h-4 w-4" />
          {repo.repository}
        </a>
        <ul className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
          {byFolder(files).map(([folder, items]) => (
            <li key={folder} className="shrink-0">
              <p className="hidden items-center gap-1.5 px-2 pt-1 font-mono text-xs text-keen-600 lg:flex">
                <IconifyIcon icon="lucide:folder" className="h-3.5 w-3.5" />
                {folder}/
              </p>
              <ul className="flex gap-1 lg:block">
                {items.map((item) => (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => setSelected(item.path)}
                      aria-current={item.path === selected ? 'true' : undefined}
                      className={cn(
                        'flex w-full items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1.5 text-left font-mono text-xs transition-colors lg:ps-6',
                        item.path === selected
                          ? 'bg-orange-50 text-primary ring-1 ring-orange-200'
                          : 'text-keen-700 hover:bg-keen-100'
                      )}
                    >
                      <IconifyIcon
                        icon="lucide:file-code"
                        className="h-3.5 w-3.5 shrink-0"
                      />
                      {item.path.split('/').pop()}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <ManifestEditor key={file.path} repo={repo} file={file} maxHeight={640} />
    </div>
  )
}
