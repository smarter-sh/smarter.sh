/*
 * The site's manifest editor: a public port of the web console's (@smarter/manifest-editor in
 * github.com/smarter-sh/smarter). It shows a manifest from a GitHub repository, in an editor that a visitor
 * may change, and checks every change as they type: its YAML syntax, and its kind's JSON Schema, the very
 * check that the repository runs on each pull request. Hovering over a key explains it.
 *
 * The console's editor saves, clones and deletes resources with the cli api, which needs a login. This one
 * changes nothing but the page: its toolbar copies, downloads and resets, and links to the file on GitHub,
 * where a change is proposed with a pull request.
 */
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { fetchManifest, fetchSchema, schemaUrl } from './manifests'
import { parseYaml, schemaErrors, syntaxErrors } from './validation'

const MonacoYaml = lazy(() => import('./MonacoYaml'))

// how long a visitor pauses typing before the manifest is checked
const VALIDATE_DELAY_MS = 400

/** The kind in a manifest's YAML, or null. */
const kindOf = (yaml) => {
  try {
    const parsed = parseYaml(yaml)
    return typeof parsed?.kind === 'string' ? parsed.kind : null
  } catch {
    return null
  }
}

const ToolButton = ({ icon, label, onClick, disabled, href }) => {
  const className =
    'inline-flex h-8 w-8 items-center justify-center rounded-md border border-keen-300 bg-white text-keen-700 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-keen-300 disabled:hover:text-keen-700'
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={label}
        aria-label={label}
        className={className}
      >
        <IconifyIcon icon={icon} className="h-4 w-4" />
      </a>
    )
  }
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <IconifyIcon icon={icon} className="h-4 w-4" />
    </button>
  )
}

// The check's result, under the editor: valid, or each problem, which moves the cursor to it.
const Problems = ({ status, errors, kind, isDirty, onSelect }) => {
  if (status === 'checking') {
    return (
      <p className="flex items-center gap-2 text-sm text-keen-600">
        <IconifyIcon icon="lucide:loader" className="h-4 w-4 animate-spin" />
        Checking…
      </p>
    )
  }
  if (!errors.length) {
    return (
      <p className="flex items-start gap-2 text-sm text-emerald-700" role="status">
        <IconifyIcon icon="lucide:circle-check" className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          {isDirty ? 'Still a valid ' : 'A valid '}
          <strong>{kind ?? 'Smarter'}</strong> manifest: it matches the{' '}
          {kind ? (
            <a
              href={schemaUrl(kind)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
            >
              {kind} JSON Schema
            </a>
          ) : (
            'JSON Schema'
          )}{' '}
          that the Smarter platform publishes.
        </span>
      </p>
    )
  }
  return (
    <div role="status">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700">
        <IconifyIcon icon="lucide:circle-x" className="h-4 w-4" />
        {errors.length} {errors.length === 1 ? 'problem' : 'problems'}: a pull request
        with this file would fail its checks.
      </p>
      <ul className="space-y-1">
        {errors.map((error, index) => (
          <li key={`${error.offset}-${index}`}>
            <button
              type="button"
              onClick={() => onSelect(error)}
              className="w-full rounded px-2 py-1 text-left font-mono text-xs text-red-800 hover:bg-red-50"
            >
              <span className="me-2 rounded bg-red-100 px-1.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider">
                {error.source === 'yaml' ? 'YAML' : 'Schema'}
              </span>
              {error.message}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * A manifest from a GitHub repository, in an editor that checks it as the visitor changes it.
 *
 * @param {object} props
 * @param {object} props.repo - githubRepository() of manifests.js
 * @param {{path: string, kind: string}} props.file - the manifest's path in the repository, and its kind
 * @param {number} [props.maxHeight] - the editor's tallest height, in pixels
 */
const ManifestEditor = ({ repo, file, maxHeight, className }) => {
  const [loadState, setLoadState] = useState('loading')
  const [original, setOriginal] = useState('')
  const [yaml, setYaml] = useState('')
  const [schema, setSchema] = useState(null)
  const [errors, setErrors] = useState([])
  const [checking, setChecking] = useState(true)
  const [copied, setCopied] = useState(false)
  const editorRef = useRef(null)
  const [attempt, setAttempt] = useState(0)

  // the manifest, and its kind's schema
  useEffect(() => {
    let active = true
    setLoadState('loading')
    Promise.all([
      fetchManifest(repo.rawUrl(file.path)),
      fetchSchema(file.kind).catch(() => null),
    ])
      .then(([text, kindSchema]) => {
        if (!active) return
        setOriginal(text)
        setYaml(text)
        setSchema(kindSchema)
        setLoadState('ready')
      })
      .catch(() => active && setLoadState('error'))
    return () => {
      active = false
    }
  }, [repo, file.path, file.kind, attempt])

  // when the visitor pauses typing: the YAML's syntax, then its schema
  useEffect(() => {
    if (loadState !== 'ready') return undefined
    setChecking(true)
    const timer = setTimeout(() => {
      const syntax = syntaxErrors(yaml)
      setErrors(syntax.length || !schema ? syntax : schemaErrors(yaml, schema))
      setChecking(false)
    }, VALIDATE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [yaml, schema, loadState])

  const isDirty = yaml !== original
  const fileName = file.path.split('/').pop()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(yaml)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // a browser that doesn't allow it: nothing to do
    }
  }

  const download = () => {
    const url = URL.createObjectURL(new Blob([yaml], { type: 'application/yaml' }))
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    editorRef.current?.setValue(original)
    setYaml(original)
  }

  const reveal = useCallback((error) => {
    const editor = editorRef.current
    const position = editor?.getModel()?.getPositionAt(error.offset)
    if (!position) return
    editor.revealLineInCenter(position.lineNumber)
    editor.setPosition(position)
    editor.focus()
  }, [])

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-keen-300 bg-white shadow-card',
        className
      )}
      data-testid={`manifest-editor-${file.path}`}
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-keen-200 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <IconifyIcon
            icon="lucide:file-code"
            className="h-4 w-4 shrink-0 text-keen-600"
          />
          <span className="truncate font-mono text-sm text-keen-900" title={file.path}>
            {file.path}
          </span>
          {isDirty && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
              edited
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <ToolButton
            icon="lucide:undo-2"
            label="Undo"
            disabled={!isDirty}
            onClick={() => editorRef.current?.trigger('toolbar', 'undo', null)}
          />
          <ToolButton
            icon="lucide:redo-2"
            label="Redo"
            disabled={loadState !== 'ready'}
            onClick={() => editorRef.current?.trigger('toolbar', 'redo', null)}
          />
          <ToolButton
            icon="lucide:rotate-ccw"
            label="Reset to the file on GitHub"
            disabled={!isDirty}
            onClick={reset}
          />
          <ToolButton
            icon={copied ? 'lucide:check' : 'lucide:copy'}
            label={copied ? 'Copied' : 'Copy'}
            disabled={loadState !== 'ready'}
            onClick={copy}
          />
          <ToolButton
            icon="lucide:download"
            label={`Download ${fileName}`}
            disabled={loadState !== 'ready'}
            onClick={download}
          />
          <ToolButton
            icon="lucide:github"
            label="Open on GitHub: history, blame and pull requests"
            href={repo.pageUrl(file.path)}
          />
        </div>
      </div>

      <div className="relative bg-code-bg">
        {loadState === 'loading' && (
          <div className="flex h-60 items-center justify-center gap-2 text-sm text-code-text/70">
            <IconifyIcon icon="lucide:loader" className="h-4 w-4 animate-spin" />
            Reading {fileName} from GitHub…
          </div>
        )}
        {loadState === 'error' && (
          <div className="flex h-60 flex-col items-center justify-center gap-3 px-6 text-center text-sm text-code-text/80">
            <p>GitHub didn’t answer. The file is still there:</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAttempt((n) => n + 1)}
                className="rounded-full border border-code-text/30 px-4 py-1.5 hover:border-white hover:text-white"
              >
                Try again
              </button>
              <a
                href={repo.pageUrl(file.path)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-code-text/30 px-4 py-1.5 hover:border-white hover:text-white"
              >
                Open on GitHub
              </a>
            </div>
          </div>
        )}
        {loadState === 'ready' && (
          <Suspense fallback={<div className="h-60 bg-code-bg" />}>
            <MonacoYaml
              value={original}
              schema={schema}
              errors={errors}
              onChange={setYaml}
              onMount={(editor) => {
                editorRef.current = editor
              }}
              maxHeight={maxHeight}
            />
          </Suspense>
        )}
      </div>

      <div className="border-t border-keen-200 bg-keen-100 px-4 py-3">
        {loadState === 'ready' ? (
          <Problems
            status={checking ? 'checking' : 'done'}
            errors={errors}
            kind={kindOf(yaml) ?? file.kind}
            isDirty={isDirty}
            onSelect={reveal}
          />
        ) : (
          <p className="text-sm text-keen-600">
            {file.kind} manifest, from{' '}
            <span className="font-mono">{repo.repository}</span>
          </p>
        )}
        {loadState === 'ready' && (
          <p className="mt-2 text-xs text-keen-600">
            Hover over any key to see what it means. Your edits stay in this page; to
            change the real file, propose a pull request on GitHub.
          </p>
        )}
      </div>
    </div>
  )
}
export default ManifestEditor
