// Pre-renders every page of the site into dist/, after `vite build` (the browser's bundle) and
// `vite build --ssr src/entry-server.jsx --outDir dist-ssr` (the same app, for Node). yarn build runs
// all three. See src/routes/prerender.js for why, and for the layout of the files it writes.
//
// usage: node scripts/prerender.mjs
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { assemble, outputFile, prerenderPaths } from '../src/routes/prerender.js'

const DIST = 'dist'
const SERVER = 'dist-ssr/entry-server.js'

const template = fs.readFileSync(`${DIST}/index.html`, 'utf8')
const { render } = await import(pathToFileURL(path.resolve(SERVER)).href)

for (const page of prerenderPaths()) {
  const html = assemble(template, await render(page), page)
  const file = path.join(DIST, outputFile(page))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  console.log(`prerender: ${page} -> ${file} (${(html.length / 1024).toFixed(0)} kB)`)
}
fs.rmSync('dist-ssr', { recursive: true, force: true })
