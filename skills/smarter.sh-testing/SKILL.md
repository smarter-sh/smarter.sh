---
name: smarter.sh-testing
description: Use when writing, fixing or running smarter.sh's Jest tests (React Testing Library in jsdom), e.g. a test for a new page, component or hook, a failing test after a dependency bump, or a module that Jest can't parse. Covers jest.config.cjs, the mocks (css, images, @iconify/react, fetch), rendering a page with HelmetProvider and MemoryRouter, where tests go, what to assert, and the pitfalls.
---

# smarter.sh Testing

Jest 30 with React Testing Library and `@testing-library/jest-dom`, in jsdom. `yarn test` runs the
whole suite in about 5 seconds; run it after every change. CI runs the same command
(`.github/workflows/test.yml`), and a failure blocks the deploy.

## Where tests go

- Beside the code: `Component.test.jsx` next to `Component.jsx`, `page.test.jsx` in a page folder.
- Site-wide behavior in `src/__tests__/`: `pages.test.jsx` (each page's `<h1>`), `router.test.jsx`,
  `sitemap.test.js`, `navbar.test.jsx`, `consoleWidgets.test.jsx`.

## Setup (`jest.config.cjs`)

- Babel (`babel.config.json`) transforms `.js`/`.jsx`, plus `@smarter.sh/ui-widgets`, an ES module.
- css imports map to `identity-obj-proxy`; images and video to `src/__mocks__/fileMock.js`.
- `@iconify/react` maps to `src/__mocks__/iconify.jsx`, a `<span data-icon="...">`, since the real one
  fetches icons over the network.
- `jest.setup.js` polyfills `TextEncoder` and stubs `global.fetch` with an empty `jest.fn()`.
- `webai/` and `dist/` are ignored.

## Rendering a page

```jsx
const renderPage = (Page, path = '/') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Page />
      </MemoryRouter>
    </HelmetProvider>
  )

beforeEach(() => {
  // the chatbots and GitHub don't answer in tests
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})
```

Pages use `Link`, so they need a router; `PageMetaData` needs `HelmetProvider`.

## What to assert

- Query by role and accessible name (`getByRole('heading', { level: 1, name: ... })`,
  `getByRole('link', { name: 'Privacy policy' })`), as a reader would find it. Use test ids only
  for things with no role, such as the chat preview (`chat-preview-<name>`).
- Assert what the page must say or do, not its markup or classes.
- Something that loads later (a chatbot's config, a manifest from GitHub): `await findBy...`.
- Code that uses `localStorage` must work when it throws (private windows); test that with
  `jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw ... })`, and call
  `localStorage.clear()` in `beforeEach`. See `src/components/CookieNotice.test.jsx`.

## Pitfalls

- **Monaco** doesn't run in jsdom; the manifest editor's tests mock it (see
  `src/components/manifest/*.test.jsx`). Copy their approach.
- **A download through a hidden link** (`link.click()` on a blob url) makes jsdom log
  `Error: Not implemented: navigation`. Stub it with
  `jest.spyOn(HTMLAnchorElement.prototype, 'click')`, assert on the link's `download` and `href`,
  and restore it (see the download test in `ManifestViewer.test.jsx`).
- **AOS and `window.scrollTo`** are no-ops in jsdom; `AppProviders` calls `scrollTo?.()` for that
  reason.
- **A test that passes alone and fails in the suite** usually leaks `fetch` or `localStorage`
  state; reset them in `beforeEach`.
- An invalid `package.json` stops `yarn` from running at all. If every command fails at once, check
  it with `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"`. Dependabot
  merges have broken it before.
