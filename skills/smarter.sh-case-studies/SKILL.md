---
name: smarter.sh-case-studies
description: Use when writing, extending or fixing a teaching case under smarter.sh/case-studies (src/app/pages/case-studies/<slug>/), e.g. "write a case study on budgets", "add a lab to the guardrails case". Covers what a case is (a lesson built on real, running Smarter code), its files (data.js, page.jsx, components/, page.test.jsx), the shared teaching components in case-studies/components/Teaching.jsx, live chatbots and manifest labs, gathering evidence from the smarter repositories and blog, registering a case, and its tests.
---

# smarter.sh Case Studies

A case study is a teaching case, in the style of a business-school case: a lesson of about 45 to
60 minutes, built on a real, running Smarter project, with learning objectives, numbered parts,
figures, a live chatbot, labs, discussion questions and a reading list. The audience is an
instructor or a technical reader learning a concept (tool calling, tenant isolation, TLS) through
how Smarter does it. Read one existing case end to end before writing a new one; `deploy` and
`api-contract` are the newest.

## Files

```text
src/app/pages/case-studies/<slug>/
├── data.js          # every fact, list, table, code excerpt and link the page shows
├── page.jsx         # the lesson's structure, composed from the shared components
├── components/      # this case's own figures and interactive simulators
└── page.test.jsx    # what the case must teach (see below)
```

Keep prose that carries the lesson in `page.jsx`, and data (objectives, facts, file lists, code
excerpts, questions, reading list, urls) in `data.js`, as the existing cases do.

## Shared components (`../components/Teaching.jsx`)

`Glance` (objectives, facts, duration), `Contents` (the parts), `Part` (a numbered part),
`Callout` (`term`, `idea`, `exercise`, `caution`), `Code`, `CodeBlock` (numbered, captioned,
optional copy), `Steps`, `Table`, `CardGrid`, `Experiments`, `Exercises`, `Commands`,
`Questions`, `ReadingList`, `TextLink`. Sequence figures use `../components/SequenceDiagram.jsx`.
If two cases need the same new block, add it to `Teaching.jsx` with a test in `Teaching.test.jsx`,
rather than copying it.

Live pieces:

- **A chatbot**: `<SmarterChatEmbed bot={chatbots.<name>} />` (see `smarter.sh-chatbots`).
- **Manifests**: `ManifestProvider` around the page with `githubRepository('smarter-sh/...')` and
  the case's `files`; `ManifestLink` in the text; `ManifestLab` for a browsable lab. They read the
  current files from GitHub, so the page never shows a stale copy.

## Evidence

Every claim points at something real: a file in a smarter-sh repository (a `blob/main/...` url
built by a helper such as `sourceFile(path)` in `data.js`), a commit (link to its hash), a blog post
on blog.smarter.sh, or the docs. The local checkouts of the other repositories sit beside this one
(`../smarter`, `../stackademy`, ...). Read the code there, and check that every path and line you
quote still exists on main. Code excerpts in `data.js` are short and copied exactly; say where they
come from.

## Registering a case

1. Add it to `cases` in `src/app/pages/case-studies/page.jsx` (path, icon, eyebrow, title, text,
   topics, duration): that is the index page's card.
2. Add the page to `src/routes/pages.js` (`name: 'Case Study: <title>'`) and `src/routes/index.jsx`
   (see `smarter.sh-pages`), and its slug to the list in `src/__tests__/sitemap.test.js`.
3. Add it to `public/llms.txt`.

## Tests

`page.test.jsx` renders the page in `HelmetProvider` + `MemoryRouter`, with `global.fetch`
rejecting (the chatbot and GitHub don't answer in tests, so the page shows the chat's preview and
the lab's GitHub link). Assert what the case must teach: the `<h1>`, "Learning objectives", each
lab's heading, each figure, and any simulator's behavior with `fireEvent`. See
`deploy/page.test.jsx`.
