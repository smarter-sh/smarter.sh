import { DOCS } from '@/common/constants'
import { githubRepository } from '@/components/manifest/manifests'

// The case's repository: every manifest of the Stackademy project, which every Smarter platform loads.
export const repo = githubRepository('smarter-sh/stackademy')

// The project's ten manifests, in the order that they must be applied: a resource can only refer to
// resources that already exist. `role` is what the dialog says about each one.
export const files = [
  {
    path: 'secrets/smarter-test-db.yaml',
    kind: 'Secret',
    name: 'smarter_test_user',
    role: 'The course database’s password, encrypted. The SqlConnection refers to it by name, so the password is written down in exactly one place.',
  },
  {
    path: 'secrets/smarter-test-api.yaml',
    kind: 'Secret',
    name: 'smarter_test_api',
    role: 'The key of the course catalogue’s web API. The ApiConnection sends it as a bearer token; the model never sees it.',
  },
  {
    path: 'secrets/smarter-test-db-proxy-password.yaml',
    kind: 'Secret',
    name: 'smarter_test_db_proxy_password',
    role: 'A spare: the password for reaching the database through a proxy server. This project connects directly, so nothing uses it yet.',
  },
  {
    path: 'connections/sql/smarter-test-db.yaml',
    kind: 'SqlConnection',
    name: 'smarter_test_db',
    role: 'How to reach the registrar’s MariaDB database: its engine, host, port, database, user and the name of the Secret that holds the password.',
  },
  {
    path: 'connections/api/smarter-test-api.yaml.tpl',
    kind: 'ApiConnection',
    name: 'smarter_test_api',
    role: 'How to reach the course catalogue’s web API. A template: each platform fills in its own address in baseUrl when it loads the file.',
  },
  {
    path: 'plugins/sql/stackademy-sql.yaml',
    kind: 'SqlPlugin',
    name: 'stackademy_sql',
    role: 'The tool that searches the database: a parameterized SQL query, and the two filters that the model may fill in, described in plain words.',
  },
  {
    path: 'plugins/api/stackademy-api.yaml',
    kind: 'ApiPlugin',
    name: 'stackademy_api',
    role: 'The same tool, over a web API: the same two filters become the query string of a GET request.',
  },
  {
    path: 'llm-clients/stackademy-sql.yaml',
    kind: 'LLMClient',
    name: 'stackademy_sql',
    role: 'Stanley, the course advisor who uses the database tool: his model, his standing instructions, the text and colors of his chat, and the tools he may use.',
  },
  {
    path: 'llm-clients/stackademy-api.yaml',
    kind: 'LLMClient',
    name: 'stackademy_api',
    role: 'Stanley again, with the web API tool instead of the database tool.',
  },
  {
    path: 'budgets/stackademy-project.yaml',
    kind: 'Budget',
    name: 'stackademy_project',
    role: 'The project’s spending limit: $2,500 a month and $10,000 in all, over six months, after which further requests are refused.',
  },
]

export const objectives = [
  'Explain why a general-purpose AI model can’t answer questions about an organization’s private data, and why better prompts don’t fix that.',
  'Trace one tool call from the student’s question, through the model and the database, back to the answer.',
  'Name the engineering problems that connecting a database to tool calling raises, and the resource that solves each.',
  'Read any Smarter manifest by its five sections, and find a resource’s dependencies by their names.',
  'Explain how a parameterized query, and an enum of allowed values, keep a model’s choices safe.',
  'Compare a SQL tool with a web API tool over the same data, from the answers they produce.',
  'Describe how git, pull requests and automated checks govern an AI project the way they govern software.',
]

export const facts = [
  ['Organization', 'Stackademy, an online code academy (fictional)'],
  ['The question', '“Which courses can I take, on my budget?”'],
  ['The data', '48 courses, CS101 to CS408, $450–$1,000, with prerequisites'],
  ['Where it lives', 'A private MariaDB database, and a private web API'],
  ['The solution', 'Two AI course advisors with tool calling'],
  ['Resources', '10 manifests, of 7 kinds'],
  ['Code written', 'None'],
  ['Governance', 'GitHub, pull requests, automated schema checks, a Budget'],
]

// The tool call, step by step, between the four participants of the sequence diagram.
export const actors = [
  {
    id: 'student',
    label: 'Student',
    icon: 'lucide:user-round',
    color: 'bg-keen-200 text-keen-800',
  },
  {
    id: 'stanley',
    label: 'Stanley',
    sub: 'Smarter LLMClient',
    icon: 'lucide:graduation-cap',
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
    id: 'db',
    label: 'Course database',
    sub: 'private',
    icon: 'lucide:database',
    color: 'bg-teal-100 text-teal-700',
  },
]

export const sequence = [
  {
    from: 'student',
    to: 'stanley',
    text: 'My budget is $1,000. Which AI courses can I take?',
  },
  {
    from: 'stanley',
    to: 'model',
    text: 'the question, and the description of the course search tool',
  },
  {
    from: 'model',
    to: 'stanley',
    text: 'call the course search tool, with description = AI, max_cost = 1000',
    code: true,
  },
  {
    from: 'stanley',
    to: 'db',
    text: "SELECT … WHERE description LIKE '%AI%' AND cost <= 1000",
    code: true,
  },
  { from: 'db', to: 'stanley', text: 'CS210 Artificial Intelligence, $700, …' },
  { from: 'stanley', to: 'model', text: 'the rows that the tool found' },
  { from: 'model', to: 'stanley', text: 'an answer, written from those rows' },
  {
    from: 'stanley',
    to: 'student',
    text: 'You can take CS210 Artificial Intelligence, for $700…',
  },
]

export const challenges = [
  {
    icon: 'lucide:file-json',
    title: 'Describing the tool',
    text: 'Each query must be described as a function with typed parameters, in the format that each AI provider expects. They all differ a little.',
  },
  {
    icon: 'lucide:shield-alert',
    title: 'Making the model’s values safe',
    text: 'The model chooses the values from whatever the user typed. Pasted carelessly into SQL, they let a user rewrite the query: SQL injection.',
  },
  {
    icon: 'lucide:network',
    title: 'Reaching the database',
    text: 'A private database needs a network route, a driver, a pool of connections and timeouts, sometimes a tunnel or a proxy.',
  },
  {
    icon: 'lucide:key-round',
    title: 'Keeping the credentials secret',
    text: 'The password must be stored encrypted, and never reach the model, the prompt, the chat or the logs.',
  },
  {
    icon: 'lucide:repeat',
    title: 'Running the conversation',
    text: 'Send the question and the tools, receive the call, run it, trim the rows to fit, send them back, repeat until the model answers.',
  },
  {
    icon: 'lucide:activity',
    title: 'Operating it',
    text: 'Log every call, cache repeated queries, control costs, and change any of it without breaking the assistant people depend on.',
  },
]

export const solution = [
  {
    kind: 'Secret',
    write: 'the database password',
    does: 'Stores it encrypted. Nothing else ever spells it out, and the model never sees it.',
  },
  {
    kind: 'SqlConnection',
    write: 'the database’s address and user, and the Secret’s name',
    does: 'Connects securely, with a pool of connections and timeouts.',
  },
  {
    kind: 'SqlPlugin',
    write: 'the SQL query, and its parameters described in plain words',
    does: 'Describes the tool to the model, puts the model’s values into the query safely, runs it and returns the rows.',
  },
  {
    kind: 'LLMClient',
    write: 'the AI model, its instructions, and the plugins it may use',
    does: 'Runs the whole conversation with the AI provider, tool calls included, and serves the chat.',
  },
]

// What to try in the two live chats, and what each experiment shows.
export const experiments = [
  {
    prompt: 'My budget is $1,000. Which AI courses can I take?',
    observe:
      'Both advisors list the same four courses, CS210, CS316, CS319 and CS405, with real prices. The model chose max_cost = 1000 and description = AI from your sentence.',
  },
  {
    prompt: 'What are the prerequisites for those courses?',
    observe:
      'Compare the two. The SQL query joins the course table to itself, so the SQL advisor receives each prerequisite’s name. The web API returns only a prerequisite_id number, so the API advisor may not be able to name them. What a tool returns limits what the assistant can say.',
  },
  {
    prompt: 'Do you offer a course on COBOL?',
    observe:
      'COBOL isn’t one of the values the tool allows, so the model searches without that filter, reads the catalogue, and reports that there’s no such course, instead of inventing one.',
  },
  {
    prompt: 'What is the capital of France?',
    observe:
      'Stanley declines. His plugin’s instructions confine him to Stackademy’s courses: an assistant’s scope is part of its design.',
  },
]

export const sections = [
  { id: 'situation', label: 'The situation' },
  { id: 'problem', label: 'The problem' },
  { id: 'tool-calling', label: 'Tool calling' },
  { id: 'hard', label: 'Why it’s hard' },
  { id: 'solution', label: 'The solution' },
  { id: 'try', label: 'Lab 1: Talk to Stanley' },
  { id: 'anatomy', label: 'Anatomy of the project' },
  { id: 'reading', label: 'Reading a manifest' },
  { id: 'sql-plugin', label: 'Close reading: the SqlPlugin' },
  { id: 'lab', label: 'Lab 2: The manifest editor' },
  { id: 'governance', label: 'Governing it with git' },
  { id: 'discussion', label: 'Discussion questions' },
  { id: 'reading-list', label: 'Further reading' },
]

export const manifestSections = [
  {
    key: 'apiVersion',
    text: 'The version of the manifest format, always smarter.sh/v1 today. It lets the format change one day without breaking the files you have.',
  },
  {
    key: 'kind',
    text: 'The kind of resource: Secret, SqlConnection, SqlPlugin, LLMClient, Budget… The kind decides what the spec may contain.',
  },
  {
    key: 'metadata',
    text: 'What the resource is called and what it’s about: its name, which other manifests use to refer to it, a description, a version, tags and annotations.',
  },
  {
    key: 'spec',
    text: 'The specification: what the resource should be. It’s the heart of the manifest, and different for every kind.',
  },
  {
    key: 'status',
    text: 'What the resource is right now: when it was created, whether it’s deployed. The platform writes it; you never do, so no file in the repository has one.',
  },
]

export const labExercises = [
  {
    title: 'Hover to learn',
    text: 'Open llm-clients/stackademy-sql.yaml, and hover over defaultSystemRole, allowedOrigins and plugins. Each explanation comes from the LLMClient JSON Schema, the same one the VS Code extension uses.',
  },
  {
    title: 'Break a type',
    text: 'Change defaultTemperature: 1.0 to defaultTemperature: warm. The check fails, names the key, and says what it must be.',
  },
  {
    title: 'Remove something required',
    text: 'Delete the description line under metadata. Which section reports the problem, and why there?',
  },
  {
    title: 'Add your own annotation',
    text: 'Add - example.edu/course/section: "AI-101" under annotations. It stays valid: annotations are yours, and Smarter stores them without interpreting them.',
  },
  {
    title: 'Follow a reference',
    text: 'In plugins/sql/stackademy-sql.yaml, find connection. Then open the manifest that it names. What would happen if the names didn’t match?',
  },
]

export const gitBenefits = [
  {
    icon: 'lucide:history',
    title: 'History',
    text: 'Every change is recorded: what, who, when and why. When an assistant starts answering differently, you can see exactly what changed.',
  },
  {
    icon: 'lucide:undo-2',
    title: 'Undo',
    text: 'Any earlier version of any file can be brought back, even months later.',
  },
  {
    icon: 'lucide:message-square-text',
    title: 'Review',
    text: 'Changes are proposed, discussed and approved before they reach users, like Suggesting mode in a shared document, for the whole project at once.',
  },
  {
    icon: 'lucide:git-branch',
    title: 'Safe experiments',
    text: 'Try a new prompt on a branch, a copy of the project, without touching the version in use.',
  },
  {
    icon: 'lucide:list-checks',
    title: 'Automatic checks',
    text: 'Every proposed change is validated against its kind’s schema before anyone reviews it.',
  },
  {
    icon: 'lucide:book-open-check',
    title: 'One source of truth',
    text: 'The repository is the complete description of the project. Any Smarter platform can rebuild it from these files alone.',
  },
]

export const pullRequest = [
  'Open the manifest on GitHub, and choose the pencil icon. GitHub offers to fork the repository if you can’t edit it.',
  'Change a line, e.g. Stanley’s appWelcomeMessage.',
  'Commit the change to a new branch, with a message that says what and why.',
  'Open a pull request, which shows the change line by line.',
  'The automated checks run: the schema check you tried in Lab 2, plus YAML style, typos and leaked private keys.',
  'A reviewer comments, approves and merges. The change is now part of main, ready to apply.',
]

export const discussion = [
  'Stackademy’s catalogue changes every term. Why is tool calling a better design than putting the catalogue in the system prompt? When might the prompt be the better choice?',
  'The SQL advisor receives each prerequisite’s name; the API advisor receives only its id. Who should decide what a tool returns: the database team, the API team or the prompt engineer? What does that imply for how teams collaborate?',
  'The description parameter’s enum lists six keywords. What does the enum prevent? What does it cost the student who asks about a topic that isn’t on the list?',
  'Names are references: the LLMClient names its plugin, the plugin its connection, the connection its Secret. What breaks if someone renames a resource in the web console but not in the repository?',
  'Budgets can only be applied by a platform administrator. Why might an organization want spending limits governed separately from the assistants themselves?',
  'A prompt engineer edits Stanley in the web console and it works. Why should the change still go through a pull request?',
]

export const readingList = [
  {
    title: 'How tool calling works',
    url: `${DOCS}/en/latest/smarter-resources/llmtool/how-tools-work.html`,
  },
  {
    title: 'The Stackademy example project',
    url: `${DOCS}/en/latest/smarter-framework/smarter-manifests/stackademy.html`,
  },
  {
    title: 'Manifests: structure, tags and annotations',
    url: `${DOCS}/en/latest/smarter-framework/smarter-manifests.html`,
  },
  {
    title: 'SqlPlugins',
    url: `${DOCS}/en/latest/smarter-resources/llmtool/plugin/sql.html`,
  },
  {
    title: 'ApiPlugins',
    url: `${DOCS}/en/latest/smarter-resources/llmtool/plugin/api.html`,
  },
  {
    title: 'LLMClients',
    url: `${DOCS}/en/latest/smarter-resources/smarter-llmclient.html`,
  },
  { title: 'Budgets', url: `${DOCS}/en/latest/smarter-resources/smarter-budget.html` },
  {
    title: 'The Smarter extension for VS Code',
    url: `${DOCS}/en/latest/smarter-framework/vs-code-extension.html`,
  },
  {
    title: 'GitHub: About pull requests',
    url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
  },
  {
    title: 'OWASP: SQL injection',
    url: 'https://owasp.org/www-community/attacks/SQL_Injection',
  },
]
