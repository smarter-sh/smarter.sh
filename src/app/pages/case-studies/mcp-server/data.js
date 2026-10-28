import { BLOG, DOCS, SMARTER_PROJECT_MCP } from '@/common/constants'
import { githubRepository } from '@/components/manifest/manifests'

// The source code of the case: the platform's mcpserver app.
export const SOURCE =
  'https://github.com/smarter-sh/smarter/tree/main/smarter/smarter/apps/mcpserver'
export const sourceFile = (name) =>
  `https://github.com/smarter-sh/smarter/blob/main/smarter/smarter/apps/mcpserver/${name}`

// The blog post that this case is based on.
export const POST = `${BLOG}2026/10/28/smarter-project-mcp-server-design/`

// The server's documentation.
export const MCP_DOCS = `${DOCS}/en/latest/smarter-platform/smarter-project-mcp-server.html`

// The case's manifests, in the example manifests that every Smarter platform loads.
export const repo = githubRepository('smarter-sh/example-manifests')

export const files = [
  {
    path: 'mcp-clients/smarter-project.yaml.tpl',
    kind: 'MCPClient',
    name: 'smarter_project',
    role: 'How an LLMClient reaches the Smarter Project MCP server of its own platform: every repository and the blog, read-only, with no Secret. A template: each platform fills in its own address in endpointUrl when it loads the file.',
  },
  {
    path: 'mcp-clients/smarter-project-github-cli.yaml.tpl',
    kind: 'MCPClient',
    name: 'smarter_project_github_cli',
    role: 'The same server, at the endpoint of one repository, smarter-cli. Its tools have no repository argument at all, so the model can’t pick the wrong one.',
  },
  {
    path: 'llm-clients/llmclient-smarter-developer.yaml',
    kind: 'LLMClient',
    name: 'smarter_developer',
    role: 'Sam, the Smarter Developer Guide: a staff engineer who answers from the smarter_project MCP server, never from memory, and cites the code and posts he read.',
  },
]

export const objectives = [
  'Explain why an AI model can’t answer accurately about a large, changing codebase, and why pasting the code into the prompt doesn’t fix that.',
  'Describe tool calling, and how the Model Context Protocol turns a tool into a service that any AI application can use.',
  'Explain why the server separates indexing from answering, and what each path absorbs.',
  'Trace the six steps that keep a repository’s index current, and the problem that each one solves.',
  'Compare keyword search with embeddings, and say when an LLM as the searcher makes the simpler one the better choice.',
  'Design tool results, errors and server instructions for an LLM reader rather than a person.',
  'Call an MCP server by hand, with curl, and read what it returns.',
]

export const facts = [
  ['Organization', 'The Smarter Project, an open source community'],
  ['The question', '“How does Smarter work, and how do I change it?”'],
  ['The data', '21 public GitHub repositories, and every post on the blog'],
  ['The size', 'About 240,000 lines of Python in the platform alone'],
  ['The solution', 'An MCP server with 8 read-only tools, on every platform'],
  ['Storage', '2 database tables, refreshed by 1 hourly task'],
  ['Search', 'Keyword search with TF-IDF ranking, in SQL. No embeddings.'],
  ['Operations', 'Stateless. No sessions, no credentials, no extra services.'],
]

// The question of Part 3, end to end, between the five participants of the sequence diagram.
export const actors = [
  {
    id: 'developer',
    label: 'Developer',
    icon: 'lucide:user-round',
    color: 'bg-keen-200 text-keen-800',
  },
  {
    id: 'sam',
    label: 'Sam',
    sub: 'LLMClient + MCPClient',
    icon: 'lucide:message-circle',
    color: 'bg-orange-100 text-primary',
  },
  {
    id: 'model',
    label: 'AI model',
    sub: 'e.g. OpenAI',
    icon: 'lucide:sparkles',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'server',
    label: 'MCP server',
    sub: 'Smarter Project',
    icon: 'lucide:server',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'db',
    label: 'The index',
    sub: 'platform database',
    icon: 'lucide:database',
    color: 'bg-teal-100 text-teal-700',
  },
]

export const sequence = [
  { from: 'developer', to: 'sam', text: 'How does Smarter verify a custom domain?' },
  {
    from: 'sam',
    to: 'model',
    text: 'the question, Sam’s instructions, the server’s instructions and its 8 tools',
  },
  {
    from: 'model',
    to: 'sam',
    text: 'search_documentation("custom domain verification") + search_code("verify_custom_domain")',
    code: true,
  },
  { from: 'sam', to: 'server', text: 'two tools/call POSTs, in parallel' },
  { from: 'server', to: 'db', text: 'rank the indexed files, in SQL' },
  { from: 'server', to: 'sam', text: 'the best passages, with line numbers and links' },
  {
    from: 'model',
    to: 'sam',
    text: 'read_file("smarter/smarter/apps/llmclient/tasks/verify_custom_domain.py")',
    code: true,
  },
  {
    from: 'server',
    to: 'sam',
    text: 'the file, numbered, linked to those lines on GitHub',
  },
  {
    from: 'model',
    to: 'developer',
    text: 'an answer that cites the docs page and the code',
  },
]

export const challenges = [
  {
    icon: 'lucide:gauge',
    title: 'GitHub’s rate limit',
    text: 'GitHub allows 60 unauthenticated API requests an hour from each IP address. Fetching files on demand would exhaust that in one conversation.',
  },
  {
    icon: 'lucide:hard-drive-download',
    title: 'The size of it',
    text: 'Thousands of files in 21 repositories, plus every blog post, with binaries, lock files and minified bundles mixed in among the ones worth reading.',
  },
  {
    icon: 'lucide:search',
    title: 'Finding the right lines',
    text: 'A whole file wastes the model’s context. It needs the few lines that answer the question, and nothing else.',
  },
  {
    icon: 'lucide:link',
    title: 'Citations that stay true',
    text: 'An answer is only checkable if it links to the exact lines it came from, and those links must still be right after the file changes.',
  },
  {
    icon: 'lucide:file-warning',
    title: 'Invented manifest fields',
    text: 'Asked to write a manifest, a model will happily make up a field name that sounds right, and the platform will reject it.',
  },
  {
    icon: 'lucide:shield',
    title: 'A public endpoint',
    text: 'Anyone may call it, so it must be read-only, cheap to answer, safe from a flood of requests, and easy to scale.',
  },
]

// MCP's three methods that a server of tools needs.
export const methods = [
  [
    'initialize',
    'Who are you, which protocol version do you speak, and what can you do? The answer may include instructions for the LLM.',
  ],
  [
    'tools/list',
    'Which tools do you have? Each comes back with its name, description and JSON Schema.',
  ],
  ['tools/call', 'Run this tool, with these arguments.'],
]

// index_repository(), in indexer.py: the six steps, each with the problem it solves.
export const indexSteps = [
  {
    title: 'Ask whether anything changed',
    text: 'The cheapest question there is: the sha of the main branch’s latest commit, a 40-character fingerprint of the repository’s whole contents. If it matches the indexed one, stop. An hourly refresh of all 21 repositories costs 21 small requests.',
  },
  {
    title: 'Download the whole repository at once',
    text: 'One .tar.gz archive at that exact commit, instead of thousands of requests. Streamed to a temporary file in 1 MB chunks, and abandoned past 250 MB, so a surprise can’t fill the disk.',
  },
  {
    title: 'Read without extracting',
    text: 'Walk the archive in memory, reading only regular files. Symbolic links are skipped: a link could point outside the repository, at a file on the server.',
  },
  {
    title: 'Keep only what answers questions',
    text: 'Documentation and source code, yes. Binaries, vendored folders, minified bundles, lock files and anything over 256 KB, no. They match many searches and answer none.',
  },
  {
    title: 'Turn illustrations into links',
    text: 'A Sphinx .. figure:: path means nothing to a model. The indexer appends a Markdown image with the published url and the alt text, on the same line, so that line numbers still match GitHub.',
  },
  {
    title: 'Swap everything in one transaction',
    text: 'The new files replace the old in one database transaction. A search sees the whole old index or the whole new one, never a mix. If anything fails, the old index stays, with the error recorded on it.',
  },
]

export const keywordReasons = [
  {
    icon: 'lucide:code',
    title: 'Code is full of exact identifiers',
    text: 'A developer asks about verify_custom_domain or smarter_settings.environment_platform_domain. Keyword search matches them exactly; an embedding blurs them into “something about domains”.',
  },
  {
    icon: 'lucide:package-x',
    title: 'Nothing new to run',
    text: 'No embedding model, no vector database, no cost per document. The search is SQL, on the database Django already uses.',
  },
  {
    icon: 'lucide:scan-search',
    title: 'It’s explainable',
    text: 'You can say exactly why a file ranked first, which makes the search easy to test and to tune.',
  },
  {
    icon: 'lucide:bot',
    title: 'The searcher is an LLM',
    text: 'A person types one vague query and gives up. An LLM picks precise keywords, searches docs and code in parallel, and tries other words when a search comes back empty.',
  },
]

// a file's score for one term, in search.py's score_expression()
export const scoreParts = [
  ['contains the term at all', 'a bonus × the term’s weight'],
  ['each occurrence, up to 10', '+ 1 × the weight, per occurrence'],
  ['the term is in its path', 'a bonus × the weight'],
  ['the term is in its title', 'a bonus × the weight'],
]

export const tools = [
  [
    'get_repository_overview',
    'What a repository contains, its layout and its README. Without a repository, a table of all 21.',
  ],
  [
    'search_documentation',
    'Ranked passages of the Sphinx documentation, READMEs and other prose.',
  ],
  [
    'search_code',
    'Ranked source files with their matching lines, optionally under one folder.',
  ],
  ['read_file', 'A file with line numbers, 400 lines at a time.'],
  ['list_files', 'The folders and files in a folder.'],
  [
    'get_manifest_schema',
    'A resource kind’s example manifest, and one line per field of its schema.',
  ],
  ['search_blog', 'Ranked passages of the blog’s posts.'],
  ['read_blog_post', 'A post, with line numbers, 400 lines at a time.'],
]

export const toolPrinciples = [
  {
    icon: 'lucide:quote',
    title: 'Every result can be cited',
    text: 'Each hit names its file, links to its published docs page, and links to the file on GitHub at the indexed commit, with every line numbered. A link to a commit, not to main, still points at the same lines after the file changes.',
  },
  {
    icon: 'lucide:ruler',
    title: 'Every result fits',
    text: 'Search returns passages, not files: a few lines of prose around the best match, or the six lines of code with the most terms. read_file returns at most 400 lines, and ends by saying how to get the rest.',
  },
  {
    icon: 'lucide:graduation-cap',
    title: 'Errors teach',
    text: 'A tool error comes back as an ordinary result, with isError set, so the model sees it. Ask for a file that doesn’t exist, and the answer suggests files of the same name elsewhere: “Did you mean …?”',
  },
  {
    icon: 'lucide:list-checks',
    title: 'Arguments can’t be wrong',
    text: 'Each tool’s JSON Schema is generated from its Pydantic model, so what the model reads and what the server validates can’t disagree. The repository argument is an enum of the 21 real names, and disappears on a single repository’s endpoint.',
  },
]

export const promptTechniques = [
  [
    'Grounding',
    '“From what its tools return, rather than from memory” tells the model to trust retrieved text over its training. Giving the reason, outdated or about another product, makes it stick.',
  ],
  [
    'Routing',
    'One line per tool says when to use it. Some tool descriptions steer the model away, too: get_repository_overview is “not to answer a specific question”.',
  ],
  [
    'Parallel tool calls',
    'Searching documentation and code together, in one turn, takes one round instead of two, and matters for clients that allow only one.',
  ],
  [
    'Queries that suit the engine',
    '“Specific keywords and identifiers” is exactly what a keyword search rewards. The prompt and the search engine were designed together.',
  ],
  [
    'Guarding against invention',
    '“Never invent a field that it does not list” targets the most common way a model goes wrong with a configuration file.',
  ],
  ['Citations', 'Asking for links turns an answer into something a reader can check.'],
]

export const SERVER_INSTRUCTIONS = `This server reads {subject}, from GitHub: its documentation and its source code. Answer questions
about The Smarter Project from what its tools return, rather than from memory, which may be outdated
or about another product named Smarter.

- search_documentation finds concepts, features, configuration and how-to guides, in the Sphinx
  documentation that is published at {docs_url}, and in READMEs.
- search_code finds how something is implemented, and a class, function, setting or manifest field by name.
- read_file reads a file that a search returned, to confirm the details before you answer.
- get_repository_overview and list_files describe a repository's layout.
- get_manifest_schema returns a resource kind's example manifest and every field of its manifest, from
  the JSON Schema that the platform validates manifests with. Call it before you write, fix or explain a
  manifest, and never invent a field that it does not list.

Search with specific keywords and identifiers. Some clients allow only one round of tool calls
per answer, so make every search that you need at once, in parallel, e.g. search_documentation and
search_code together, rather than one after another. Their results include the matching lines, which
are usually enough to answer. Cite your sources: link to the published documentation page when a result
has one, and otherwise to the GitHub url of the file.`

export const SCORE_CODE = `def score_expression(terms: list[str], weights: dict[str, float]):
    """Return the SQL expression of a file's score for the terms."""
    parts = []
    for term in terms:
        weight = weights[term]
        parts.append(
            Case(When(content__icontains=term, then=Value(PRESENCE_WEIGHT * weight)), default=Value(0.0))
            + Least(occurrences(term), Value(float(MAX_COUNTED_OCCURRENCES))) * Value(weight)
            + Case(When(path__icontains=term, then=Value(PATH_WEIGHT * weight)), default=Value(0.0))
            + Case(When(title__icontains=term, then=Value(TITLE_WEIGHT * weight)), default=Value(0.0))
        )
    return ExpressionWrapper(reduce(lambda a, b: a + b, parts), output_field=FloatField())`

export const EXCLUDED_CODE = `EXCLUDED_PATTERNS = (
    "*.min.js",
    "*.map",
    "*.lock",
    "package-lock.json",
    "go.sum",
    "*/static/assets/*",
)
"""Generated, vendored and lock files, which match many searches and answer none."""`

export const STORE_CODE = `def store_files(index: RepositoryIndex, commit_sha: str, files: list[ArchiveFile]) -> RepositoryIndex:
    with transaction.atomic():
        RepositoryFile.objects.filter(index=index).delete()
        RepositoryFile.objects.bulk_create(
            (RepositoryFile(index=index, path=file.path, kind=file.kind, ...) for file in files),
            batch_size=BATCH_SIZE,
        )
        index.commit_sha = commit_sha
        index.status = RepositoryIndexStatus.READY
        index.save()
    return index`

// The curl commands of Lab 2, against the MCP server of ubc.smarter.sh.
const curl = (body, path = '') =>
  [
    `curl -s ${SMARTER_PROJECT_MCP}${path} \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -H "Accept: application/json, text/event-stream" \\`,
    `  -d '${body}'`,
  ].join('\n')

export const curlCommands = [
  {
    title: 'Ask the server who it is',
    text: 'The answer’s instructions field is the text that a client adds to the model’s system prompt: the same instructions as in Part 9.',
    code: curl(
      '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "curl", "version": "1"}}}'
    ),
  },
  {
    title: 'List its tools',
    text: 'Eight tools, each with a description written to the model and a JSON Schema of its arguments. Find the repository argument’s enum of 21 names.',
    code: curl('{"jsonrpc": "2.0", "id": 2, "method": "tools/list"}'),
  },
  {
    title: 'Call a tool',
    text: 'The same search that Sam makes in Figure 1. The result is Markdown: passages, line numbers, and links to an exact commit.',
    code: curl(
      '{"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "search_code", "arguments": {"query": "verify_custom_domain", "limit": 2}}}'
    ),
  },
  {
    title: 'Make a mistake on purpose',
    text: 'Ask for a file that doesn’t exist. The result has isError: true, and suggests where the file really is.',
    code: curl(
      '{"jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": {"name": "read_file", "arguments": {"repository": "smarter", "path": "verify_custom_domain.py"}}}'
    ),
  },
]

// The text of a real answer to the third command, abridged.
export const SAMPLE_RESULT = `2 results in the code of The Smarter Project's repositories, for "verify_custom_domain", best first.
Read a file with read_file to see more of it.

1. \`smarter/smarter/apps/llmclient/tasks/verify_custom_domain.py\` in smarter
   Source: https://github.com/smarter-sh/smarter/blob/708bdfc4…/verify_custom_domain.py#L21-L65

21  - verify_custom_domain(hosted_zone_id, sleep_interval=None, max_attempts=None):
32  - pre_verify_custom_domain: Sent before custom domain verification begins.
33  - post_verify_custom_domain: Sent after custom domain verification is completed.
43      verify_custom_domain.delay(hosted_zone_id, sleep_interval, max_attempts)
…`

// What to try in the live chat, and what each experiment shows.
export const experiments = [
  {
    prompt: 'How does Smarter verify a custom domain?',
    observe:
      'The question of Figure 1. Sam’s answer names files and functions, and links each to its lines on GitHub. Follow a link: it opens the exact commit that was indexed.',
  },
  {
    prompt: 'Write an MCPClient manifest for an MCP server that needs an API key.',
    observe:
      'Sam calls get_manifest_schema first, as the server’s instructions tell him to, and uses only the fields it lists. Paste his manifest over smarter-project.yaml.tpl in Lab 3’s editor, and see whether it validates.',
  },
  {
    prompt:
      'Why does the Smarter Project MCP server use keyword search instead of embeddings?',
    observe:
      'A why question. Sam searches the blog as well as the docs, and should cite this case’s source post by its title.',
  },
  {
    prompt: 'What does the setting SMARTER_HOSTNAME_FROBNICATOR do?',
    observe:
      'There’s no such setting. Grounded in the tools, Sam should say that he can’t find it, rather than describe something plausible.',
  },
]

export const labExercises = [
  {
    title: 'Find the endpoint',
    text: 'In smarter-project.yaml.tpl, find endpointUrl. Why is it a template, and not the address of ubc.smarter.sh?',
  },
  {
    title: 'Compare the two clients',
    text: 'Open smarter-project-github-cli.yaml.tpl. What is different about its endpoint? What does that do to the tools’ repository argument?',
  },
  {
    title: 'Narrow the tools',
    text: 'Delete search_blog and read_blog_post from allowedTools. It still validates. Which of Sam’s answers would get worse?',
  },
  {
    title: 'Break a type',
    text: 'Change timeout: 30 to timeout: soon. The check fails, names the key, and says what it must be.',
  },
  {
    title: 'Follow a reference',
    text: 'In llmclient-smarter-developer.yaml, find mcpClients. Which manifest does the name it lists refer to? Read Sam’s defaultSystemRole: which of its sentences repeat the server’s instructions, and why say them twice?',
  },
]

export const whyItWorks = [
  [
    'The slow work happens before anyone asks.',
    'Indexing absorbs GitHub’s rate limits, downloads and failures. Answering is a database query.',
  ],
  [
    'The search is simple because the searcher is smart.',
    'Keyword search with sensible weights is exact on identifiers, and good enough for an LLM that searches in parallel and retries.',
  ],
  [
    'Every result can be checked.',
    'Line numbers, links to the indexed commit and links to the published docs.',
  ],
  ['The tools teach.', 'Bounded results say how to get more; errors suggest the fix.'],
  [
    'The server talks to the LLM.',
    'Its instructions set the strategy; its tool descriptions route each question.',
  ],
  [
    'The schemas can’t drift.',
    'Argument schemas come from the validation models, manifest schemas from the platform’s own contract.',
  ],
  [
    'Failure is graceful.',
    'A failed refresh keeps the old index; an unindexed repository says when to try again; an unreachable server is skipped without failing the prompt.',
  ],
  [
    'There is nothing to operate.',
    'No session, no extra service, no credentials, one hourly task.',
  ],
]

export const sections = [
  { id: 'situation', label: 'The situation' },
  { id: 'problem', label: 'The problem' },
  { id: 'mcp', label: 'Tool calling and MCP' },
  { id: 'hard', label: 'Why it’s hard' },
  { id: 'design', label: 'The design' },
  { id: 'indexing', label: 'Building the index' },
  { id: 'search', label: 'Searching without embeddings' },
  { id: 'tools', label: 'Tools for an LLM' },
  { id: 'instructions', label: 'Prompting from the server' },
  { id: 'try', label: 'Lab 1: Talk to Sam' },
  { id: 'curl', label: 'Lab 2: Call the server' },
  { id: 'lab', label: 'Lab 3: The MCPClient' },
  { id: 'operations', label: 'Stateless and public' },
  { id: 'limits', label: 'Why it works, and its limits' },
  { id: 'discussion', label: 'Discussion questions' },
  { id: 'reading-list', label: 'Further reading' },
]

export const discussion = [
  'The server indexes every hour. What could go wrong if it fetched files from GitHub during each tool call instead? What would you gain?',
  'The server uses keyword search, and the blog post admits that it can’t match a synonym. Design a question that it would answer badly. What would you change first: the search, the tool descriptions, or the server’s instructions?',
  'The occurrence count is capped at ten. Without the cap, which kinds of files would win most searches? Why does length alone not make a file relevant?',
  'A tool error is returned as an ordinary result instead of a protocol error. Who is each kind of error for, the client program or the model? What would the model lose if every error were a protocol error?',
  'Sam’s system prompt and the MCP server’s instructions say some of the same things. Who should own each sentence, the author of the tool or the author of the assistant?',
  'The server requires no authentication, and limits each IP address to 1,200 requests a minute. When would that design be wrong? What would you have to add to serve private repositories?',
  'The indexer turns every image into a Markdown image with its alt text. What does that imply about how documentation authors should write alt text?',
]

export const readingList = [
  { title: 'How Smarter’s MCP Server Works (the source post)', url: POST },
  { title: 'The Smarter Project MCP server', url: MCP_DOCS },
  { title: 'The mcpserver app’s source code', url: SOURCE },
  {
    title: 'MCPClients',
    url: `${DOCS}/en/latest/smarter-resources/smarter-mcpclient.html`,
  },
  {
    title: 'How tool calling works',
    url: `${DOCS}/en/latest/smarter-resources/llmtool/how-tools-work.html`,
  },
  { title: 'The Model Context Protocol', url: 'https://modelcontextprotocol.io' },
  {
    title: 'The JSON-RPC 2.0 specification',
    url: 'https://www.jsonrpc.org/specification',
  },
  {
    title: 'Release v0.37: the server reads the blog and every repository',
    url: `${BLOG}2026/10/28/release-v0-37/`,
  },
  { title: 'Wikipedia: tf–idf', url: 'https://en.wikipedia.org/wiki/Tf%E2%80%93idf' },
  {
    title: 'The case study of Stackademy: tool calling over private data',
    url: '/case-studies/stackademy',
  },
]
