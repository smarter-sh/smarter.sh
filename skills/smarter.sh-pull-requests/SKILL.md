---
name: smarter.sh-pull-requests
description: Use when asked to create, open, write or update a GitHub pull request in the smarter.sh repository, e.g. "create a PR", "open the alpha to main pull request", or "write the PR description". Covers the branches (alpha into main, which deploys to production), the title convention, checking that the commits are pushed, filling in every section of .github/PULL_REQUEST_TEMPLATE.md from the commits' own messages, creating it with gh pr create --body-file, the GitHub token in .env, and what never to do (push, merge, or leave the template's placeholders in).
---

# smarter.sh Pull Requests

These are the smarter repository's rules (its `smarter-pull-requests` skill), applied to this one.
Every pull request uses the template in
[.github/PULL_REQUEST_TEMPLATE.md](../../.github/PULL_REQUEST_TEMPLATE.md). GitHub pre-fills it in
the browser, but `gh pr create --body-file` does not: fill in every section, from the commits
themselves.

## Rules

- **Create one only when asked.** A pull request is public, and notifies people.
- **Never push, merge, or change a branch.** The user pushes; `.claude/settings.local.json` denies
  `git push` anyway. `gh pr create` only opens a pull request for commits already on GitHub. Check
  first (below); if the local branch is ahead of its remote, don't attempt the push or the pull
  request. Tell the user, in one line, that `git push origin alpha` is needed, have the
  description ready in a file, and give them the `gh pr create` command, so the pull request is
  one step away.
- **A merge to main is a production deploy** (`pushMain.yml`: release, build, sync to S3,
  invalidate CloudFront). Say so at the end of the description.
- **Never leave a placeholder.** Each section gets real content, or a plain "None.".
- **The repository is public.** No credentials, account ids, private hostnames or personal details.
- **No bare `@name`** for anything but a real GitHub login you mean to notify.
- **No CI skip instruction**, not even to describe one (see `smarter.sh-git-commits`): the pull
  request's required test check would wait forever.

## Branches and title

- The usual pull request is **`alpha` into `main`**. Its title is the subject of its most important
  commit, as in the past ones: `feat(plugins): add a plugins page with the six no-code plugins`,
  `fix(home): shorten the video panel's title and subtitle`. When several commits matter equally,
  name the two most important, and keep it under about 100 characters.
- Check that there isn't one open already:
  `gh pr list --repo smarter-sh/smarter.sh --head alpha --state open`. If there is, update its
  description (`gh pr edit <number> --body-file ...`) rather than open another.

## Gather the material

```bash
git fetch origin main alpha
git status -sb                                         # "ahead N"? then the user must push first
git log --oneline origin/main..origin/alpha            # the commits
git log --format='### %h %s%n%n%b' origin/main..origin/alpha   # their full messages
git diff --stat origin/main...origin/alpha | tail -1   # files, additions, deletions
```

Leave out `chore(release): ...` commits (semantic-release's) and merge commits. Build the
description from every commit's body, never from memory. For each issue a commit names, check its
state: `gh issue view <n> --repo smarter-sh/smarter.sh --json state,title`.

## Fill in the template

Keep the template's headings and order, `# Pull Request Template` included, and drop its
`<!-- ... -->` hints and `_placeholder_` lines.

- **Type of Change:** check (`- [x]`) each box a commit's type earns: `feat` New feature, `fix` Bug
  fix, `docs` Documentation, `refactor` Refactor, `ci`/`build`/`chore`/`test`/`style` Chore.
- **Resolves:** one `- Fixes #<n>` per issue. Without an issue, say none was filed and list each
  problem or need the pull request answers, in a sentence, with its commit's short hash.
- **Changes:** one or two sentences on the whole, then a `###` subsection per commit, most important
  first, titled with its subject and short hash. Condense the body into bullets that name pages,
  components and files.
- **Testing:** what the commits report (`yarn test` counts, `npx vite build`, Prettier, screenshots
  at phone width), and what still needs testing, e.g. not checked by hand in a browser. Never claim
  a check that no commit reports.
- **Screenshots:** for a visible change, the page's url and how to see it locally
  (`yarn start`, http://localhost:5173/...), or screenshots if you took them. Otherwise
  `None: no visible change.`
- **Dependencies:** new or changed npm packages, environment variables, or pull requests that must
  merge first. Otherwise `None.`
- **Breaking Changes:** removed or renamed pages (and whether `redirects` in `src/routes/pages.js`
  covers them), changed urls that other Smarter sites link to, deploy changes. Otherwise `None.`

End with `Merging this deploys to production.`, then the attribution line from the conversation's
system context, if there is one, e.g. `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Create it

Write the description to a file in your scratchpad, not inline: backticks, `$` and `#` break shell
quoting.

```bash
export GH_TOKEN=$(grep -E '^GH_TOKEN=' .env | cut -d= -f2- | tr -d '"')   # when gh says 401
gh pr create --repo smarter-sh/smarter.sh --base main --head alpha \
  --title "<main commit's subject>" --body-file <scratchpad>/pr-body.md
```

Give the user the pull request's url, and say what you left out or couldn't verify.
