import { BLOG, DOCS } from '@/common/constants'

const GITHUB = 'https://github.com/smarter-sh/smarter'
export const REPO = GITHUB
export const repoFile = (path) => `${GITHUB}/blob/main/${path}`
export const repoTree = (path) => `${GITHUB}/tree/main/${path}`
export const commit = (sha) => `${GITHUB}/commit/${sha}`

// The three-part series that this case is based on, and the posts beside it.
export const PART_1 = `${BLOG}2026/10/10/claude-code-large-django-codebase/`
export const PART_2 = `${BLOG}2026/10/11/blog-prologue-geometric-series/`
export const PART_3 = `${BLOG}2026/10/17/claude-code-data-sources/`
export const CICD_POST = `${BLOG}2026/08/27/cicd-github-actions-semantic-release/`
export const SIX_USES_POST = `${BLOG}2026/10/23/claude-code-six-uses/`
export const STACK_POST = `${BLOG}2026/06/30/demystifying-the-ai-coding-stack-ai-harnesses-vs-the-smarter-project/`
export const AGENTIC_DOCS = `${DOCS}/en/latest/smarter-framework/developer-reference/agentic-development.html`

export const objectives = [
  'Explain why an AI coding agent multiplies whatever it finds in a codebase, good or bad, and what “converge” and “diverge” mean here.',
  'Name the five properties of a codebase that kept Smarter’s agent on course, and say what each one gives the agent.',
  'Distinguish guidance from feedback, and explain why the sources an agent uses most are the ones that can tell it no.',
  'Recognize the antipattern of a second way to do things, and measure it across release tags with git.',
  'Fix a spreading pattern in four steps: name it, fix every copy, write the rule, add a guard.',
  'Read a CLAUDE.md file and an Agent Skill, and predict what an agent will do with them.',
  'Explain why guard rails for an agent belong in the environment and the written rules, not in a person’s attention.',
]

export const facts = [
  ['Organization', 'The Smarter Project, an open source community'],
  ['The question', '“Can an agent build a road map without wrecking the codebase?”'],
  ['The codebase', 'About 240,000 lines of Python, 21 Django apps, 5,300 tests'],
  ['The agent', 'Claude Code, given about 20 prompts of 1 to 4 hours each'],
  ['The result', '19 minor and 45 patch releases in 18 days'],
  ['The pace', 'About 25 times the author’s long-run pace'],
  ['The guidance', 'A short CLAUDE.md, Agent Skills, tests and linters'],
  ['The evidence', 'git history, git blame and 237 session transcripts'],
]

// Part 1's two series.
export const series = [
  {
    icon: 'lucide:arrow-down-to-line',
    title: 'Telescopic: the codebase converges',
    text: 'In a telescoping sum, each term cancels most of the one before, and the total stays bounded. Each change the agent makes is checked by tests, framed by types, shaped by an existing pattern, so its errors cancel before they spread.',
  },
  {
    icon: 'lucide:trending-up',
    title: 'Geometric: the codebase diverges',
    text: 'In a geometric series with a ratio above one, each term is the last one multiplied. The agent copies an inconsistency, then copies its own copy, and invents what’s missing. At human speed that takes years. At agent speed, weeks.',
  },
]

// git blame, October 17, from Part 1: the share of each layer's non-test lines written by Claude Code.
export const layers = [
  ['smarter.common', 'about 8,700', '11%', 'subsystem'],
  ['smarter.lib', 'about 24,500', '18%', 'subsystem'],
  ['smarter.apps.account', 'about 15,900', '8%', 'subsystem'],
  ['smarter.apps.secret', 'about 4,300', '7%', 'subsystem'],
  ['smarter.apps.llmhost', 'about 9,200', '82%', 'application'],
  ['smarter.apps.infrastructure', 'about 5,400', '80%', 'application'],
  ['smarter.apps.guardrail', 'about 5,400', '57%', 'application'],
  ['smarter.apps.mcpserver', 'about 2,600', '100%', 'application'],
]

export const factors = [
  {
    icon: 'lucide:flask-conical',
    title: '1. Unit tests',
    text: 'Tests make “correct” concrete: a failure says what’s wrong and where, a pass says stop. They’re also executable examples of how a resource is created, applied and cleaned up. Coverage went from about 75% to about 97%.',
  },
  {
    icon: 'lucide:book-open',
    title: '2. Documentation',
    text: 'Docstrings answer local questions and act as each function’s contract. Narrative docs say what the project values. Architecture decision records are its law: “all CRUD operations go through manifests” forbids a second way.',
  },
  {
    icon: 'lucide:code',
    title: '3. High-quality source code',
    text: 'Type annotations remove the agent’s biggest source of guesswork, and about two dozen pre-commit hooks reject a bad change mechanically. Consistent patterns let you say “build it like this one”.',
  },
  {
    icon: 'lucide:messages-square',
    title: '4. Good prompts, and Skills',
    text: 'Each prompt was one coherent unit of work that says what done looks like and that the agent can verify alone. Agent Skills hold the project’s know-how, loaded only when a task needs it.',
  },
  {
    icon: 'lucide:container',
    title: '5. An environment the agent can run',
    text: 'Docker Compose runs the whole platform locally. The agent syncs its edits into the containers and runs the tests and linters itself, after every change, without asking anyone.',
  },
]

// The coverage campaigns of the first week, from Part 1.
export const bugHunt = [
  '23 bugs found raising the framework code, smarter.common and smarter.lib, to 90% coverage',
  '13 account and LLMClient bugs found raising the account app to 91%',
  '9 API and CLI bugs found raising the API app to 93%',
  '71 tests marked as expected failures, each a known bug nobody had fixed: all fixed',
]

// Part 3: the share of the 94 code-changing sessions that used each source at least once.
export const reach = [
  ['Searching the existing code', 'Guidance', '99%'],
  ['Running the unit tests', 'Feedback', '97%'],
  ['Reading test modules', 'Guidance', '95%'],
  ['Pre-commit hooks', 'Feedback', '93%'],
  ['The Docker runtime', 'Feedback', '93%'],
  ['Reading the existing source code', 'Guidance', '92%'],
  ['Skills', 'Guidance', '80%'],
  ['git log, git show and git blame', 'Guidance', '73%'],
  ['The Sphinx docs source', 'Guidance', '61%'],
  ['Architecture decision records', 'Guidance', '10%'],
  ['Web search and web pages', 'Guidance', '5%'],
]

// Part 1: the agent's loop, and the outer arc that a codebase adds.
export const innerLoop = [
  'Gather context: search the code, read two or three existing implementations, load the skill for the task.',
  'Act: write the change, its tests and its documentation.',
  'Verify: sync the change into the containers, run the tests and the pre-commit hooks, read the result.',
  'Fix, and verify again, until everything is green.',
  'Write the lesson down: a skill, a rule in CLAUDE.md, or a test, so that the next agent finds it.',
]

// Part 2: the hand-rolled cache's fingerprint, just before the fix.
export const CACHE_KEY_CODE = `def cache_key(self, search_params: dict[str, Any]) -> str:
    """Return a cache key that is unique to the plugin, and the search parameters."""
    plugin_data = self.plugin_data
    payload = json.dumps(
        {"plugin_data": plugin_data.pk if plugin_data else None, **search_params}, sort_keys=True, default=str
    )
    return f"{CACHE_KEY_PREFIX}:{hashlib.sha256(payload.encode('utf-8')).hexdigest()}"`

// skills/smarter-development/SKILL.md, hard rule 7, as it reads today.
export const CACHE_RULE = `7. **Long-lived caching goes through \`@cache_results\`.** For anything cached
   for 600 seconds or longer, use \`from cache_results import cache_results\`.
   Never hand-roll \`cache.get()\`/\`cache.set()\` with \`django.core.cache\`. See
   [Caching](#caching).`

export const fixSteps = [
  {
    title: 'Name the pattern, not the instance',
    text: '“The ImageSearchPlugin shows the same cat” is a bug. “Plugins hand-roll their caches” is a pattern, and naming it tells you where all its copies are.',
  },
  {
    title: 'Fix every copy, in one change',
    text: 'One commit moved the MCPClient catalog, the WebsearchPlugin, the ImageSearchPlugin, the SkillPlugin, the semantic guardrail and the service health check onto @cache_results: 59 files. A copy left behind is next week’s example.',
  },
  {
    title: 'Write the rule where the agent reads it before it starts',
    text: 'The same commit added a hard rule to smarter-development, the skill the agent loads first, with its reasons and its exceptions. A rule without a reason gets reasoned around.',
  },
  {
    title: 'Add a mechanical guard where you can',
    text: 'A written rule is read by an agent that remembers to read it. A test runs whether anyone remembers or not. Part 2 proposed one for caching: no module outside lazy_cache and one management command imports django.core.cache. It admitted that the test didn’t exist yet.',
  },
]

// Lab 2: run on the smarter repository on October 28, 2026, at each minor release tag.
export const measured = [
  { tag: 'v0.14', handRolled: 4, helper: 100 },
  { tag: 'v0.15', handRolled: 7, helper: 129 },
  { tag: 'v0.16', handRolled: 7, helper: 132 },
  { tag: 'v0.17', handRolled: 7, helper: 132 },
  { tag: 'v0.18', handRolled: 8, helper: 133 },
  { tag: 'v0.19', handRolled: 9, helper: 135 },
  { tag: 'v0.20', handRolled: 9, helper: 135 },
  { tag: 'v0.21', handRolled: 2, helper: 147 },
  { tag: 'v0.37', handRolled: 2, helper: 145 },
]

export const CLONE = `git clone https://github.com/smarter-sh/smarter.git
cd smarter`

export const MEASURE = `for ref in $(git tag --sort=creatordate | grep -E '^v[0-9]+\\.[0-9]+\\.0$') HEAD; do
  printf '%s %s hand-rolled=%s helper=%s\\n' "$ref" \\
    "$(git log -1 --format=%ad --date=short "$ref")" \\
    "$(git grep -l -E '(^|[^a-z_])cache\\.(get|set)\\(' "$ref" -- 'smarter/smarter/apps/*.py' ':!*/tests/*' | wc -l)" \\
    "$(git grep -h 'cache_results(' "$ref" -- 'smarter/smarter/*.py' ':!*/tests/*' | wc -l)"
done`

export const COMMIT_BODIES = `git log -1 --format=%B eeb7a7a19
git log --since=2026-09-28 --format='%h %s' -- skills/ | head -20`

export const measureExercises = [
  {
    title: 'Reproduce the curve',
    text: 'Run the loop. Your numbers for hand-rolled files should match Figure 2. Find the release where they jump, and the one where they drop.',
  },
  {
    title: 'Read the fix',
    text: 'Run the first command of the second block. Find the four steps of Part 8 in the commit body.',
  },
  {
    title: 'Watch the rules change',
    text: 'Run the second command. How many recent commits changed a skill? Pick one, and run git show on it: what change in the code came with the rule?',
  },
  {
    title: 'Hunt for a second way',
    text: 'Adapt the loop to another primitive that a helper should own, e.g. os.environ outside smarter/smarter/common/conf. Is the count flat or growing? A flat count is a few exceptions; a growing one is a series.',
  },
]

// Lab 1: what an agent does with CLAUDE.md and the skills. Each answer cites where the rule is written.
export const scenarios = [
  {
    task: 'The user types: “write a git commit for this change.”',
    answer:
      'It prints the git add and git commit commands as text, and runs neither. Hard rule 1 of CLAUDE.md says that “write a git commit” means print the command, and the smarter-git-commits skill covers the format and authorship.',
    source: ['CLAUDE.md', repoFile('CLAUDE.md')],
  },
  {
    task: 'A new plugin calls a slow, billable web API, and its results can be kept for an hour.',
    answer:
      'It decorates the expensive call with @cache_results, keyed on that call’s parameters, and never calls cache.get() or cache.set() directly. That’s hard rule 7 of smarter-development, written on October 11 by the fix in Part 8.',
    source: ['smarter-development', repoFile('skills/smarter-development/SKILL.md')],
  },
  {
    task: 'A new test exercises code that creates a DNS record in Route 53.',
    answer:
      'It fakes the DNS call in the test, through the infrastructure facade, because the local containers hold live credentials for real infrastructure. Any command that would write to real infrastructure is handed to the user, not run. That rule came from the outage in Part 9.',
    source: [
      'smarter-infrastructure-safety',
      repoFile('skills/smarter-infrastructure-safety/SKILL.md'),
    ],
  },
  {
    task: 'The road map calls for a new resource kind.',
    answer:
      'It loads smarter-development first, whose table sends it to smarter-sam-resource, then reads two or three existing kinds in full, preferring the newest, such as Guardrail and Secret, and copies their structure, naming, docstrings, logging and error handling.',
    source: ['smarter-sam-resource', repoFile('skills/smarter-sam-resource/SKILL.md')],
  },
  {
    task: 'It wants to check that a link in the Sphinx docs works.',
    answer:
      'It doesn’t build the docs. CLAUDE.md’s hard rule 4 says to check :doc: targets by file existence, or run the smarter-sphinx-docs skill’s check-docs.sh script, because a full build takes about 20 minutes.',
    source: ['CLAUDE.md', repoFile('CLAUDE.md')],
  },
]

// What to ask Sam, and what each experiment shows.
export const experiments = [
  {
    prompt: 'How do I add a new SAM resource kind to Smarter?',
    observe:
      'Sam’s instructions tell him to find two or three existing implementations and follow them: pattern first, the same rule that Claude Code follows. Does he name existing kinds to copy, and link to them?',
  },
  {
    prompt: 'Why does Smarter forbid hand-rolled cache.get() and cache.set() calls?',
    observe:
      'A why question. Sam should search the blog as well as the code, find Part 2 of the series, and cite it by its title.',
  },
  {
    prompt: 'What are Smarter’s Agent Skills, and which one should an agent load first?',
    observe:
      'The answer is in CLAUDE.md and the skills folder, which the MCP server indexes like any other file. Check it against Lab 1.',
  },
]

export const cicd = [
  'Set the test coverage bar high enough to delegate against.',
  'Write the guardrails where the agent will read them.',
  'Make the agent lint and test its own work first.',
  'Let the commit messages choose the version.',
  'Build each release once, from its tag, and verify what was published.',
  'Chain the deployment to the release, and make each step a gate.',
  'Publish the documentation with the release.',
]

export const sections = [
  { id: 'situation', label: 'The situation' },
  { id: 'problem', label: 'The problem' },
  { id: 'split', label: 'Who built what' },
  { id: 'factors', label: 'Five success factors' },
  { id: 'reads', label: 'What the agent reads' },
  { id: 'loop', label: 'Guidance and feedback' },
  { id: 'antipattern', label: 'The antipattern' },
  { id: 'fix', label: 'Fixing it' },
  { id: 'wrong', label: 'When it went wrong' },
  { id: 'pipeline', label: 'The pipeline' },
  { id: 'rules', label: 'Lab 1: Read the rules' },
  { id: 'measure', label: 'Lab 2: Measure the series' },
  { id: 'try', label: 'Lab 3: Talk to Sam' },
  { id: 'caveats', label: 'Caveats and takeaways' },
  { id: 'discussion', label: 'Discussion questions' },
  { id: 'reading-list', label: 'Further reading' },
]

export const discussion = [
  'Part 1 says you don’t choose the ratio of the series when you start the agent; you chose it over the years before. Which of the five factors could a team improve in a month? Which take years?',
  'The agent copies the nearest example, not the best one. How would you make sure the nearest example is the best one in a codebase you know?',
  'Architecture decision records were read in about one code-changing session in ten, while skills were read in eight in ten. Does that make ADRs less valuable? What does it say about where to write a rule?',
  'Claude Code writes most of Smarter’s skills, from its own experience of a task, after doing it. What are the risks of an agent writing the rules it will follow? What does the human decide?',
  'The DNS outage came from a missing source of truth, and the reverse() bug from a stale one. Why does Part 1 call the stale one worse?',
  'Lines of code are a poor measure of productivity. What would you measure instead, to compare an agent’s work with a person’s?',
  'A 25-times multiplier is neutral. If you were handed an agent tomorrow, what would you put in place before giving it your road map?',
]

export const readingList = [
  { title: 'Part 1: Maintaining Long-Term Code Quality With Agentic AI', url: PART_1 },
  { title: 'Part 2: The Antipattern That Makes a Codebase Diverge', url: PART_2 },
  { title: 'Part 3: What Claude Code Actually Reads', url: PART_3 },
  {
    title: 'Seven CI/CD Practices That Let Smarter Delegate to AI Agents',
    url: CICD_POST,
  },
  { title: 'Six High-Impact Uses of Claude Code', url: SIX_USES_POST },
  { title: 'Demystifying the AI Coding Stack', url: STACK_POST },
  { title: 'Agentic development in Smarter', url: AGENTIC_DOCS },
  { title: 'CLAUDE.md', url: repoFile('CLAUDE.md') },
  { title: 'Smarter’s Agent Skills', url: repoTree('skills') },
  { title: 'ADR-033: Don’t repeat yourself', url: `${DOCS}/en/latest/adr/033-dry.html` },
  { title: 'Agent Skills, the open format', url: 'https://agentskills.io/' },
  {
    title: 'The case study of the Smarter Project MCP server',
    url: '/case-studies/mcp-server',
  },
]
