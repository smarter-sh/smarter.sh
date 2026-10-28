import { BLOG, DOCS } from '@/common/constants'
import { githubRepository } from '@/components/manifest/manifests'

// The contract, in the platform's repository.
export const CONTRACT_SOURCE =
  'https://github.com/smarter-sh/smarter/tree/main/smarter/smarter/apps/api/v1/contract'
export const CONTRACT_RAW =
  'https://raw.githubusercontent.com/smarter-sh/smarter/main/smarter/smarter/apps/api/v1/contract'
export const OPENAPI_RAW = `${CONTRACT_RAW}/openapi.json`

// A file of one of the project's repositories, on GitHub.
export const github = (repository, path) =>
  `https://github.com/smarter-sh/${repository}/blob/main/${path}`

// The blog post that this case is based on.
export const POST = `${BLOG}2026/09/05/smarter-openapi-contract/`

// The live document, which every platform serves.
export const LIVE_OPENAPI = 'https://ubc.smarter.sh/docs/openapi.json'

export const CONTRACT_DOCS = `${DOCS}/en/latest/smarter-framework/smarter-openapi.html`

// The case's manifests, in the example manifests that every Smarter platform loads.
export const repo = githubRepository('smarter-sh/example-manifests')

export const files = [
  {
    path: 'guardrails/pii-redaction-input.yaml',
    kind: 'Guardrail',
    name: 'pii_redaction_input',
    role: 'A Guardrail that redacts personal data from a prompt. The same manifest that the README of every SDK applies, here checked against Guardrail.schema.json.',
  },
  {
    path: 'budgets/account-monthly-cap.yaml',
    kind: 'Budget',
    name: 'account_monthly_cap',
    role: 'A monthly spending limit. Its schema has enums and a maximum, which every client checks the same way.',
  },
  {
    path: 'llm-clients/llmclient-customer-support.yaml',
    kind: 'LLMClient',
    name: 'customer_support',
    role: 'A customer support assistant, with styles for its chat. The styles sections are the strict parts of the LLMClient schema: a misspelled setting is an error.',
  },
  {
    path: 'llm-clients/llmclient-smarter-sdk-guide.yaml',
    kind: 'LLMClient',
    name: 'smarter_sdk_guide',
    role: 'Ada, the Smarter SDK Guide, who answers from the source code of the platform, the three SDKs and the CLI, through one MCPClient per repository.',
  },
]

export const objectives = [
  'Explain what an API contract is, and why a platform with many clients needs one that machines can read.',
  'Compare four places to put the seam between a platform and its clients, and say why a standard document wins.',
  'Describe how OpenAPI and JSON Schema describe an HTTP API and its data, and how a generator turns them into code.',
  'Explain how generating the document from the models that build the responses keeps it from drifting.',
  'Trace a change to one field from the platform’s pull request to a failing test in a client.',
  'Tell a backward-compatible change from a breaking one, and say how each is versioned.',
  'Read the contract yourself, with curl and Python, and generate a typed client from it.',
]

export const facts = [
  ['Organization', 'The Smarter Project, an open source community'],
  [
    'The question',
    '“How do six clients, in four languages, stay in step with one platform?”',
  ],
  ['The platform', 'Django, with 25 manifest kinds behind one REST API'],
  ['The contract', '1 OpenAPI 3.1 document and 25 JSON Schemas, all generated'],
  [
    'The clients',
    'Python, Node.js and Go SDKs, a Go CLI, a VS Code extension, a React chat',
  ],
  ['Shared code', 'None, between any client and the platform'],
  ['Generators', 'Off-the-shelf in Python and TypeScript; a small one in Go'],
  ['Governance', 'Committed files, contract tests on both sides, a pinned release'],
]

// The four places to put the seam, from the blog post.
export const seams = [
  {
    icon: 'lucide:package',
    title: 'Share code',
    text: 'Publish the platform’s models as a library. Cheap on day one, and it ties every client to one language and to the platform’s internals. Smarter’s models depend on Django: a Go CLI or a browser can’t import them at all.',
  },
  {
    icon: 'lucide:pencil',
    title: 'Hand-write a client per language',
    text: 'Works until the third client. Then there are three descriptions of the API, written from memory, and nothing checks any of them.',
  },
  {
    icon: 'lucide:binary',
    title: 'A bespoke interface language',
    text: 'gRPC and Protocol Buffers are excellent between services, and a poor fit for a YAML file in VS Code, a fetch() from a WordPress page, or curl in a shell script.',
  },
  {
    icon: 'lucide:file-json',
    title: 'A standard description of HTTP and JSON',
    text: 'OpenAPI. Its strength is ubiquity: practically every language has a validator, a type generator, a mock server and a documentation renderer for it.',
  },
]

// The contract's files, in smarter/apps/api/v1/contract/ and the chat app.
export const contractFiles = [
  [
    'openapi.json',
    'The OpenAPI 3.1 document of the whole API under /api/v1: the CLI API, the chat API, and the REST reads of each resource family.',
  ],
  [
    'sam/<Kind>.schema.json',
    'One JSON Schema per manifest kind, 25 of them. Exactly what POST /api/v1/cli/json-schema/<Kind>/ returns.',
  ],
  [
    'sam/<Kind>.example.json',
    'One example manifest per kind, which must validate against its own schema.',
  ],
  [
    'chat-contract.schema.json',
    'The shapes of an LLMClient’s chat configuration and a prompt’s response, from the same models as the chat API’s part of openapi.json.',
  ],
]

// The clients: the five repositories that copy the contract with make contracts, and the chat.
export const clients = [
  {
    name: 'smarter-python',
    language: 'Python',
    icon: 'lucide:code',
    reads: 'openapi.json, every sam/<Kind>.schema.json',
    does: 'Generates a Pydantic model per kind with datamodel-code-generator. Its tests match every request the SDK makes to an operation of the document, and the other way around.',
    url: 'https://github.com/smarter-sh/smarter-python',
  },
  {
    name: 'smarter-nodejs',
    language: 'TypeScript',
    icon: 'lucide:braces',
    reads: 'openapi.json, every sam/<Kind>.schema.json',
    does: 'Generates a TypeScript interface per kind with json-schema-to-typescript, after removing additionalProperties: false, so that a newer platform’s extra fields don’t break it.',
    url: 'https://github.com/smarter-sh/smarter-nodejs',
  },
  {
    name: 'smarter-golang',
    language: 'Go',
    icon: 'lucide:cpu',
    reads: 'openapi.json, every sam/<Kind>.schema.json',
    does: 'Generates a Go struct per kind with samgen, its own small generator, which reads only the subset of JSON Schema that Pydantic writes, and fails on anything else.',
    url: 'https://github.com/smarter-sh/smarter-golang',
  },
  {
    name: 'smarter-cli',
    language: 'Go',
    icon: 'lucide:terminal',
    reads: 'openapi.json',
    does: 'Generates nothing. It sends manifests as the YAML it read, and its contract test fails if a command makes a request, or sends a kind, that the document doesn’t list.',
    url: 'https://github.com/smarter-sh/smarter-cli',
  },
  {
    name: 'smarter-vscode-yaml',
    language: 'TypeScript',
    icon: 'lucide:file-code',
    reads: 'openapi.json, and each kind’s schema from the platform',
    does: 'Types its API client with openapi-typescript, and turns each kind’s schema into validation, autocomplete and hover help as you type.',
    url: 'https://github.com/smarter-sh/smarter-vscode-yaml',
  },
  {
    name: 'Smarter Chat',
    language: 'React',
    icon: 'lucide:message-circle',
    reads: 'chat-contract.schema.json, in the platform’s own repository',
    does: 'Generates its TypeScript types with json-schema-to-typescript, and validates every mock response of its tests and stories against the schema.',
    url: 'https://github.com/smarter-sh/smarter/tree/main/smarter/react/packages/smarter.sh-chat',
  },
]

// A change to one field, end to end, between the five participants of the sequence diagram.
export const actors = [
  {
    id: 'developer',
    label: 'Developer',
    sub: 'of the platform',
    icon: 'lucide:user-round',
    color: 'bg-keen-200 text-keen-800',
  },
  {
    id: 'platform',
    label: 'Platform repo',
    sub: 'smarter-sh/smarter',
    icon: 'lucide:server',
    color: 'bg-orange-100 text-primary',
  },
  {
    id: 'reviewer',
    label: 'Reviewer',
    icon: 'lucide:eye',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'client',
    label: 'Client repo',
    sub: 'e.g. smarter-golang',
    icon: 'lucide:package',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'tests',
    label: 'Client’s tests',
    sub: 'in CI',
    icon: 'lucide:list-checks',
    color: 'bg-teal-100 text-teal-700',
  },
]

export const sequence = [
  { from: 'developer', to: 'platform', text: 'rename a field of a Pydantic model' },
  {
    from: 'platform',
    to: 'developer',
    text: 'a contract test fails: the committed openapi.json is out of date',
  },
  {
    from: 'developer',
    to: 'platform',
    text: 'make api-contract, and commit the regenerated files',
    code: true,
  },
  {
    from: 'platform',
    to: 'reviewer',
    text: 'a pull request, with the diff of openapi.json',
  },
  {
    from: 'reviewer',
    to: 'platform',
    text: 'a breaking change: a new major release, or a new API version',
  },
  {
    from: 'client',
    to: 'platform',
    text: 'make contracts SMARTER_REF=<tag>',
    code: true,
  },
  {
    from: 'client',
    to: 'tests',
    text: 'regenerate the types, and run the contract tests',
  },
  {
    from: 'tests',
    to: 'client',
    text: 'fail, at exactly the line that used the old name',
  },
]

// The four principles of the platform's side, in the order of Part 6.
export const generationRules = [
  {
    icon: 'lucide:git-merge',
    title: 'One object, two uses',
    text: 'ADR-031: any sizable JSON that the platform builds is a Pydantic model, and the view builds its response from the model. The document is exported from the same model, so the two can’t disagree.',
  },
  {
    icon: 'lucide:git-commit-horizontal',
    title: 'Generated, then committed',
    text: 'make api-contract writes every file; nobody edits one by hand. Committing them turns a change to the API into a change to a file, which a reviewer sees in the pull request.',
  },
  {
    icon: 'lucide:route',
    title: 'Every route is documented',
    text: 'A test walks every route of every documented family under /api/v1. A route is either in the document, or on a short list of exceptions, each with a written reason.',
  },
  {
    icon: 'lucide:flask-conical',
    title: 'Real responses are checked',
    text: 'The platform’s tests validate real responses of every documented operation, errors included, against the document. A stale file, or an example that fails its own schema, fails the build.',
  },
]

export const generators = [
  [
    'datamodel-code-generator',
    'Python',
    'each kind’s schema → Pydantic models (smarter-python)',
  ],
  [
    'json-schema-to-typescript',
    'TypeScript',
    'each kind’s schema → interfaces (smarter-nodejs); the chat contract → types (Smarter Chat)',
  ],
  ['openapi-typescript', 'TypeScript', 'openapi.json → API types (smarter-vscode-yaml)'],
  [
    'samgen',
    'Go',
    'each kind’s schema → structs (smarter-golang), written for the subset Pydantic emits',
  ],
  [
    'Ajv, jsonschema',
    'JS, Python',
    'validate manifests, fixtures and recorded responses',
  ],
]

// ADR-023: what a change to an interface is, within a version.
export const compatibility = [
  [
    'A new optional field, or a new kind',
    'A removed or renamed field, kind or operation',
  ],
  ['A new operation', 'A field that became required, or a narrower type'],
  ['A relaxed constraint, a new enum value', 'A removed enum value, a changed default'],
  ['A changed description', 'A changed response shape'],
]

// Each public interface, and how it is versioned (ADR-023).
export const versions = [
  [
    'The product',
    'vMAJOR.MINOR.PATCH, e.g. v0.37.2',
    'The platform: its image, Helm chart, settings and migrations. Changes many times a week.',
  ],
  [
    'The REST API',
    'the url path, /api/v1/',
    'A breaking change needs /api/v2/. info.version in openapi.json is v1, not the product’s version.',
  ],
  [
    'Manifests',
    'apiVersion: smarter.sh/v1',
    'The same rules, applied to each kind’s fields as its JSON Schema declares them.',
  ],
  [
    'The chat contract',
    'an integer, chosen by request header',
    'Version 2 is the default; version 1 is still returned to the clients that ask for it.',
  ],
]

export const PYDANTIC_CODE = `class SAMGuardrailSpecConfig(AbstractSAMSpecBase):
    ...
    action: Literal[tuple(SAMGuardrailAction.all())] = Field(
        ...,
        description=f"{class_identifier}.action[str]: what the guardrail does when it triggers. One of: {SAMGuardrailAction.all()}.",
    )`

export const SCHEMA_CODE = `"action": {
  "description": "Guardrail.spec.config.action[str]: what the guardrail does when it triggers. ...",
  "enum": ["log", "flag", "redact", "transform", "block", "escalate"],
  "title": "Action",
  "type": "string"
}`

export const DISCRIMINATOR_CODE = `for kind, name in kind_schemas.items():
    schemas[name]["properties"]["kind"]["const"] = kind
schemas["SAMManifest"] = {
    "description": "A SAM manifest of any kind. Its kind selects its schema.",
    "oneOf": [ref(name) for name in kind_schemas.values()],
    "discriminator": {
        "propertyName": "kind",
        "mapping": {kind: REF_TEMPLATE.format(model=name) for kind, name in kind_schemas.items()},
    },
}`

export const ROUTE_TEST_CODE = `for prefix, urlconf in DOCUMENTED_URLCONFS.items():
    for pattern in importlib.import_module(urlconf).urlpatterns:
        ...
        with self.subTest(route=path):
            self.assertTrue(
                path in paths or path in UNDOCUMENTED_ROUTES,
                f"{path} is not in the OpenAPI document. {FIX_UNDOCUMENTED_ROUTE}",
            )`

export const PYTHON_TEST_CODE = `called = {self.operation(request.method, request.url.path) for request in self.requests}
published = {
    item[method]["operationId"]
    for item in self.document["paths"].values()
    for method in ("get", "post", "delete")
    if method in item
}
self.assertEqual(
    published - called, self.NOT_CALLED, "The platform publishes cli operations that the SDK doesn't call."
)`

export const CLI_TEST_CODE = `if !known[kind] {
    t.Errorf("%s sent the kind %q, which is not a SAMKind of the platform's OpenAPI document", r.command, kind)`

export const SDK_CODE = [
  {
    language: 'Python',
    code: `from smarter import Smarter

client = Smarter()  # SMARTER_API_KEY, or the smarter cli's ~/.smarter/config.yaml
client.manifests.apply("pii-redactor.yaml")
manifest = client.guardrails.describe("pii_redactor")`,
  },
  {
    language: 'TypeScript',
    code: `import { Smarter } from "@smarter.sh/api";

const client = new Smarter(); // SMARTER_API_KEY, or the smarter cli's ~/.smarter/config.yaml
const llmclient = await client.llmClients.find("customer_support");
const response = await client.llmClients.prompt(llmclient.id, "Where is my order #1234?");`,
  },
  {
    language: 'Go',
    code: `client, err := smarter.NewClient() // SMARTER_API_KEY, or the smarter cli's ~/.smarter/config.yaml
llmclient, err := client.LLMClients.Find(ctx, "customer_support")
response, err := client.LLMClients.Prompt(ctx, llmclient.Ref(), smarter.Text("Where is my order #1234?"), nil)`,
  },
  {
    language: 'CLI',
    code: `smarter apply -f pii-redactor.yaml            # POST /api/v1/cli/apply/
smarter apply -f pii-redactor.yaml --dry-run  # POST /api/v1/cli/validate/
smarter describe guardrail pii_redactor`,
  },
]

// The commands of Lab 2, against the document of ubc.smarter.sh and the schemas on GitHub.
export const labCommands = [
  {
    title: 'Download the document',
    text: 'Every Smarter platform serves its own copy. It’s about 800 KB of JSON.',
    code: `curl -s ${LIVE_OPENAPI} -o openapi.json`,
  },
  {
    title: 'Read its versions and its size',
    text: 'openapi is the version of the OpenAPI format; info.version is the version of the API, v1, not of the platform.',
    code: `python3 -c "import json; d = json.load(open('openapi.json')); print(d['openapi'], d['info']['version'], len(d['paths']), 'paths')"`,
  },
  {
    title: 'List the CLI API’s operations',
    text: 'Every smarter command, and every SDK’s manifest verbs, is one of these. Each operationId is the name the clients’ contract tests match requests against.',
    code: `python3 -c "
import json
d = json.load(open('openapi.json'))
for path, item in d['paths'].items():
    for method, op in item.items():
        if path.startswith('/cli/'):
            print(method.upper(), path, op['operationId'])"`,
  },
  {
    title: 'List the manifest kinds',
    text: 'The SAMKind enum is the list that the CLI’s contract test checks every kind it sends against.',
    code: `python3 -c "import json; d = json.load(open('openapi.json')); print(d['components']['schemas']['SAMKind']['enum'])"`,
  },
  {
    title: 'Read one field of one kind’s schema',
    text: 'The Guardrail action’s allowed values, from the committed schema on GitHub: the same list that every client validates against.',
    code: `curl -s ${CONTRACT_RAW}/sam/Guardrail.schema.json | python3 -c "import json, sys; s = json.load(sys.stdin); print(s['\\$defs']['SAMGuardrailSpecConfig']['properties']['action']['enum'])"`,
  },
  {
    title: 'Generate a typed client',
    text: 'One command, with a tool that was never written for Smarter. Search the result for kind: "Guardrail": the discriminator made kind a literal type.',
    code: 'npx openapi-typescript openapi.json -o smarter.d.ts',
  },
]

// What to try in the live chat, and what each experiment shows.
export const experiments = [
  {
    prompt: 'Show me how to apply a Guardrail manifest from Python, Node.js and Go.',
    observe:
      'Three languages, the same resources and the same verbs. The Python SDK is the reference implementation, and the other two follow it, because all three are tested against the same document.',
  },
  {
    prompt: 'What does smarter apply do, and which api endpoint does it call?',
    observe:
      'A POST to /api/v1/cli/apply/, with the manifest as the YAML that was read from disk. The CLI never parses it: the platform validates it.',
  },
  {
    prompt: 'How does the Go SDK generate its manifest types?',
    observe:
      'Ada should find samgen, in internal/cmd/samgen, and explain why it fails on a JSON Schema construct it doesn’t know, instead of guessing.',
  },
  {
    prompt:
      'What happens to the Node.js SDK if a newer platform adds a field to a manifest?',
    observe:
      'Nothing breaks: the SDK drops additionalProperties: false from the schemas it validates with, and keeps unknown fields. Ask the same about the CLI, which never parses a manifest at all.',
  },
]

export const labExercises = [
  {
    title: 'Hover to read the platform’s docstring',
    text: 'Open pii-redaction-input.yaml, and hover over action. The text is the description of a Pydantic field in the platform’s Django code, carried through the schema without being copied by hand. The VS Code extension shows the same text.',
  },
  {
    title: 'Break an enum',
    text: 'Change action: redact to action: shred. The check fails, and lists the six allowed values: Figure 3’s list.',
  },
  {
    title: 'Break a range',
    text: 'In account-monthly-cap.yaml, change warningThreshold: 75 to 150. Which keyword of the schema rejects it?',
  },
  {
    title: 'Strict and tolerant, in one schema',
    text: 'In llmclient-customer-support.yaml, misspell borderRadius under styles as borderRadious. It fails: styles are written into web pages, so their schema forbids unknown keys. Now add owner: you under metadata. It passes. Why might a schema be strict in one place and tolerant in another?',
  },
  {
    title: 'Follow the kinds',
    text: 'In llmclient-smarter-sdk-guide.yaml, find mcpClients. How many repositories does Ada read, and which clients of this case are they?',
  },
]

export const sections = [
  { id: 'situation', label: 'The situation' },
  { id: 'problem', label: 'The problem' },
  { id: 'contract', label: 'What a contract is' },
  { id: 'seam', label: 'Where to put the seam' },
  { id: 'files', label: 'The contract’s files' },
  { id: 'generated', label: 'Generated, never written' },
  { id: 'clients', label: 'Six clients, one document' },
  { id: 'try', label: 'Lab 1: Talk to Ada' },
  { id: 'explore', label: 'Lab 2: Read the contract' },
  { id: 'change', label: 'A change, end to end' },
  { id: 'versioning', label: 'Breaking changes and versions' },
  { id: 'lab', label: 'Lab 3: The schemas' },
  { id: 'limits', label: 'Limits and takeaways' },
  { id: 'discussion', label: 'Discussion questions' },
  { id: 'reading-list', label: 'Further reading' },
]

export const discussion = [
  'Smarter’s SAM models are Pydantic models that depend on Django. Why not split them into a small package that every Python client imports, as smarter-types does for the list of kinds? What would that solve, and what would it leave unsolved for Go and TypeScript?',
  'The Node.js SDK removes additionalProperties: false before it validates; the LLMClient styles schema keeps it on purpose. Who is each choice protecting, and from what?',
  'The Go SDK wrote its own generator, which fails on any JSON Schema construct it doesn’t know. When is a small generator that you own better than a popular one that you don’t?',
  'The CLI never parses or validates a manifest. What does it gain? What does a user lose, compared with the VS Code extension’s validation as they type?',
  'A rule that the platform enforces only in a broker’s code, and not in a model’s types, isn’t in the document. Find an example of such a rule in a system you know. How would you move it into the contract?',
  'ADR-023 versions the REST API by url path, not by request header. Argue for the header. Then explain why the project chose the path.',
  'Every client pins a platform release with SMARTER_REF. What could go wrong if the clients followed main instead?',
]

export const readingList = [
  {
    title: 'Smarter’s OpenAPI Contract (the source post)',
    url: POST,
  },
  { title: 'The Smarter OpenAPI contract', url: CONTRACT_DOCS },
  {
    title: 'The API contract in detail',
    url: `${DOCS}/en/latest/smarter-framework/smarter-api/api-contract.html`,
  },
  {
    title: 'APIs and SDKs',
    url: `${DOCS}/en/latest/smarter-framework/apis-and-sdks.html`,
  },
  {
    title: 'ADR-031: Pydantic models over raw JSON',
    url: `${DOCS}/en/latest/adr/031-pydantic-over-json.html`,
  },
  {
    title: 'ADR-023: API versioning',
    url: `${DOCS}/en/latest/adr/023-api-versioning.html`,
  },
  {
    title: 'v0.21 – v0.23: a published API contract, and a Node.js SDK',
    url: `${BLOG}2026/10/17/release-v0-21-v0-23/`,
  },
  {
    title: 'smarter-types: one definition of the manifest kinds',
    url: `${BLOG}2026/10/26/release-smarter-types-v0-1/`,
  },
  {
    title: 'The OpenAPI 3.1 specification',
    url: 'https://spec.openapis.org/oas/v3.1.0.html',
  },
  { title: 'JSON Schema 2020-12', url: 'https://json-schema.org/draft/2020-12' },
  { title: 'Semantic Versioning 2.0.0', url: 'https://semver.org/' },
  {
    title: 'The case study of the Smarter Project MCP server',
    url: '/case-studies/mcp-server',
  },
]
