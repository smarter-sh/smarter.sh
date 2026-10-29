---
name: smarter.sh-git-commits
description: Use whenever the user asks you to "write a git commit" (or a commit message, or the git add) in the smarter.sh repository. Covers the never-execute rule, authorship, the multiple -m command format, conventional-commit types and scopes as commitlint and semantic-release read them, the 72-character header, and how thorough the body must be.
---

# smarter.sh Git Commits

These are the smarter repository's rules (its `smarter-git-commits` skill), applied to this one.

## The rule: write, never execute

"Write a git commit", in any wording or tone, means **output the command as text**. Never run
`git commit`, `git add`, `git reset`, `git restore`, `git stash`, `git push` or `git tag`;
`.claude/settings.local.json` denies them as well. Read-only commands (`git status`, `git diff`,
`git log`) are fine. Don't volunteer commit messages.

## Authorship

You are the author; Lawrence McDaniel is the co-author.

```console
git commit --author="Claude <noreply@anthropic.com>" \
  -m "<type>(<scope>): <subject>" \
  -m "<body paragraph>" \
  -m "<body paragraph or bullet list>" \
  -m "Co-authored-by: Lawrence McDaniel <lpm0073@gmail.com>"
```

- One `-m` per paragraph. No heredoc, no `-F`, no `git add` in the same block.
- No backticks, `$` or `!` inside the double quotes: the user's shell is zsh, where `!` is history
  expansion and aborts the command. Reword instead.
- Never write a CI skip instruction (`[skip ci]` and its variants) anywhere in the message, even to
  describe one. GitHub would start no workflows for the push, and the pull request's required test
  check would wait forever. Only semantic-release's own `chore(release)` commits carry one.
- When asked for the `git add` too, write it as a separate block, listing paths explicitly.

## Header

`<type>(<scope>): <subject>`, checked by commitlint (`commitlint.config.js`:
config-conventional + config-angular) and read by semantic-release (`.releaserc`) to choose the
version. A merge to main deploys whatever version results.

- **type:** `feat`, `fix`, `test`, `docs`, `refactor`, `perf`, `style`, `build`, `ci`, `chore`.
  - `feat` (a minor release) is for something new: a new page, a new case study, a new site-wide
    feature. When in doubt, it's `fix`.
  - `fix` (a patch release) covers bugs and shortcomings of what exists, including copy, layout and
    UX fixes, even when they add a control.
  - `refactor` for restructuring; `style` for formatting only; `chore` for housekeeping and
    dependency pins; `ci` for `.github/`.
  - `chore(release): ...` belongs to semantic-release. Never write it.
- **scope:** the page or area, lower case: `home`, `platform`, `case-studies`, `developers`,
  `site`, `deps`, `ci`, ... It can be omitted for repository-wide changes.
- **subject:** imperative, lower case, no trailing period.
- **length:** 72 characters at most for the whole header (the commitlint hook rejects 73). Measure
  it, and aim for 70:

  ```console
  printf %s "feat(site): add a cookie notice with a link to the privacy policy" | wc -c
  ```

## Body

Written for a reviewer with no context: start with the problem or motivation, then go area by area
(a short heading paragraph per area, then one bullet per change, naming files and components and
saying why), then the tests and what they prove, then the status (anything skipped or known to be
broken).

## Before writing

1. `git status` and `git diff --stat` (and `git diff` on anything unclear), so the message matches
   the working tree.
2. Leave out files that don't belong to the change, and ask if that's unclear.
3. Measure the header.
4. Start the response with a one-line `Written for:` note.
