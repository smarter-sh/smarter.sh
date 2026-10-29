---
name: smarter.sh-pages
description: Use when adding, renaming, removing or redirecting a page of smarter.sh, or building a page's layout and sections, e.g. "add a pricing page", "move /cli to /download", "add a section to the platform page". Covers src/routes/pages.js (the one list the router and the sitemap read), src/routes/index.jsx, redirects, PageShell, PageHero, Section, the topic accents, SmartLink, page metadata, llms.txt, the navbar and footer links, and the tests a page needs.
---

# smarter.sh Pages

## Adding a page

1. **Folder:** `src/app/pages/<page>/page.jsx`, default-exporting the page. Put its pieces in
   `components/`, and long text, lists and tables in `data.js`, as the newer pages do.
2. **`src/routes/pages.js`:** add `{ path, name, page }`. `page` is the folder under
   `src/app/pages`. `sitemap: false` leaves it out of the sitemap (e.g. `/home`, a duplicate of `/`).
   The file is plain JavaScript without JSX because `vite.config.js` imports it in Node to write
   `sitemap.xml`.
3. **`src/routes/index.jsx`:** add the page's `lazy(() => import(...))` to `components`, keyed by the
   same `page` value. `sitemap.test.js` fails when a route is in one list and not the other.
4. **Links:** add it to the navbar (`navLinks` in `src/components/TopNavbar.jsx`) or the footer
   (`footerLinks` in `src/components/SiteFooter.jsx`) if it should be found, and to
   `public/llms.txt` under the right audience.
5. **Test:** add the page to `src/__tests__/pages.test.jsx` (its `<h1>` at least), or give it its own
   `page.test.jsx` beside it when it has behavior worth testing.

Unknown urls go to the home page (`<Route path="*">` in `router.jsx`), so a missing route doesn't
show an error. Check the page by its url in `yarn start`, not by assuming.

## Renaming or removing a page

Add the old path to `redirects` in `pages.js` (`{ path, to }`), with and without a trailing slash if
it was ever linked that way (see `/privacy-policy`). Other Smarter sites link here, e.g. the web
console's footer links to `https://smarter.sh/privacy-policy/`; search the smarter repository
before dropping a redirect.

## Building the page

```jsx
import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'

const Pricing = () => (
  <PageShell title="Pricing" description="One sentence for search results and link previews.">
    <PageHero ... />
    <Section id="plans" eyebrow="Plans" title="..." intro="..." accent="sky" glow>
      ...
    </Section>
  </PageShell>
)
```

- `PageShell` gives the metadata (`<title>Smarter | ...</title>` and the description, through
  `PageMetaData` and react-helmet-async), the navbar and the footer. Use it for every new page.
  Older pages (legal, about) assemble these by hand; don't copy them.
- `Section` is a page section with an optional eyebrow, title and intro, and the AOS fade.
- **Accents** (`src/helpers/accent.js`): each topic keeps one color everywhere: `primary` (Smarter
  itself), `sky` (governance), `amber` (developers), `emerald` (education), `violet` (extensibility),
  `teal` (operations). Use `accent(name).text`, `.soft`, `.border`, ... Never build a Tailwind class
  from a variable (`text-${color}-600`): Tailwind only keeps classes it finds spelled out.
- Other blocks in `src/components/site/`: `Button` (primary/secondary, internal or external),
  `FeatureCard`, `ConsoleCard`, `CtaBand`, `SmartLink`.
- Colors: `keen-*` grays match the web console (900 headings, 700 body, 600 muted, 300 borders);
  `primary` is the brand orange.
- The navbar is fixed and 6rem tall: anchors need `scroll-mt-28` or similar so a `/#section` link
  isn't hidden under it. `AppProviders` scrolls to the hash on navigation.
- Static pages whose text lives on the CDN (privacy, tos) use `StaticCdnPage`; their source text is
  uploaded to S3 by hand (see the README.md in those folders).
