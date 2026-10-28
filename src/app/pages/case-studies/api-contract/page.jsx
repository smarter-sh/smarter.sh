import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import SmartLink from '@/components/site/SmartLink'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import {
  ManifestLab,
  ManifestLink,
  ManifestProvider,
} from '@/components/manifest/ManifestViewer'
import { chatbots } from '@/common/chatbots'
import { DOCS, OPENAPI_DOCS } from '@/common/constants'
import {
  Callout,
  CardGrid,
  Code,
  CodeBlock,
  Commands,
  Contents,
  Exercises,
  Experiments,
  Glance,
  Part,
  Questions,
  ReadingList,
  Table,
  TextLink,
} from '../components/Teaching'
import SequenceDiagram from '../components/SequenceDiagram'
import SeamDiagram from './components/SeamDiagram'
import ContractExplorer from './components/ContractExplorer'
import {
  CLI_TEST_CODE,
  CONTRACT_DOCS,
  CONTRACT_SOURCE,
  DISCRIMINATOR_CODE,
  OPENAPI_RAW,
  POST,
  PYDANTIC_CODE,
  PYTHON_TEST_CODE,
  ROUTE_TEST_CODE,
  SCHEMA_CODE,
  SDK_CODE,
  actors,
  clients,
  compatibility,
  contractFiles,
  discussion,
  experiments,
  facts,
  files,
  generationRules,
  generators,
  github,
  labCommands,
  labExercises,
  objectives,
  readingList,
  repo,
  seams,
  sections,
  sequence,
  versions,
} from './data'

/*
 * Case Study: One Contract, Five Clients.
 *
 * A lesson, in the form of a business-school case, built on the platform's api contract
 * (smarter/apps/api/v1/contract) and the blog post "Smarter's OpenAPI Contract": why a platform with
 * clients in many languages needs a machine-readable contract, where to put the seam, how the contract is
 * generated from the models that build the responses and tested on both sides, and how a breaking change
 * is caught and versioned. Ada, the Smarter SDK Guide, is live (src/common/chatbots.js); the committed
 * openapi.json loads from GitHub into an explorer; the reader runs the same reads with curl and Python;
 * and four manifests open, from GitHub, in the site's manifest editor, which validates them against the
 * same JSON Schemas.
 */

const ApiContract = () => {
  return (
    <PageShell
      title="Case Study: One Contract, Five Clients"
      description="A teaching case: how one OpenAPI document and a JSON Schema per manifest kind keep Smarter's Python, Node.js and Go SDKs, its CLI, its VS Code extension and its React chat in agreement with the platform, with no shared code. With a live SDK guide, an explorer for the contract, curl labs and a schema-checked manifest editor."
    >
      <ManifestProvider repo={repo} files={files}>
        <PageHero
          eyebrow="Case study"
          title="One Contract,"
          highlight="Five Clients"
          accent="emerald"
          lead="How an open source platform keeps SDKs in three languages, a command-line tool and an editor extension in agreement with it, without sharing a line of code: one generated document, committed, and tested from both sides."
        >
          <Button href="#explore" icon="lucide:file-json">
            Explore the contract
          </Button>
          <Button href="#try" variant="secondary" icon="lucide:message-circle">
            Talk to Ada
          </Button>
          <Button href={CONTRACT_SOURCE} variant="secondary" icon="lucide:github">
            The contract’s source
          </Button>
        </PageHero>

        <Glance
          objectives={objectives}
          facts={facts}
          duration="About 60 minutes, with all three labs."
        />

        <div className="container">
          <div className="mx-auto mt-4 max-w-6xl rounded-lg border border-keen-300 bg-keen-100 px-5 py-3 text-sm text-keen-700">
            <IconifyIcon
              icon="lucide:info"
              className="me-2 inline h-4 w-4 -translate-y-px"
            />
            Everything in this case is real: the contract, the clients and their tests are
            public on GitHub, and the document you’ll download is served by a running
            platform. The case is adapted from the blog post{' '}
            <TextLink href={POST}>Smarter’s OpenAPI Contract</TextLink>, and its numbers
            are those of v0.37.
          </div>

          <div className="mx-auto mt-6 grid max-w-6xl gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <Contents sections={sections} />
            </aside>

            <article className="min-w-0">
              <Part id="situation" number={1} title="The situation">
                <p>
                  Smarter is an open source platform, written in Django, for building and
                  governing AI applications. Its resources, such as assistants, plugins,
                  guardrails, secrets and budgets, 25 kinds in all, are declared in YAML
                  manifests, and managed through one REST API.
                </p>
                <p>
                  Few of the people who use that API write Python inside the platform. A
                  data scientist scripts it from a notebook. A platform engineer drives it
                  from a command-line tool in a CI pipeline. A prompt engineer writes
                  manifests in VS Code and expects autocomplete. A web developer embeds a
                  chat on a WordPress page. So the project maintains six clients, in their
                  own repositories and their own languages:
                </p>
                <ul className="mb-6 flex max-w-3xl flex-wrap gap-2">
                  {clients.map((client) => (
                    <li
                      key={client.name}
                      className="rounded-full border border-keen-300 bg-white px-4 py-1.5 font-mono text-sm text-keen-800"
                    >
                      {client.name}
                    </li>
                  ))}
                </ul>
                <p>
                  Five of them live in repositories of their own; the sixth, the chat,
                  lives beside the platform. The platform changes many times a week. This
                  case is about how six clients keep up with it, and how they find out,
                  before their users do, when they can’t.
                </p>
              </Part>

              <Part
                id="problem"
                number={2}
                title="The problem: every client needs to know the API’s shape"
              >
                <p>
                  Every client has to know the shape of 25 manifest kinds, and of every
                  request and response. Before v0.21, that knowledge lived only in the
                  running platform. The Python SDK downloaded each kind’s schema from a
                  live server; the CLI’s types were written by hand; and the platform’s
                  API page was OpenAPI 2, with untyped bodies, so nothing useful could be
                  generated from it.
                </p>
                <p>
                  That’s the usual state of affairs, and it fails in a familiar way.
                  Rename a field on the platform, and somewhere a Go binary, a WordPress
                  page and a notebook break at once. You find out from them.
                </p>
                <Callout type="exercise" title="Before you read on">
                  <p>
                    Think of an API you’ve called from code. Where did you learn the shape
                    of its responses: documentation, an example, or by printing one? If
                    the API renamed a field tomorrow, how and when would you find out?
                  </p>
                </Callout>
              </Part>

              <Part id="contract" number={3} title="What an API contract is">
                <Callout type="term" title="API contract">
                  <p>
                    A precise statement of what an API accepts and returns, that both the
                    provider and its clients agree to depend on: which urls exist, which
                    methods each takes, the shape of every request and response, and the
                    errors. Everything not in the contract, the provider may change at
                    will.
                  </p>
                </Callout>
                <p>
                  A contract written in prose is better than nothing, but only people can
                  read it. A contract that machines can read can be checked by tests,
                  turned into code, and rendered as documentation. Two standards do this
                  for HTTP and JSON.
                </p>
                <Callout type="term" title="JSON Schema">
                  <p>
                    A JSON document that describes the allowed shape of other JSON
                    documents: each field’s type, which fields are required, the allowed
                    values of an enum, a number’s minimum and maximum, and a description.
                    Validators in every language check data against it.
                  </p>
                </Callout>
                <Callout type="term" title="OpenAPI">
                  <p>
                    A standard, machine-readable description of an HTTP API: every path,
                    its methods, its parameters, and the JSON Schema of each request and
                    response. Each operation has an <Code>operationId</Code>, a name that
                    tools and tests use for it. In OpenAPI 3.1, the schemas are exactly
                    JSON Schema 2020-12.
                  </p>
                </Callout>
                <Callout type="term" title="Code generation">
                  <p>
                    Writing source code with a program, from a description, instead of by
                    hand: here, the types of a client, from the contract. Generated code
                    is regenerated when the description changes, never edited.
                  </p>
                </Callout>
              </Part>

              <Part id="seam" number={4} title="Where to put the seam">
                <p>
                  The real decision is where to put the <strong>seam</strong>: the line
                  between what the platform owns, and may change, and what everyone else
                  is allowed to depend on. There are four reasonable places.
                </p>
                <CardGrid cards={seams} numbered />
                <p>
                  Smarter put the seam at the fourth. Its strength isn’t elegance; it’s
                  ubiquity. The clients use four different off-the-shelf tools against the
                  same files, and none of them was written for Smarter. And there’s a
                  happy coincidence: OpenAPI 3.1’s schemas are exactly what Pydantic
                  emits, and the platform already validates every manifest with Pydantic.
                  So the contract isn’t a second description of the API. It’s the first
                  one, exported.
                </p>
                <SeamDiagram />
                <Callout
                  type="idea"
                  title="Put the seam where the most technologies can reach it"
                >
                  <p>
                    Behind the seam sit brokers, ORM models, caching, tenants, Kubernetes
                    and a journal of every request, and they change often. A client that
                    imported any of it would change with it. None of it crosses.
                  </p>
                </Callout>
              </Part>

              <Part id="files" number={5} title="The contract’s files">
                <p>
                  The contract lives in{' '}
                  <TextLink href={CONTRACT_SOURCE}>
                    smarter/apps/api/v1/contract/
                  </TextLink>
                  , plus the chat contract in the prompt app. Every file is generated.
                </p>
                <Table head={['File', 'What it describes']} rows={contractFiles} />
                <p>
                  Every platform also serves its own copy of the document at{' '}
                  <Code>/docs/openapi.json</Code>, with its own <Code>/api/v1</Code> as
                  the first server, and renders it at{' '}
                  <TextLink href={OPENAPI_DOCS}>/docs/openapi/</TextLink>, where you can
                  read the whole API, and try it, without opening the repository.
                </p>
              </Part>

              <Part
                id="generated"
                number={6}
                title="Generated from the code, never written"
              >
                <p>
                  A document written by hand describes what someone remembered. This one
                  is exported from the same Pydantic models that the platform validates
                  manifests with and builds its responses from. Four rules keep it honest:
                </p>
                <CardGrid cards={generationRules} />
                <p>
                  Follow one field, the action of a Guardrail, from the platform’s Python
                  to the published schema:
                </p>
                <CodeBlock
                  code={PYDANTIC_CODE}
                  number={2}
                  caption="The field, in the platform’s Pydantic model of a Guardrail’s spec.config, trimmed."
                />
                <CodeBlock
                  code={SCHEMA_CODE}
                  number={3}
                  caption="The same field, in the committed Guardrail.schema.json, abridged. The description a platform developer writes becomes every client’s documentation."
                />
                <p>
                  A few choices exist only so that off-the-shelf generators produce good
                  clients. A manifest of any kind is a <Code>oneOf</Code> over every
                  kind’s schema, with a <strong>discriminator</strong> on{' '}
                  <Code>kind</Code>. The models declare <Code>kind</Code> as a plain
                  string, which would match every branch, so the document pins each one to
                  a constant:
                </p>
                <CodeBlock
                  code={DISCRIMINATOR_CODE}
                  number={4}
                  caption={
                    <>
                      From{' '}
                      <TextLink
                        href={github(
                          'smarter',
                          'smarter/smarter/apps/api/v1/contract/openapi.py'
                        )}
                      >
                        openapi.py
                      </TextLink>
                      . A generated TypeScript client then types kind as a literal, and
                      narrows a manifest’s spec by its kind, for free.
                    </>
                  }
                />
                <p>
                  Every response shares one envelope, the Smarter Journal’s, with the
                  command’s data beside it. A prompt’s streamed response, which OpenAPI
                  can’t type, names each Server-Sent Event’s schema in an{' '}
                  <Code>x-smarter-events</Code> extension, which generators ignore and
                  clients may read.
                </p>
                <h3>A route can’t ship undocumented</h3>
                <p>
                  The document declares which families of routes it covers, and a test
                  walks every route of each:
                </p>
                <CodeBlock
                  code={ROUTE_TEST_CODE}
                  number={5}
                  caption={
                    <>
                      From{' '}
                      <TextLink
                        href={github(
                          'smarter',
                          'smarter/smarter/apps/api/v1/contract/tests/test_openapi.py'
                        )}
                      >
                        test_openapi.py
                      </TextLink>
                      . A second test does the same for whole families, so a new app that
                      mounts routes under /api/v1 fails the build until they’re described.
                    </>
                  }
                />
                <Callout type="idea">
                  <p>
                    A document generated from the code, and tested against the code, can’t
                    drift from the code.
                  </p>
                </Callout>
              </Part>

              <Part id="clients" number={7} title="Six clients, one document">
                <p>
                  Here is what each client reads, and what it does with it. Five of them
                  copy the contract into their own repository with the same command,{' '}
                  <Code>make contracts SMARTER_REF=&lt;tag&gt;</Code>, pinned to a
                  platform release.
                </p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">
                  {clients.map((client) => (
                    <div
                      key={client.name}
                      className="rounded-xl border border-keen-300 bg-white p-5 shadow-card"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-keen-100 text-keen-800">
                          <IconifyIcon icon={client.icon} className="h-5 w-5" />
                        </span>
                        <div>
                          <SmartLink
                            href={client.url}
                            className="font-mono font-semibold text-keen-900 hover:text-primary"
                          >
                            {client.name}
                          </SmartLink>
                          <p className="text-xs text-keen-600">{client.language}</p>
                        </div>
                      </div>
                      <p className="mb-2 text-sm text-keen-700">
                        <strong className="text-keen-800">Reads: </strong>
                        {client.reads}
                      </p>
                      <p className="text-sm leading-relaxed text-keen-600">
                        {client.does}
                      </p>
                    </div>
                  ))}
                </div>
                <p>The generators are all ordinary tools, except one:</p>
                <Table
                  head={['Tool', 'Language', 'What it does here']}
                  rows={generators}
                />
                <h3>Tested in both directions</h3>
                <p>
                  Each SDK’s contract test runs every SDK method against a mock platform,
                  matches each recorded request to an <Code>operationId</Code>, and fails
                  both ways: on a request that isn’t in the document, and on an operation
                  in the document that the SDK doesn’t call, and hasn’t said why.
                </p>
                <CodeBlock
                  code={PYTHON_TEST_CODE}
                  number={6}
                  caption={
                    <>
                      From smarter-python’s{' '}
                      <TextLink
                        href={github('smarter-python', 'tests/test_contracts.py')}
                      >
                        tests/test_contracts.py
                      </TextLink>
                      . The Go and Node.js SDKs make the same check, with the same list of
                      operations they deliberately don’t call.
                    </>
                  }
                />
                <p>
                  The CLI shows that a client doesn’t have to generate anything to
                  benefit. It sends a manifest as the YAML it read from disk, and never
                  parses it: the platform validates it. Its table view takes its columns
                  from the response, so a new field shows up in <Code>smarter get</Code>{' '}
                  without a CLI release. Its contract test still checks every command:
                </p>
                <CodeBlock
                  code={CLI_TEST_CODE}
                  number={7}
                  caption={
                    <>
                      From smarter-cli’s{' '}
                      <TextLink href={github('smarter-cli', 'contract_test.go')}>
                        contract_test.go
                      </TextLink>
                      . Its ADR-022: “A renamed route, a removed kind or a new kind fails
                      a unit test, in CI, rather than reaching users.”
                    </>
                  }
                />
                <Callout
                  type="caution"
                  title="A fixture that drifts makes every test lie"
                >
                  <p>
                    Tests that use hand-written mock responses pass against responses the
                    platform never sends. So the clients validate their fixtures, too:
                    smarter-python checks responses recorded from a real platform against
                    each operation’s schema, and Smarter Chat checks every mock of its
                    tests and stories against the chat contract.
                  </p>
                </Callout>
              </Part>

              <Part id="try" number={8} title="Lab 1: Talk to Ada">
                <p>
                  Ada, the Smarter SDK Guide, answers from the source code of the
                  platform, the three SDKs and the CLI, through one MCPClient per
                  repository. Ask her how the clients work, and compare the answers across
                  languages.
                </p>
                <div className="my-8 max-w-3xl">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-keen-900">
                      Ada, the Smarter SDK Guide
                    </h3>
                    <p className="text-sm text-keen-600">
                      LLMClient ·{' '}
                      <ManifestLink path="llm-clients/llmclient-smarter-sdk-guide.yaml" />
                    </p>
                  </div>
                  <SmarterChatEmbed bot={chatbots.sdkGuide} height="640px" />
                </div>
                <h3>Experiments</h3>
                <Experiments experiments={experiments} />
                <h3>The same call, four ways</h3>
                <p>
                  From the clients’ READMEs. Every one of these requests is an operation
                  of the same document.
                </p>
                <div className="grid gap-4 xl:grid-cols-2">
                  {SDK_CODE.map((sample) => (
                    <div key={sample.language}>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-keen-600">
                        {sample.language}
                      </p>
                      <CodeBlock code={sample.code} />
                    </div>
                  ))}
                </div>
              </Part>

              <Part id="explore" number={9} title="Lab 2: Read the contract yourself">
                <p>
                  Start in the browser. This loads the committed document from GitHub, the
                  same file every client copies, and lists its operations:
                </p>
                <ContractExplorer url={OPENAPI_RAW} />
                <p>
                  Then do it the way a client’s author would, in a terminal. The document
                  of the platform at ubc.smarter.sh is public, and these commands only
                  read.
                </p>
                <Commands commands={labCommands} />
                <Callout type="exercise" title="Compare">
                  <p>
                    The last command needs Node.js, and writes over 16,000 lines of
                    TypeScript in under a second. How long would it take to write those
                    types by hand, and how long would they stay correct?
                  </p>
                </Callout>
              </Part>

              <Part id="change" number={10} title="A change, end to end">
                <p>
                  Here is what happens when a platform developer renames a field, a
                  breaking change, from the first failing test to the last.
                </p>
                <SequenceDiagram
                  actors={actors}
                  steps={sequence}
                  caption={
                    <>
                      <strong className="text-keen-800">Figure 9.</strong> A breaking
                      change. It fails twice, both times in CI: first on the platform,
                      where the committed contract is stale, then in each client, where
                      the code still uses the old name. No user sees it.
                    </>
                  }
                />
                <p>
                  On the client side, a failing contract test after a refresh is how its
                  author learns what changed, and the failure says exactly where. And the
                  diff of <Code>openapi.json</Code> between two release tags is a precise
                  list of the API’s changes, which the CLI’s ADR-022 calls out as a
                  benefit in itself.
                </p>
              </Part>

              <Part id="versioning" number={11} title="Breaking changes, and versions">
                <Callout type="term" title="Breaking change">
                  <p>
                    A change to an interface after which a client that worked before may
                    not. Removing a field breaks every client that reads it; adding an
                    optional one breaks none that ignore what they don’t know.
                  </p>
                </Callout>
                <p>
                  The pull request’s diff of the contract is reviewed as a client would
                  read it, sorted into two columns:
                </p>
                <Table
                  head={['Backward compatible', 'Breaking for clients']}
                  rows={compatibility}
                  mono={false}
                />
                <Callout type="term" title="Semantic versioning">
                  <p>
                    A version number <Code>MAJOR.MINOR.PATCH</Code> that promises
                    something: a patch fixes, a minor release adds without breaking, and a
                    major release may break. Every Smarter repository is released this
                    way, by semantic-release, from its commit messages.
                  </p>
                </Callout>
                <p>
                  But one version number can’t describe everything.{' '}
                  <TextLink href={`${DOCS}/en/latest/adr/023-api-versioning.html`}>
                    ADR-023
                  </TextLink>{' '}
                  versions each public interface on its own. An earlier decision tied them
                  all to the platform’s version, and it never worked: the platform
                  releases many times a week, mostly for changes that touch no interface,
                  and every major release would have moved every client to new urls for an
                  API that hadn’t changed.
                </p>
                <Table
                  head={['Interface', 'Versioned by', 'What that means']}
                  rows={versions}
                />
                <Callout type="idea" title="Version what clients depend on, separately">
                  <p>
                    Clients pin the platform release they test against, with{' '}
                    <Code>SMARTER_REF</Code>, but they depend on <Code>/api/v1</Code> and{' '}
                    <Code>smarter.sh/v1</Code>. Those change only when an interface
                    breaks, so most platform upgrades need no change to a client at all.
                  </p>
                </Callout>
                <p>
                  A client can also make itself harder to break. The Node.js SDK removes{' '}
                  <Code>additionalProperties: false</Code> from the schemas it validates
                  with, and keeps unknown fields, so a newer platform’s new fields don’t
                  break an older SDK. That’s the <em>tolerant reader</em>: be strict in
                  what you send, and forgiving in what you accept.
                </p>
              </Part>

              <Part id="lab" number={12} title="Lab 3: The schemas in an editor">
                <p>
                  The site’s manifest editor validates as you type against the committed
                  JSON Schema of each kind, with Ajv, a JSON Schema validator for
                  JavaScript. The VS Code extension does the same with the same schemas,
                  and so does a manifest repository’s check on every pull request. Hover
                  over any key to read its description.
                </p>
                <div className="my-8">
                  <ManifestLab initialPath="guardrails/pii-redaction-input.yaml" />
                </div>
                <h3>Exercises</h3>
                <Exercises exercises={labExercises} />
                <Callout type="idea" title="Write good field descriptions">
                  <p>
                    They become every client’s docstrings, tooltips and API reference. The
                    Python SDK’s generator carries each one into its models with{' '}
                    <Code>--use-field-description</Code>; the VS Code extension shows it
                    on hover; the editor above does too.
                  </p>
                </Callout>
              </Part>

              <Part id="limits" number={13} title="Limits, and takeaways">
                <p>
                  The contract can only be as precise as the schemas. A rule that the
                  platform enforces only in a broker’s code, and not in a model’s types,
                  isn’t in the document, so no client can check it ahead of time. The
                  document doesn’t say which kinds can be deployed, so the CLI asks the
                  platform’s <Code>resources</Code> command instead. And a few generators
                  read only OpenAPI 3.0; the project keeps 3.1, whose schemas are exactly
                  what Pydantic emits, and would publish a converted copy beside it rather
                  than downgrade.
                </p>
                <p>
                  Each of those limits sits on the platform’s side of the seam, where it
                  can be fixed once, for every client.
                </p>
                <Callout type="exercise" title="Takeaways, to keep">
                  <ol className="list-decimal space-y-1 ps-5">
                    <li>Put the seam at a standard document, not at shared code.</li>
                    <li>
                      Generate the document from the models that build the responses.
                    </li>
                    <li>Commit the generated files, so a change to the API is a diff.</li>
                    <li>
                      Test that every route is documented, with a short list of
                      exceptions.
                    </li>
                    <li>Test real responses against the document, on both sides.</li>
                    <li>
                      Let each client pin a version, and test itself in both directions.
                    </li>
                    <li>Keep the clients thin, and let the server validate.</li>
                    <li>Version each interface separately from the product.</li>
                  </ol>
                </Callout>
                <p>
                  If you want a client in a language Smarter doesn’t cover yet, you need
                  nothing beyond a platform’s <Code>/docs/openapi.json</Code>. That’s the
                  point of putting the seam there.
                </p>
              </Part>

              <Part id="discussion" number={14} title="Discussion questions">
                <p>For a classroom, a study group, or your own notes.</p>
                <Questions questions={discussion} />
              </Part>

              <Part id="reading-list" number={15} title="Further reading">
                <ReadingList items={readingList} />
              </Part>
            </article>
          </div>
        </div>

        <CtaBand
          title="Build the next client"
          text="Pick a language that Smarter has no SDK for, generate its types from openapi.json, and write the contract test first. Everything you need is in one document."
        >
          <Button href={CONTRACT_DOCS} icon="lucide:book-open">
            Read the contract’s documentation
          </Button>
          <Button href={OPENAPI_DOCS} variant="secondary" icon="lucide:file-json">
            Browse the API
          </Button>
        </CtaBand>
      </ManifestProvider>
    </PageShell>
  )
}
export default ApiContract
