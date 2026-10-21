/*
 * A Monaco YAML editor for a Smarter manifest, with the web console's manifest editor's look and options
 * (smarter-manifest-editor's ManifestEditor component), the site's code panel color, the manifest's errors
 * marked in the text, and a hover over any key that explains it, from the kind's JSON Schema: what the
 * Smarter Manifest extension for VS Code does too.
 *
 * ManifestEditor.jsx loads this module lazily, and @monaco-editor/react loads Monaco itself from jsDelivr,
 * so that a page only downloads the editor when a visitor opens a manifest.
 */
import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { describePath, pathAt, splitDescription, yamlKeys } from './validation'

const THEME = 'smarter-site-manifest'
const BACKGROUND = '#1e1e2e' // tailwind's code.bg, the site's code panels
const FOREGROUND = '#cdd6f4'
const MARKER_OWNER = 'smarter-manifest'
const MIN_HEIGHT = 240

// each editor's model's JSON Schema, by its uri, for the one hover provider that all of a page's editors share.
const schemas = new Map()
let hoverProvider = null

const registerHover = (monaco) => {
  if (hoverProvider) return
  hoverProvider = monaco.languages.registerHoverProvider('yaml', {
    provideHover(model, position) {
      const schema = schemas.get(model.uri.toString())
      if (!schema) return null
      const path = pathAt(yamlKeys(model.getValue()), model.getOffsetAt(position))
      const found = path && describePath(schema, path)
      if (!found) return null
      const { type, text } = splitDescription(found.description)
      return {
        contents: [
          { value: `**${path[path.length - 1]}**${type ? ` · \`${type}\`` : ''}` },
          { value: text },
          { value: `_${path.join('.')}_` },
        ],
      }
    },
  })
}

const defineTheme = (monaco) => {
  monaco.editor.defineTheme(THEME, {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: FOREGROUND.slice(1) }],
    colors: {
      'editor.background': BACKGROUND,
      'editor.foreground': FOREGROUND,
      'editorGutter.background': BACKGROUND,
    },
  })
}

const MonacoYaml = ({ value, schema, errors, onChange, onMount, maxHeight = 560 }) => {
  const [editor, setEditor] = useState(null)
  const [monaco, setMonaco] = useState(null)
  const [height, setHeight] = useState(MIN_HEIGHT)

  // the schema that explains this editor's keys
  useEffect(() => {
    const uri = editor?.getModel()?.uri.toString()
    if (!uri) return undefined
    if (schema) schemas.set(uri, schema)
    return () => schemas.delete(uri)
  }, [editor, schema])

  // mark each error, from its position to the end of its line
  useEffect(() => {
    const model = editor?.getModel()
    if (!model || !monaco) return
    monaco.editor.setModelMarkers(
      model,
      MARKER_OWNER,
      errors.map((error) => {
        const position = model.getPositionAt(error.offset)
        return {
          severity: monaco.MarkerSeverity.Error,
          message: error.message,
          source: error.source === 'yaml' ? 'YAML' : 'JSON Schema',
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: model.getLineMaxColumn(position.lineNumber),
        }
      })
    )
  }, [editor, monaco, errors])

  const fit = (contentHeight) =>
    setHeight(Math.max(MIN_HEIGHT, Math.min(contentHeight, maxHeight)))

  return (
    <Editor
      height={`${height}px`}
      defaultLanguage="yaml"
      theme={THEME}
      value={value}
      beforeMount={defineTheme}
      onMount={(instance, monacoInstance) => {
        registerHover(monacoInstance)
        setMonaco(monacoInstance)
        setEditor(instance)
        fit(instance.getContentHeight())
        instance.onDidContentSizeChange((e) => fit(e.contentHeight))
        onMount?.(instance)
      }}
      onChange={(next) => onChange(next ?? '')}
      loading={<div className="h-60 w-full bg-code-bg" />}
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        fontFamily: '"Fira Code", "JetBrains Mono", Consolas, Monaco, monospace',
        lineHeight: 21,
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        padding: { top: 14, bottom: 14 },
        renderLineHighlight: 'none',
        tabSize: 2,
        hover: { delay: 250 },
        fixedOverflowWidgets: true,
      }}
    />
  )
}
export default MonacoYaml
