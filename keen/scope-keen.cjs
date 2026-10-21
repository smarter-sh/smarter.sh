// Rewrites the Keen theme's compiled stylesheet, which the Smarter web console
// loads on every page, so that every rule applies only inside an element with
// class="keen". :root, html and body become the wrapper itself; everything else
// becomes a descendant of it. The site's own Tailwind design is unaffected, and
// the web console's widgets (@smarter.sh/ui-widgets) look as they do there.
//
// keen/style.bundle.css is the web console's
// smarter/smarter/static/assets/css/style.bundle.css. It isn't served.
//
// usage: yarn keen (node keen/scope-keen.cjs <out.css> <in.css>...): the inputs are
// concatenated, in order, into one scoped stylesheet.
const fs = require('fs')
const postcss = require('postcss')

// :where() adds no specificity, so Keen's rules keep the weight they have in
// the console, and the widgets' own styles.css still overrides them.
const SCOPE = ':where(.keen)'
const scopeSelector = (sel) => {
  const s = sel.trim()
  if (/^(:root|html|body)$/.test(s)) return SCOPE
  const m = s.match(/^(:root|html|body)([\s>[.:].*)$/)
  if (m) return SCOPE + m[2]
  return `${SCOPE} ${s}`
}

const [output, ...inputs] = process.argv.slice(2)
const root = postcss.parse(
  inputs.map((input) => fs.readFileSync(input, 'utf8')).join('\n')
)
root.walkRules((rule) => {
  if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return
  rule.selectors = rule.selectors.map(scopeSelector)
})
fs.writeFileSync(output, root.toString())
