// Removes the rules of the Keen stylesheet that the built site doesn't use, from the build's copy,
// dist/keen/style.scoped.css. yarn build runs it after vite build, so every release ships it.
//
// The stylesheet is the web console's whole theme (about 1.9 MB) and every page loads it, render
// blocking. PurgeCSS keeps the rules whose classes appear in the built JavaScript and HTML, which
// include the console widgets' (@smarter.sh/ui-widgets is bundled). Classes that are assembled at
// run time, such as `btn-light-${tone}` in src/components/site/ConsoleCard.jsx, are kept by the
// safelist below: add to it when a component builds a Keen class name from a variable.
//
// usage: node keen/purge-keen.mjs (after vite build)
import fs from 'node:fs'
import { PurgeCSS } from 'purgecss'

const DIST = 'dist'
const CSS = `${DIST}/keen/style.scoped.css`
const TONES = 'primary|success|info|warning|danger'

const before = fs.statSync(CSS).size
const [result] = await new PurgeCSS().purge({
  content: [`${DIST}/index.html`, `${DIST}/assets/**/*.js`],
  css: [CSS],
  safelist: {
    standard: [
      new RegExp(`^(btn-light|bg-light|bg|text|badge-light|btn)-(${TONES})$`),
      /^symbol-\d+px$/,
      'keen',
    ],
    // the theme's light and dark modes, which pages and widgets set with data-bs-theme
    greedy: [/data-bs-theme/],
  },
  variables: false,
  keyframes: false,
  fontFace: false,
})
fs.writeFileSync(CSS, result.css)
const after = fs.statSync(CSS).size
console.log(
  `purge-keen: ${CSS} ${(before / 1024).toFixed(0)} kB -> ${(after / 1024).toFixed(0)} kB`
)
