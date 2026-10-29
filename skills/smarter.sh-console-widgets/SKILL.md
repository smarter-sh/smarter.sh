---
name: smarter.sh-console-widgets
description: Use when a smarter.sh page shows the Smarter web console's widgets from @smarter.sh/ui-widgets (ResourceTree, Cli, WhatsNew, SelfHost, Extensions, Instructors, ...), uses Keen theme or Bootstrap classes, or when the Keen stylesheet must be regenerated (yarn keen) or purged (keen/purge-keen.mjs), e.g. after upgrading ui-widgets or when a widget looks unstyled. Covers the .keen scope, ConsoleWidgets, the PurgeCSS safelist, the Jest setup for the package, and the home page's console dashboard.
---

# smarter.sh Console Widgets

The site shows pieces of the Smarter web console as they look there: the dashboard widgets of
`@smarter.sh/ui-widgets` (published from the smarter repository), styled by the console's Keen
theme (Bootstrap 5). The site's own design is Tailwind. The two never meet because Keen applies
only inside an element with `class="keen"`.

## How the scope works

- `keen/style.bundle.css` is a copy of the console's
  `smarter/smarter/static/assets/css/style.bundle.css`, plus `keen/keenicons-outline.css`.
- `yarn keen` runs `keen/scope-keen.cjs`, which rewrites every rule under `:where(.keen)` (no added
  specificity, so the widgets' own css still wins) and writes `public/keen/style.scoped.css`.
  `:root`, `html` and `body` become the wrapper itself. `index.html` loads that file.
- `yarn build` runs `keen/purge-keen.mjs` after `vite build`, which removes from `dist/` every Keen
  rule whose class isn't in the built JS or HTML (the theme is about 1.9 MB, render blocking).
- Never hand-edit `public/keen/style.scoped.css`. Update `keen/style.bundle.css` from the console and
  run `yarn keen`.

## Using a widget

```jsx
import { Cli as CliWidget } from '@smarter.sh/ui-widgets'
import ConsoleWidgets from '@/components/site/ConsoleWidgets'

const Download = () => (
  <ConsoleWidgets rowClassName="justify-content-center">
    <CliWidget className="col-xl-6" />
  </ConsoleWidgets>
)
```

`ConsoleWidgets` is the `.keen` wrapper plus a Bootstrap row; its children are Bootstrap columns.
A widget outside a `.keen` wrapper renders unstyled; `src/__tests__/consoleWidgets.test.jsx` checks
this for every page that uses one. Add new pages there.

## Gotchas

- **Classes built at run time get purged.** PurgeCSS only keeps class names it finds written out.
  When a component builds a Keen class from a variable (`btn-light-${tone}` in `ConsoleCard.jsx`,
  `ki-${icon}` in the architecture trees), add it to the safelist in `keen/purge-keen.mjs`.
  The dev server doesn't purge, so this bug only shows in a build: check with
  `yarn build && yarn preview`.
- **Jest:** the package is an ES module, so `jest.config.cjs` lets Babel transform it
  (`transformIgnorePatterns`) and maps its css import to `identity-obj-proxy`. Keep both when
  changing the Jest config.
- **The home page** (`src/app/pages/home/`) is laid out as the console's dashboard, with Keen cards
  and its own `home.css` (every class prefixed `home-`, using Keen's css variables). Change it in
  that style, not in Tailwind.
- **Upgrading `@smarter.sh/ui-widgets`:** read its changelog in the smarter repository, run the
  tests, then build and look at each page that uses a widget (`grep -rn "ui-widgets" src`), since a
  widget may use Keen classes the safelist doesn't know.
