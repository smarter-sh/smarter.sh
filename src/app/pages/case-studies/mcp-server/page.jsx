import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import {
  ManifestLab,
  ManifestLink,
  ManifestProvider,
} from '@/components/manifest/ManifestViewer'
import { chatbots } from '@/common/chatbots'
import { QUICK_START, SMARTER_PROJECT_MCP } from '@/common/constants'
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
  Steps,
  Table,
  TextLink,
} from '../components/Teaching'
import SequenceDiagram from '../components/SequenceDiagram'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import {
  EXCLUDED_CODE,
  MCP_DOCS,
  POST,
  SAMPLE_RESULT,
  SCORE_CODE,
  SERVER_INSTRUCTIONS,
  SOURCE,
  STORE_CODE,
  actors,
  challenges,
  curlCommands,
  discussion,
  experiments,
  facts,
  files,
  indexSteps,
  keywordReasons,
  labExercises,
  methods,
  objectives,
  promptTechniques,
  readingList,
  repo,
  scoreParts,
  sections,
  sequence,
  sourceFile,
  toolPrinciples,
  tools,
  whyItWorks,
} from './data'

/*
 * Case Study: The Smarter Project MCP Server.
 *
 * A lesson, in the form of a business-school case, built on the platform's mcpserver app and the blog post
 * "How Smarter's MCP Server Works": why an AI model can't answer from a large, changing codebase, how
 * tool calling and the Model Context Protocol let it look things up, and the design decisions (an index,
 * keyword search, tools and instructions written for an LLM, a stateless server) that make it work. Sam,
 * the Smarter Developer Guide, is live (src/common/chatbots.js); the server is called by hand with curl;
 * and the MCPClient and LLMClient manifests open, from GitHub, in the site's manifest editor.
 */

const McpServer = () => {
  return (
    <PageShell
      title="Case Study: The Smarter Project MCP Server"
      description="A teaching case: how an open source project lets any AI model answer from its 21 repositories and its blog instead of from memory, with tool calling, the Model Context Protocol, an hourly index, keyword search and prompts written for an LLM. With a live assistant, curl labs and an editor for its manifests."
    >
      <ManifestProvider repo={repo} files={files}>
        <PageHero
          eyebrow="Case study"
          title="The Smarter Project"
          highlight="MCP Server"
          accent="emerald"
          lead="How an open source project lets any AI model answer from its own source code, documentation and blog, instead of from memory, with two database tables, an hourly task and some carefully written English."
        >
          <Button href="#try" icon="lucide:message-circle">
            Talk to Sam
          </Button>
          <Button href="#curl" variant="secondary" icon="lucide:terminal">
            Call the server
          </Button>
          <Button href={SOURCE} variant="secondary" icon="lucide:github">
            The mcpserver app
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
            Everything in this case is real and running: the server, its index, Sam and
            the endpoint you’ll call. Claude Code designed and wrote the server, with
            Lawrence McDaniel as co-author. The case is adapted from the blog post{' '}
            <TextLink href={POST}>How Smarter’s MCP Server Works</TextLink>, and describes
            the code as of v0.37.
          </div>

          <div className="mx-auto mt-6 grid max-w-6xl gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <Contents sections={sections} />
            </aside>

            <article className="min-w-0">
              <Part id="situation" number={1} title="The situation">
                <p>
                  The Smarter Project is an open source platform for building and
                  governing AI applications. It isn’t one program. It’s 21 public
                  repositories on GitHub: the Django platform and its documentation, a
                  command-line tool, SDKs for Python, Node.js and Go, a VS Code extension,
                  a chat component, plugins for WordPress, Drupal and Shopify, cloud
                  infrastructure, example manifests, and more. The platform alone has
                  about 240,000 lines of Python. A blog explains why it was built the way
                  it is.
                </p>
                <p>
                  Every day, developers who want to use or change it ask questions like:
                </p>
                <ul className="mb-6 flex max-w-3xl flex-wrap gap-2">
                  {[
                    'How does Smarter verify a custom domain?',
                    'Write me an MCPClient manifest.',
                    'Where is a tool call dispatched to an MCP server?',
                  ].map((question) => (
                    <li
                      key={question}
                      className="rounded-full border border-keen-300 bg-white px-4 py-1.5 text-sm italic text-keen-800"
                    >
                      “{question}”
                    </li>
                  ))}
                </ul>
                <p>
                  The project wants any AI assistant, its own chatbots, Claude Code, an
                  IDE, to answer them accurately, from the code as it is today, and to
                  show where the answer came from. This case is about how it does that.
                </p>
              </Part>

              <Part
                id="problem"
                number={2}
                title="The problem: the model’s memory is old, and the project is big"
              >
                <p>
                  An AI model knows only what was in its training data. Its knowledge
                  stops on the day that data was collected, so it knows nothing about last
                  week’s release. It may also confuse one project with another: there is
                  more than one “Smarter” in the world.
                </p>
                <p>
                  The obvious fix is to paste the project into the prompt. That doesn’t
                  work either.
                </p>
                <Callout type="term" title="Context window">
                  <p>
                    Everything a model reads in one request, its instructions, the
                    conversation and any documents, is its <em>context</em>. The context
                    has a fixed maximum size, the context window, and every token in it is
                    paid for, on every request.
                  </p>
                </Callout>
                <p>
                  21 repositories are far more than any context window holds. So instead
                  of giving the model everything, you let it look things up, a little at a
                  time, as it needs them. It searches, reads the best results, and answers
                  from what it read.
                </p>
                <Callout
                  type="term"
                  title="Retrieval-augmented generation (RAG) and grounding"
                >
                  <p>
                    RAG is the pattern of retrieving relevant text and handing it to the
                    model before it answers. Answering from retrieved text instead of from
                    memory is called <em>grounding</em>. The Smarter Project MCP server is
                    the retrieval half of that pattern, built for a codebase.
                  </p>
                </Callout>
                <Callout type="exercise" title="Before you read on">
                  <p>
                    Ask the AI chatbot you use every day:{' '}
                    <em>
                      “In the open source Smarter platform, at smarter.sh, which file
                      verifies a custom domain, and how?”
                    </em>{' '}
                    Note what it says, and whether it links to anything you can check.
                    Keep the answer: you’ll compare it with Sam’s in Lab 1.
                  </p>
                </Callout>
              </Part>

              <Part
                id="mcp"
                number={3}
                title="Tool calling, and the Model Context Protocol"
              >
                <p>
                  A model only produces text. It can’t open a file or query a database.{' '}
                  <strong>Tool calling</strong> gets around that without giving the model
                  any powers at all. The application tells the model which tools it may
                  use: each with a name, a description in plain English, and a JSON Schema
                  of its arguments. Instead of answering, the model may reply with a tool
                  call, naming a tool and its arguments. The application, not the model,
                  decides whether to run it, and sends back the result. The model reads
                  it, and asks for more, or answers.
                </p>
                <SequenceDiagram
                  actors={actors}
                  steps={sequence}
                  caption={
                    <>
                      <strong className="text-keen-800">Figure 1.</strong> One question,
                      end to end: two rounds, three tool calls, and a handful of database
                      queries. GitHub isn’t contacted once.
                    </>
                  }
                />
                <p>
                  Tool calls had one weakness. Every application defined its tools its own
                  way, so a tool written for one chatbot didn’t work in another. With N
                  applications and M tools, that’s N × M integrations.
                </p>
                <Callout type="term" title="Model Context Protocol (MCP)">
                  <p>
                    An open standard, introduced by Anthropic in 2024, for how an AI
                    application discovers and calls tools that live in another program.
                    Write a tool once, as an MCP server, and every application that speaks
                    MCP can use it. N × M becomes N + M.
                  </p>
                </Callout>
                <p>
                  MCP has three roles. The <strong>host</strong> is the AI application
                  that runs the conversation: in Smarter, an LLMClient; Claude Code and
                  IDEs are hosts too. The <strong>client</strong> is the part of the host
                  that talks to one server: a Smarter LLMClient has one{' '}
                  <strong>MCPClient</strong>, a resource declared in a YAML manifest, for
                  each server it uses. The <strong>server</strong> offers the tools. It
                  knows nothing about the model; it just answers requests.
                </p>
                <p>
                  The messages are JSON-RPC 2.0: a request has a method, its params and an
                  id, and the response carries the same id, with a result or an error. A
                  server that only offers tools needs three methods:
                </p>
                <Table head={['Method', 'What the client asks']} rows={methods} />
                <p>
                  A remote server, like this one, receives each message as the body of an
                  HTTP POST, which makes it easy to try with curl. You will, in Lab 2.
                </p>
                <Callout type="idea">
                  <p>
                    The model never runs anything. It asks, and the application decides.
                    And once the protocol is settled, the only interesting question about
                    an MCP server is what its tools do, and how well.
                  </p>
                </Callout>
              </Part>

              <Part id="hard" number={4} title="Why answering from a codebase is hard">
                <p>
                  Figure 1 looks simple. Every arrow that reaches the server hides a
                  problem:
                </p>
                <CardGrid cards={challenges} numbered />
                <p>Each design decision in the rest of this case answers one of these.</p>
              </Part>

              <Part id="design" number={5} title="The design in one picture">
                <p>
                  The server is two separate paths that meet at the platform’s database.
                </p>
                <ArchitectureDiagram />
                <p>
                  <strong>Indexing</strong> runs in the background, every hour. A Celery
                  worker, a background process that runs queued tasks, fetches the
                  repositories from GitHub and the posts from the blog, and stores their
                  text in two tables. <strong>Answering</strong> happens on every tool
                  call: an MCP client POSTs a JSON-RPC message to a Django view, which
                  hands it to the server, which runs a tool, which reads those two tables.
                </p>
                <p>
                  This separation is the most important decision in the design. Downloads,
                  GitHub’s rate limit and GitHub’s outages all live on the indexing path,
                  where nobody is waiting. The answering path never leaves the platform. A
                  tool call costs a database query or two, and keeps working when GitHub
                  is down.
                </p>
                <Callout type="idea" title="What an index is">
                  <p>
                    The index at the back of a textbook exists so that every reader
                    doesn’t have to read the whole book to find one word. In software, an
                    index is any data structure prepared ahead of time so that a question
                    becomes cheap to answer. You spend work and storage up front, and
                    every lookup gets faster. Do the slow work once, so that the frequent
                    work is cheap.
                  </p>
                </Callout>
                <p>
                  This server’s index is a prepared copy of every useful text file, in two
                  Django models in{' '}
                  <TextLink href={sourceFile('models.py')}>models.py</TextLink>:{' '}
                  <Code>RepositoryIndex</Code>, one row per repository, recording the
                  commit that’s indexed, and <Code>RepositoryFile</Code>, one row per
                  file, with its path, its kind (documentation or code), its title and its
                  content.
                </p>
              </Part>

              <Part id="indexing" number={6} title="Building the index">
                <p>
                  <Code>index_repository()</Code>, in{' '}
                  <TextLink href={sourceFile('indexer.py')}>indexer.py</TextLink>, keeps
                  one repository’s index up to date with its main branch. Each of its six
                  steps solves a specific problem.
                </p>
                <Steps
                  steps={indexSteps.map((step) => (
                    <>
                      <strong className="text-keen-900">{step.title}. </strong>
                      {step.text}
                    </>
                  ))}
                />
                <Callout type="idea" title="Check a cheap fingerprint first">
                  <p>
                    Before redoing expensive work, check a cheap fingerprint of its input.
                    A commit sha changes whenever anything in the repository does, so one
                    small request decides whether the large one is needed. The blog has no
                    commits, so the indexer makes its own fingerprint, a hash of every
                    post’s id and modification time, and stores it in the same{' '}
                    <Code>commit_sha</Code> field. That let the blog reuse both tables,
                    the search and the read tools, with no new model.
                  </p>
                </Callout>
                <p>
                  Step 4 is a single list of patterns. Its comment says why better than
                  any paraphrase: a lock file mentions every package name, so it matches
                  almost every search, and explains nothing.
                </p>
                <CodeBlock
                  code={EXCLUDED_CODE}
                  number={3}
                  caption="What the indexer leaves out, from indexer.py."
                />
                <p>
                  Step 6 is what makes a refresh safe to run while people are searching:
                </p>
                <CodeBlock
                  code={STORE_CODE}
                  number={4}
                  caption="The swap, trimmed from indexer.py. Every change inside transaction.atomic() happens, or none does, and no other query sees it half-finished."
                />
                <Callout type="caution" title="A stale index beats an empty one">
                  <p>
                    If a refresh fails, the old index stays, and the error is recorded on
                    it for an administrator to see. If a tool is asked about a repository
                    that isn’t indexed yet, it says so, asks the model to try again in a
                    few minutes, and queues the repository, at most once every ten
                    minutes.
                  </p>
                </Callout>
              </Part>

              <Part id="search" number={7} title="Searching without embeddings">
                <p>
                  With the text in the database, the server must find the best files for a
                  query. There are two big families of search.{' '}
                  <strong>Keyword search</strong> finds documents that contain the query’s
                  words, and ranks them by how well they match.{' '}
                  <strong>Semantic search</strong> turns each document, and the query,
                  into an <em>embedding</em>, a long list of numbers that represents its
                  meaning, and finds documents whose embeddings are close to the query’s,
                  even when they share no words.
                </p>
                <p>
                  Most RAG tutorials start with embeddings. This server deliberately uses
                  keyword search, for four reasons:
                </p>
                <CardGrid cards={keywordReasons} />
                <h3>Ranking, step by step</h3>
                <p>
                  The ranking, in{' '}
                  <TextLink href={sourceFile('search.py')}>search.py</TextLink>, is a
                  version of a classic technique, <strong>TF-IDF</strong>: term frequency
                  times inverse document frequency. A word counts for more when it appears
                  often in a file, and rarely across all files.
                </p>
                <ol className="mb-6 max-w-3xl list-decimal space-y-2 ps-6 text-[15px] leading-relaxed text-keen-700">
                  <li>
                    The query is split into at most eight terms. A quoted phrase stays one
                    term, and so does an identifier with dots or underscores. Common words
                    like “how” and “does” are dropped.
                  </li>
                  <li>
                    Each term gets a weight from how rare it is, in one query. In an index
                    of 10,000 files, a term in 120 of them weighs about 5.4; a term in
                    4,000 weighs about 1.9. Rare words tell files apart.
                  </li>
                  <li>Every candidate file gets a score, computed in SQL:</li>
                </ol>
                <Table head={['For each term, a file…', 'earns']} rows={scoreParts} />
                <CodeBlock
                  code={SCORE_CODE}
                  number={5}
                  caption="The score, as a Django ORM expression, from search.py. The database does the arithmetic; only the ten or so winning files are read into Python."
                />
                <Callout type="caution" title="Cap what can be inflated">
                  <p>
                    Occurrences are capped at ten. Without the cap, a long changelog that
                    says “work” 200 times would beat a short guide that’s actually about
                    the question. With it, length alone can’t win.
                  </p>
                </Callout>
                <p>
                  Occurrences are counted inside the database with an old trick that works
                  in every SQL dialect: remove the term from the text, and divide the
                  change in length by the term’s length.{' '}
                  <Code>
                    (LENGTH(content) - LENGTH(REPLACE(content, term, &apos;&apos;))) /
                    LENGTH(term)
                  </Code>
                  .
                </p>
                <p>
                  A hit returns a passage, not a file. For documentation, it’s the lines
                  around the best-matching line, at most 900 characters, so the model
                  reads a sentence in context. For code, it’s the six lines with the most
                  terms, since code makes sense line by line. Every line keeps its number.
                </p>
                <Callout type="idea">
                  <p>
                    A search that only has to be good enough for a smart reader can be
                    simple. The cleverness belongs to the reader.
                  </p>
                </Callout>
              </Part>

              <Part id="tools" number={8} title="Tools designed for an LLM, not a person">
                <p>
                  The server offers eight tools, all read-only. Each is a small class in{' '}
                  <TextLink href={sourceFile('tools.py')}>tools.py</TextLink>, with a
                  name, a description, a Pydantic model of its arguments and a{' '}
                  <Code>run()</Code> method that returns Markdown.
                </p>
                <Table head={['Tool', 'What it returns']} rows={tools} />
                <p>
                  A tool’s description is written <em>to the model</em>. It says what the
                  tool is good for, so that the model picks it for the right questions.
                  It’s a small prompt. And a tool’s result is the model’s only view of the
                  world. Four principles shape every result:
                </p>
                <CardGrid cards={toolPrinciples} />
                <p>
                  Each tool also carries MCP annotations saying it’s read-only, not
                  destructive and idempotent: calling it twice does no more than calling
                  it once. A client may use those hints to run the tools without asking
                  the user’s permission each time.
                </p>
                <Callout type="idea" title="Machine formats need a translation">
                  <p>
                    <Code>get_manifest_schema</Code> exists because a model asked to write
                    a manifest invents fields. But a JSON Schema is written for
                    validators: the LLMClient kind’s is 47 KB, its fields spread across{' '}
                    <Code>$ref</Code> definitions. The server flattens it into one line
                    per field, with its dotted path, type, whether it’s required, its
                    default and its description. Images get the same treatment: the
                    indexer turns each into a Markdown image with its alt text, so the
                    model knows what it shows, and can include it in an answer.
                  </p>
                </Callout>
              </Part>

              <Part
                id="instructions"
                number={9}
                title="Prompting the LLM from the server"
              >
                <p>
                  In its answer to <Code>initialize</Code>, an MCP server may include{' '}
                  <strong>instructions</strong>, text that the client adds to the model’s
                  system prompt. They’re the one chance a tool’s author gets to talk to
                  the model directly. This server spends it on strategy. Here they are,
                  from <TextLink href={sourceFile('server.py')}>server.py</TextLink>, with
                  the template’s placeholders left in:
                </p>
                <CodeBlock
                  code={SERVER_INSTRUCTIONS}
                  number={6}
                  caption="The server’s instructions. Every sentence is there for a reason."
                />
                <p>Several prompting techniques are packed into those paragraphs:</p>
                <Table
                  head={['Technique', 'Where it is, and why']}
                  rows={promptTechniques}
                />
                <p>
                  The endpoint of every repository adds a paragraph about the blog: search
                  it with the docs for why and how questions, because a post often
                  explains a design and its limits more completely than reference
                  documentation, and include a post’s illustration when it shows what the
                  user asked about.
                </p>
                <Callout
                  type="idea"
                  title="The prompt and the engine were designed together"
                >
                  <p>
                    “Search with specific keywords and identifiers” is exactly what a
                    keyword search rewards, and “in parallel” is what makes a simple
                    engine good enough: two searches in one round instead of one after
                    another.
                  </p>
                </Callout>
              </Part>

              <Part id="try" number={10} title="Lab 1: Talk to Sam">
                <p>
                  Sam, the Smarter Developer Guide, is a Smarter LLMClient with no plugins
                  and one MCPClient:{' '}
                  <ManifestLink path="mcp-clients/smarter-project.yaml.tpl" />. Everything
                  he knows about Smarter, he looks up. Work through the experiments, and
                  watch for links to exact lines of code.
                </p>
                <div className="my-8 max-w-3xl">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-keen-900">
                      Sam, over the Smarter Project MCP server
                    </h3>
                    <p className="text-sm text-keen-600">
                      LLMClient ·{' '}
                      <ManifestLink path="llm-clients/llmclient-smarter-developer.yaml" />
                    </p>
                  </div>
                  <SmarterChatEmbed bot={chatbots.developer} height="640px" />
                </div>
                <h3>Experiments</h3>
                <Experiments experiments={experiments} />
                <Callout type="exercise" title="Compare">
                  <p>
                    Put Sam’s answer to the custom domain question beside the one you
                    saved in Part 2. Which can you check? What made the difference: a
                    better model, or a better way to look things up?
                  </p>
                </Callout>
              </Part>

              <Part id="curl" number={11} title="Lab 2: Call the server yourself">
                <p>
                  An MCP server is just an HTTP endpoint that speaks JSON-RPC. The server
                  of the platform at ubc.smarter.sh is public, and needs no key. Run these
                  in a terminal, and add <Code>| python3 -m json.tool</Code> to read the
                  answers comfortably.
                </p>
                <Commands commands={curlCommands} />
                <p>The third command’s result text looks like this, abridged:</p>
                <CodeBlock
                  code={SAMPLE_RESULT}
                  number={7}
                  caption="A real result of search_code. Note the link to a commit sha, not to main, and the line numbers."
                />
                <p>
                  The same server works in any MCP host. In Claude Code, for example, it’s
                  one command:
                </p>
                <CodeBlock
                  code={`claude mcp add --transport http smarter-project ${SMARTER_PROJECT_MCP}`}
                  copy
                />
              </Part>

              <Part id="lab" number={12} title="Lab 3: The MCPClient">
                <p>
                  A Smarter LLMClient reaches an MCP server through an MCPClient resource.
                  Here are the server’s two client manifests and Sam’s, read live from
                  GitHub. As you type, the editor validates each against the JSON Schema
                  that the platform publishes for its kind. Hover over any key for an
                  explanation.
                </p>
                <div className="my-8">
                  <ManifestLab initialPath="mcp-clients/smarter-project.yaml.tpl" />
                </div>
                <h3>Exercises</h3>
                <Exercises exercises={labExercises} />
                <Callout type="idea" title="includeInstructions and cacheTtl">
                  <p>
                    <Code>includeInstructions: true</Code> is what puts Figure 6 into
                    Sam’s system prompt. <Code>cacheTtl: 3600</Code> keeps the server’s
                    tool list and instructions for an hour, so a prompt doesn’t ask for
                    them again.
                  </p>
                </Callout>
              </Part>

              <Part
                id="operations"
                number={13}
                title="A small server, stateless and public"
              >
                <p>
                  The MCP Python SDK includes a server framework. This server doesn’t use
                  it: the SDK’s server is an asynchronous ASGI application, while
                  Smarter’s views and ORM are synchronous, and every message this server
                  answers comes straight from the database. So the server is a plain
                  Django view, which uses the SDK’s own Pydantic models to validate
                  requests and build responses. It gets the protocol’s exact types without
                  the framework.
                </p>
                <p>
                  <strong>Stateless.</strong> MCP allows a server to open a session, with
                  an <Code>Mcp-Session-Id</Code> header and a long-lived stream. This
                  server needs neither. It answers every POST with plain JSON, and answers
                  GET and DELETE with 405 Method Not Allowed. Because nothing ties one
                  request to the next, any of the platform’s Kubernetes pods can answer
                  any request, and scaling the server means scaling the platform.
                </p>
                <p>
                  <strong>Rate-limited, because it’s public.</strong> It’s read-only and
                  serves public repositories, so a login would only get in the way. But
                  the view counts requests per IP address, in one-minute windows kept in
                  the platform’s cache, and beyond 1,200 a minute answers 429 Too Many
                  Requests. The cache’s atomic <Code>add()</Code> and <Code>incr()</Code>{' '}
                  mean that two pods counting the same client can’t lose a request between
                  them (
                  <TextLink href={sourceFile('ratelimit.py')}>ratelimit.py</TextLink>).
                </p>
                <Callout type="idea">
                  <p>
                    The less a server remembers, the easier it is to run. This one
                    remembers nothing between requests.
                  </p>
                </Callout>
              </Part>

              <Part id="limits" number={14} title="Why it works, and its limits">
                <p>The design decisions reinforce each other:</p>
                <ul className="mb-6 max-w-3xl space-y-2 text-[15px] leading-relaxed text-keen-700">
                  {whyItWorks.map(([claim, reason]) => (
                    <li key={claim} className="flex gap-3">
                      <IconifyIcon
                        icon="lucide:check"
                        className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                      />
                      <span>
                        <strong className="text-keen-900">{claim}</strong> {reason}
                      </span>
                    </li>
                  ))}
                </ul>
                <h3>What it doesn’t do</h3>
                <p>
                  Keyword search can’t match a synonym. A question about “hostnames” won’t
                  find a page that only says “domains”, unless the model searches again
                  with other words, which it usually does. The hourly refresh makes 21
                  unauthenticated GitHub requests, so three or more platforms behind one
                  IP address would share, and exceed, GitHub’s hourly limit. And the index
                  of a repository that’s removed from the list isn’t deleted yet.
                </p>
                <Callout type="exercise" title="Takeaways, to keep">
                  <ol className="list-decimal space-y-1 ps-5">
                    <li>Separate preparing data from answering questions.</li>
                    <li>Write tool descriptions and server instructions as prompts.</li>
                    <li>Return small, citable results, linked to a fixed version.</li>
                    <li>Return tool errors as results, and say what to do next.</li>
                    <li>Try keyword search before embeddings, especially for code.</li>
                    <li>
                      Translate machine formats for the LLM: flatten schemas, describe
                      images.
                    </li>
                    <li>Keep the server stateless if it can be.</li>
                  </ol>
                </Callout>
                <p>
                  Nothing here is exotic. What makes it work is that each part was
                  designed around the reader at the other end: a model that can’t see,
                  can’t remember, and doesn’t know what changed last week, but searches
                  tirelessly, reads quickly, follows instructions and is glad to try
                  again. Don’t just ask what a model can do. Ask what it needs from you to
                  do it well.
                </p>
              </Part>

              <Part id="discussion" number={15} title="Discussion questions">
                <p>For a classroom, a study group, or your own notes.</p>
                <Questions questions={discussion} />
              </Part>

              <Part id="reading-list" number={16} title="Further reading">
                <ReadingList items={readingList} />
              </Part>
            </article>
          </div>
        </div>

        <CtaBand
          title="Run it on your own platform"
          text="Every Smarter platform runs its own Smarter Project MCP server, and loads Sam. Install Smarter, read the mcpserver app, and build the next server for your own project."
        >
          <Button href={QUICK_START} icon="lucide:rocket">
            Install Smarter
          </Button>
          <Button href={MCP_DOCS} variant="secondary" icon="lucide:book-open">
            Read the documentation
          </Button>
        </CtaBand>
      </ManifestProvider>
    </PageShell>
  )
}
export default McpServer
