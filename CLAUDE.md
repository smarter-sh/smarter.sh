# CLAUDE.md

Guidance for Claude Code (and other coding agents) working in this repository.

smarter.sh is the marketing website of The Smarter Project (github.com/smarter-sh/smarter): a
single-page React 19 app built with Vite, styled with Tailwind CSS v3, tested with Jest, and
deployed to AWS S3 and CloudFront on every merge to main. It shows the platform's own pieces live:
the web console's widgets (`@smarter.sh/ui-widgets`), deployed Smarter chatbots
(`@smarter.sh/ui-chat`), and real manifests from GitHub.

Detailed know-how lives in the Agent Skills under `skills/` (symlinked to `.claude/skills`).
**Load `smarter.sh-development` first for any change.** Its table says which narrower skill covers
each kind of work. This file holds only what applies to nearly every task.

## Hard rules

1. **Never run git write commands.** "Write a git commit" means print the command as text. See
   `smarter.sh-git-commits`.
2. **Run `yarn test` yourself** after every change (about 5 seconds), and report failures honestly.
3. **Pages are declared in `src/routes/pages.js`** (router and sitemap) and
   `src/routes/index.jsx`. See `smarter.sh-pages`.
4. **Tailwind stays on v3.** Decline the v4 upgrade unless asked; it broke the build before.
5. **Keen (the console's theme) applies only inside `.keen`.** Never hand-edit
   `public/keen/style.scoped.css`; regenerate it with `yarn keen`. See `smarter.sh-console-widgets`.
6. **Every page works on a phone**: 375px wide, 16px gutter, no horizontal scroll.
7. **This repository is public.** No secrets, account ids or private hostnames.
8. **A merge to main is a production deploy.** Work happens on `alpha`.

## Commands

```bash
yarn test                        # Jest, the whole suite
yarn start                       # dev server, localhost:5173, with the chatbot proxy
npx vite build                   # check the build (yarn build also purges the Keen css)
npx prettier --write <files>     # the formatting standard
```

ESLint's config only matches `.ts`/`.tsx`, so it skips the site's `.jsx` files. Prettier is the
standard; run it on the files you change.

## Conventions

- **Pattern first.** Copy the structure of the newest similar code: the case studies and
  `src/components/site/`. New pages use `PageShell`.
- **Comments say why**, in plain sentences, above the code they explain.
- **Copy is plain and concrete**: real names, real numbers, no hype.
- **Site-wide urls** come from `src/common/constants.js`; links go through `SmartLink`.
- **Tailwind classes are spelled out in full**, never built from variables (see
  `src/helpers/accent.js`).

## Definition of done

- The change follows an existing pattern, and works at phone width.
- `yarn test` passes, with tests for what you added; `npx vite build` succeeds.
- Prettier has formatted the changed files.
- Skills that describe what you changed are updated in the same change.
- Your summary says what changed, what you checked, and what you skipped.
