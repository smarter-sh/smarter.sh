import { DOCS, SQL_PLUGIN_VIDEO_ID } from '@/common/constants'
import { githubRepository } from '@/components/manifest/manifests'

const R = `${DOCS}/smarter-resources`

// Where the plugins' manifests are: the example manifests that every Smarter platform loads, and
// Stackademy's, whose two course advisors use the SqlPlugin and the ApiPlugin.
export const examples = githubRepository('smarter-sh/example-manifests')
export const stackademy = githubRepository('smarter-sh/stackademy')

export const PLUGIN_DOCS = `${R}/smarter-llmtool.html`

// The three steps from a manifest to a tool call, each with the few lines that it takes.
export const steps = [
  {
    icon: 'lucide:file-code-2',
    title: 'Describe the tool',
    text: 'Say what it is for, name its parameters in plain words, and point it at the data. That is the whole job.',
    file: 'stackademy-sql.yaml',
    code: `kind: SqlPlugin
metadata:
  name: stackademy_sql
spec:
  connection: stackademy_catalog_db
  sqlData:
    sqlQuery: SELECT ... {max_cost}`,
  },
  {
    icon: 'lucide:upload',
    title: 'Apply it',
    text: 'From the command line, the API, the web console, or a pull request to a repository of manifests.',
    file: 'terminal',
    code: `$ smarter apply -f stackademy-sql.yaml`,
  },
  {
    icon: 'lucide:link',
    title: 'List it in an assistant',
    text: 'Add its name to an LLMClient. The model is offered the tool, and Smarter runs the calls it makes.',
    file: 'stackademy-advisor.yaml',
    code: `kind: LLMClient
spec:
  plugins:
    - stackademy_sql`,
  },
]

/*
 * The six plugins. `excerpt` is the part of the manifest that makes each one what it is, copied
 * from `file`, whose whole text the page opens from GitHub in the manifest editor.
 */
export const plugins = [
  {
    id: 'sql',
    kind: 'SqlPlugin',
    icon: 'lucide:database',
    tagline: 'Answers from your database',
    pitch:
      'Write one parameterized query. The model never sees it: it sees the parameters, and fills them in from the question. Smarter runs the query over a Connection to MySQL, PostgreSQL, SQL Server, Oracle and others, and hands back the rows.',
    ask: 'My budget is $1,000. Which AI courses can I take?',
    points: [
      'Every value is inserted as a quoted, escaped literal, so a question can never become SQL.',
      'An enum limits a parameter to the values your data actually holds.',
      'The database password is a Secret, never part of the manifest.',
      'A row limit, and test values to try the query before any model calls it.',
    ],
    docs: `${R}/llmtool/plugin/sql.html`,
    video: {
      id: SQL_PLUGIN_VIDEO_ID,
      title: 'The SqlPlugin in 60 seconds',
      caption:
        'The SqlPlugin in 60 seconds: an assistant answers from a database, through a query declared in a manifest.',
    },
    file: {
      repo: stackademy,
      path: 'plugins/sql/stackademy-sql.yaml',
      kind: 'SqlPlugin',
      name: 'stackademy_sql',
      role: 'Stanley, Stackademy’s course advisor, answers from the course catalog with this query. The model chooses only the values of max_cost and description.',
    },
    excerpt: `connection: stackademy_catalog_db
sqlData:
  sqlQuery: SELECT c.course_code, c.course_name, c.cost
    FROM courses c
    WHERE (c.description LIKE CONCAT('%', {description}, '%')
           OR {description} IS NULL)
      AND (c.cost <= {max_cost} OR {max_cost} IS NULL)
  parameters:
    - name: max_cost
      type: number
      description: the maximum cost that a student is willing to pay.
    - name: description
      type: string
      enum: [AI, mobile, web, database, network]
  limit: 10`,
  },
  {
    id: 'api',
    kind: 'ApiPlugin',
    icon: 'lucide:webhook',
    tagline: 'Calls your web services',
    pitch:
      'Point the model at an endpoint of a system you already run: an order lookup, an inventory count, a course catalog. The values it chooses become the request’s query string or body, and the response becomes its answer.',
    ask: 'Which web development courses do you offer?',
    points: [
      'Typed, described parameters, with enums, required fields and defaults.',
      'The base url and its credentials live in a Connection and a Secret.',
      'Any method, headers, url parameters and a JSON body.',
      'The same parameters as a SqlPlugin, so a tool can move from a database to an API.',
    ],
    docs: `${R}/llmtool/plugin/api.html`,
    file: {
      repo: stackademy,
      path: 'plugins/api/stackademy-api.yaml',
      kind: 'ApiPlugin',
      name: 'stackademy_api',
      role: 'The same course search as the SqlPlugin, over Stackademy’s web API: the model’s values become ?max_cost=1000&description=AI.',
    },
    excerpt: `connection: stackademy_catalog_api
apiData:
  endpoint: /api/v1/demos/stackademy/course-catalogue/
  method: GET
  parameters:
    - name: max_cost
      type: number
      description: the maximum cost that a student is willing to pay.
    - name: description
      type: string
      enum: [AI, mobile, web, database, network]
  limit: 10`,
  },
  {
    id: 'static',
    kind: 'Plugin',
    icon: 'lucide:table',
    tagline: 'Answers from facts you write down',
    pitch:
      'Office hours, a price list, contact details, this month’s promotions: write them in the manifest as plain YAML. The assistant answers from them, exactly, instead of from whatever the model remembers.',
    ask: 'Do you have any coupon codes?',
    points: [
      'No database, no connection, no credentials. Just the facts.',
      'Changing an answer is editing a line of YAML.',
      'Offered only when the question mentions it, with search terms.',
    ],
    docs: `${R}/llmtool/plugin/static.html`,
    file: {
      repo: examples,
      path: 'smarter/plugins/static/everlasting-gobstopper.yaml',
      kind: 'Plugin',
      name: 'everlasting_gobstopper',
      role: 'A fictional candy maker’s contact details, biography, promotions and coupon codes, which its marketing assistant answers from.',
    },
    excerpt: `selector:
  directive: search_terms
  searchTerms: [Gobstopper, Gobstoppers]
data:
  staticData:
    contact:
      - name: Willy Wonka
      - phone: +1 123-456-7890
    couponCodes:
      - code: 10OFF
        description: 10% off your next purchase`,
  },
  {
    id: 'skill',
    kind: 'SkillPlugin',
    icon: 'lucide:scroll',
    tagline: 'Follows your procedures',
    pitch:
      'Give the assistant an Agent Skill: a SKILL.md of instructions, with templates and examples beside it. Write it in the manifest, or name a skill in a GitHub repository, such as Anthropic’s public skills, and Smarter reads it from there.',
    ask: 'Here’s the transcript of today’s standup. What are the action items?',
    points: [
      'The open SKILL.md format, so a skill written for one tool works here.',
      'Resources, such as a template, travel with the skill.',
      'Or a source url: the skill stays in its own repository.',
    ],
    docs: `${R}/llmtool/plugin/skill.html`,
    file: {
      repo: examples,
      path: 'smarter/plugins/skill/skill-meeting-notes.yaml',
      kind: 'SkillPlugin',
      name: 'meeting_notes',
      role: 'Turns a meeting transcript into notes with a summary, decisions, action items and open questions, from its own template.',
    },
    excerpt: `skillData:
  skill: |
    ---
    name: meeting-notes
    description: Turns raw meeting transcripts into structured notes.
    ---
    1. Read the entire transcript before writing anything.
    2. Fill in [the notes template](assets/template.md).
    3. Every action item must have an owner. Never invent one.
  resources:
    assets/template.md: |
      ## Summary  ## Decisions  ## Action items`,
  },
  {
    id: 'websearch',
    kind: 'WebsearchPlugin',
    icon: 'lucide:search',
    tagline: 'Researches the web, and cites it',
    pitch:
      'Let the assistant search the web, read the pages it finds, and answer with the sources it used. You choose the search provider, how many results, which sites are off limits, and how long results are cached.',
    ask: 'What changed in the latest release of PostgreSQL?',
    points: [
      'Allowed and blocked domains, and safe search.',
      'robots.txt is obeyed, and pages are trimmed to a size you set.',
      'The search api key is a Secret.',
    ],
    badge: 'Experimental',
    docs: `${R}/llmtool/plugin/websearch.html`,
    file: {
      repo: examples,
      path: 'smarter/plugins/websearch/websearch-research-assistant.yaml',
      kind: 'WebsearchPlugin',
      name: 'research_assistant',
      role: 'Searches the web with Brave, reads the most relevant pages in full, and cites the url of every source.',
    },
    excerpt: `websearchData:
  search:
    provider: brave
    apiKey: brave_search_api_key
    maxResults: 5
    safeSearch: moderate
  fetch:
    maxCharacters: 20000
    respectRobotsTxt: true
  blockedDomains: [pinterest.com, quora.com]
  cacheTtl: 3600`,
  },
  {
    id: 'image-search',
    kind: 'ImageSearchPlugin',
    icon: 'lucide:image',
    tagline: 'Shows pictures beside the answer',
    pitch:
      'When a picture explains it better, the assistant finds one and shows it in the chat. Filters decide which pictures are acceptable: their sites, their size, and how strict safe search is.',
    ask: 'What does a red-eyed tree frog look like?',
    points: [
      'Strict safe search and allowed domains, e.g. Wikimedia Commons only.',
      'Every image url is checked before it is shown.',
      'A minimum size, so thumbnails don’t make the cut.',
    ],
    badge: 'Experimental',
    docs: `${R}/llmtool/plugin/image-search.html`,
    file: {
      repo: examples,
      path: 'smarter/plugins/image-search/image-search-safe.yaml',
      kind: 'ImageSearchPlugin',
      name: 'safe_image_search',
      role: 'Kid-friendly, freely licensed images from Wikimedia Commons only, with strict safe search.',
    },
    excerpt: `imageSearchData:
  apiKey: brave_search_api_key
  searchParams:
    count: 5
    safesearch: strict
  filters:
    minWidth: 400
    allowedDomains: [wikimedia.org]
  validateUrls: true`,
  },
]

// The manifests that the page opens in the editor.
export const files = plugins.map((plugin) => plugin.file)

// What every plugin gets without anyone writing it.
export const included = [
  {
    icon: 'lucide:braces',
    title: 'The tool definition',
    text: 'Smarter writes the function definition the model reads, from your parameters’ names, types, enums and descriptions. No JSON Schema by hand.',
  },
  {
    icon: 'lucide:filter',
    title: 'Offered only when it fits',
    text: 'A selector offers a tool always, or only when a prompt mentions its search terms. Fewer tools per prompt means fewer tokens and fewer wrong choices.',
  },
  {
    icon: 'lucide:key-round',
    title: 'Credentials kept out of sight',
    text: 'A manifest names a Connection or a Secret. Passwords and api keys never appear in the YAML, in git, or in what the model reads.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Values, never code',
    text: 'The model only ever chooses parameter values, and Smarter inserts them as data: escaped literals in SQL, query parameters in a request. A clever question can’t rewrite the query.',
  },
  {
    icon: 'lucide:timer',
    title: 'Cached results',
    text: 'Remote calls are cached, for as long as each plugin says, so the same question doesn’t hit your database or a paid search api twice.',
  },
  {
    icon: 'lucide:scroll-text',
    title: 'On the record',
    text: 'Each tool call is recorded with the prompt that caused it, inside the assistant’s guardrails and budget, like everything else in Smarter.',
  },
]
