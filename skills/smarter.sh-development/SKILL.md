---
name: smarter.sh-development
description: Start here for any change to smarter.sh, the marketing website of The Smarter Project (React 19, Vite, Tailwind CSS v3, Jest), e.g. a page, a section, a component, a style, a test, a dependency or the deploy pipeline. Gives the non-negotiable rules, the repository map, the commands, how a merge to main reaches production, and an index of the narrower smarter.sh-* skills to load for each kind of work.
---

# smarter.sh Development

smarter.sh is the marketing website of The Smarter Project: a single-page React app, built
with Vite and styled with Tailwind CSS v3, served from an AWS S3 bucket behind CloudFront. It
explains the Smarter platform (github.com/smarter-sh/smarter) to decision makers, educators and
developers, and shows the platform's own pieces live: the web console's dashboard widgets
(`@smarter.sh/ui-widgets`), deployed Smarter chatbots (`@smarter.sh/ui-chat`'s embed script) and
real manifests from GitHub in a Monaco editor.

## Non-negotiable rules

1. **Never run git write commands.** "Write a git commit" means print the command as text. Never
   run `git commit`, `git add`, `git reset`, `git restore`, `git stash` or `git push`;
   `.claude/settings.local.json` denies them too. See `smarter.sh-git-commits`.
2. **Run the tests yourself** (`yarn test`, about 5 seconds) after every change, and report
   failures honestly, including ones that were there before.
3. **A page is added in `src/routes/pages.js`**, which both the router and the sitemap read, and
   in `src/routes/index.jsx`. Never add a `<Route>` by hand. See `smarter.sh-pages`.
4. **Tailwind stays on v3.** `tailwind.config.js` and the PostCSS setup are v3's. Dependabot
   proposes v4; that upgrade broke the build once (`fix(deps): pin tailwindcss to v3`). Decline it
   unless the user asks for the migration.
5. **The Keen theme applies only inside `.keen`.** Never hand-edit `public/keen/style.scoped.css`,
   and never load the console's stylesheet unscoped. See `smarter.sh-console-widgets`.
6. **Phones first.** Every page works at 375px wide with a 16px gutter (`container` has it) and no
   horizontal scroll. Check new layouts at phone width.
7. **This repository is public.** No secrets, AWS account ids, private hostnames or customer data.
   The chatbots' urls and api keys in `src/common/chatbots.js` are public by design (they are in
   every page anyway).
8. **A merge to main is a production deploy.** Work happens on `alpha`; don't push or merge for the
   user.

## Repository map

| Path                                       | Contents                                                                         |
| ------------------------------------------ | -------------------------------------------------------------------------------- | --- | -------- | ------------------------------------------------------------------------- |
| `src/routes/pages.js`                      | Every page and redirect: the one list the router and the sitemap are built from  |
| `src/routes/index.jsx`                     | Each page's lazily loaded component, by its folder in `src/app/pages`            |
| `src/app/pages/<page>/page.jsx`            | One folder per page, with its `components/`, `data.js` and css                   |
| `src/app/pages/case-studies/`              | The teaching cases, and their shared components (`components/Teaching.jsx`)      |
| `src/components/site/`                     | The site's building blocks: PageShell, PageHero, Section, Button, SmartLink, ... |
| `src/components/manifest/`                 | The manifest editor (Monaco + JSON Schema validation), reading from GitHub       |
| `src/components/wrappers/AppProviders.jsx` | What wraps every page: Helmet, AOS, scroll restoration, BackToTop, CookieNotice  |
| `src/common/`                              | Site constants (`constants.js`), chatbots (`chatbots.js`), architecture trees    |
| `src/helpers/accent.js`                    | The topic colors; every class spelled out so Tailwind keeps it                   |
| `src/__tests__/`                           | Site-wide tests (pages, router, sitemap, navbar, console widgets)                |
| `public/llms.txt`                          | The site's summary for LLMs; list new pages here                                 |
| `keen/`                                    | The scoping and purging scripts for the console's Keen stylesheet                |
| `release.js`, `.github/workflows/`         | Build and deploy (see below)                                                     |
| `mail/`                                    | Email for @smarter.sh: SES receiving, a Lambda forwarder, Terraform (README.md)  |     | `webai/` | Gitignored local copy of the theme the site started from. Reference only. |

`@/` is an alias of `src/` (vite.config.js and jest.config.cjs).

## Commands

```console
yarn test            # Jest, the whole suite
yarn start           # vite dev server on localhost:5173, with the chatbot proxy
npx vite build       # check that it builds (yarn build also purges the Keen css)
npx prettier --write <files>
```

`yarn lint` runs ESLint, but `eslint.config.js` only matches `*.ts`/`*.tsx`, so it skips every
`.jsx` file in the site and reports "File ignored". Prettier (`package.json` "prettier": no
semicolons, single quotes, 90 columns) is the formatting standard. Run it on the files you changed.

## How a change reaches production

`.github/workflows/`: `test.yml` runs `yarn test` on pull requests to main. `pushMain.yml`, on a
merge to main, runs the tests again, then semantic-release (`.releaserc`, versioned by the commit
types), then `build.yml` (`make build`), then `release.yml` (`release.js --skip-build`: sync
`dist/` to the branch's S3 bucket and invalidate CloudFront), then merges main back into alpha and
beta. `release.yml` can also be run by hand to deploy alpha or beta.

## Conventions

- **Pattern first.** Find the newest page or component that does something similar (the case
  studies and the `src/components/site/` blocks are the newest code) and copy its structure.
- **Comments say why**, in plain sentences, above the component or constant, as the existing code
  does. No commented-out code.
- **Plain, specific copy.** The site's voice is direct and concrete: what Smarter does, for whom,
  with real numbers and real file names. No hype words.
- **Links:** `SmartLink` picks a router `Link` for this site's pages, and a new tab for other sites.
  Site-wide urls (docs, GitHub, blog, CDN) are in `src/common/constants.js`; use them.
- **Icons:** `IconifyIcon` from `@/components/wrappers/IconifyIcon`, with lucide names
  (`lucide:shield-check`).

## Narrower skills

| Skill                        | Load it when                                                             |
| ---------------------------- | ------------------------------------------------------------------------ |
| `smarter.sh-pages`           | Adding, renaming, removing or redirecting a page, or building its layout |
| `smarter.sh-case-studies`    | Writing or changing a teaching case under `/case-studies`                |
| `smarter.sh-console-widgets` | Using `@smarter.sh/ui-widgets`, the Keen theme, or `yarn keen`           |
| `smarter.sh-chatbots`        | Embedding a Smarter chatbot, or changing `src/common/chatbots.js`        |
| `smarter.sh-testing`         | Writing or fixing Jest tests                                             |
| `smarter.sh-git-commits`     | Asked to write a commit message                                          |

## Definition of done

- The change follows an existing pattern, and works at phone width.
- `yarn test` passes, with tests for what you added.
- `npx vite build` succeeds.
- Prettier has formatted the changed files.
- Your summary says what changed, what you checked, and what you didn't.
