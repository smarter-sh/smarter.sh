# smarter.sh Agent Skills

This folder holds the [Agent Skills](https://agentskills.io/specification) for working on
smarter.sh, the marketing website of The Smarter Project, with an AI coding agent such as Claude
Code. They follow the same layout and rules as the skills of the Smarter platform
([smarter-sh/smarter/skills](https://github.com/smarter-sh/smarter/tree/main/skills)), whose
README explains what skills are, when to add one, and how to review a change to one.

A skill is a folder with a `SKILL.md`: YAML frontmatter (`name`, `description`) and instructions
that an agent loads only when a task matches the description. Claude Code finds them through the
symlink `.claude/skills -> ../skills`.

## What's here

Start with `smarter.sh-development`. It holds the rules that apply to every change, and its table
says which narrower skill to load.

| Skill                        | Use it when                                                       |
| ---------------------------- | ----------------------------------------------------------------- |
| `smarter.sh-development`     | You're making any change. Start here.                             |
| `smarter.sh-pages`           | You're adding, renaming or redirecting a page, or laying one out. |
| `smarter.sh-case-studies`    | You're writing or changing a teaching case under `/case-studies`. |
| `smarter.sh-console-widgets` | You're using `@smarter.sh/ui-widgets` or the Keen theme.          |
| `smarter.sh-chatbots`        | You're embedding a Smarter chatbot or changing `chatbots.js`.     |
| `smarter.sh-testing`         | You're writing or fixing Jest tests.                              |
| `smarter.sh-git-commits`     | You've been asked to write a commit message.                      |

## Keeping them current

A skill that describes an old pattern is worse than none: the agent follows it confidently. When a
change alters something a skill describes (a file path, a component, a script, a command), update
the skill in the same pull request. Prefer editing an existing skill to adding a new one, and add
any new one to the table above and to the index in `smarter.sh-development/SKILL.md`.

This repository is public: never put secrets, account ids or private hostnames in a skill.
