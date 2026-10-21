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
import { DOCS, QUICK_START } from '@/common/constants'
import { Callout, Code, Contents, Part } from './components/Teaching'
import SequenceDiagram from './components/SequenceDiagram'
import DependencyDiagram from './components/DependencyDiagram'
import {
  actors,
  challenges,
  discussion,
  experiments,
  facts,
  files,
  gitBenefits,
  labExercises,
  manifestSections,
  objectives,
  pullRequest,
  readingList,
  repo,
  sections,
  sequence,
  solution,
} from './data'

/*
 * Case Study: Stackademy Online Coding Academy.
 *
 * A lesson, in the form of a business-school case, built on github.com/smarter-sh/stackademy: why an AI
 * model can't answer from an organization's private data, how tool calling lets it, how Smarter's plugins
 * do that with no code, and how a team governs the project's manifests with git. The two course advisors are
 * live (src/common/chatbots.js), and every manifest opens, from GitHub, in the site's manifest editor
 * (src/components/manifest), which checks it as the reader changes it.
 */

const SQL_QUERY = [
  ['SELECT c.course_code, c.course_name, c.description, c.cost,'],
  ['       prerequisite.course_code AS prerequisite_course_code,'],
  ['       prerequisite.course_name AS prerequisite_course_name'],
  ['FROM courses c'],
  ['LEFT JOIN courses prerequisite ON c.prerequisite_id = prerequisite.course_id'],
  [
    "WHERE ((c.description LIKE CONCAT('%', ",
    { p: '{description}' },
    ", '%')) OR (",
    { p: '{description}' },
    ' IS NULL))',
  ],
  ['  AND (c.cost <= ', { p: '{max_cost}' }, ' OR ', { p: '{max_cost}' }, ' IS NULL)'],
  ['ORDER BY c.prerequisite_id;'],
]

const QueryBlock = () => (
  <figure className="my-6">
    <pre className="overflow-x-auto rounded-xl bg-code-bg p-5 font-mono text-[13px] leading-6 text-code-text">
      {SQL_QUERY.map((line, i) => (
        <div key={i}>
          {line.map((part, j) =>
            typeof part === 'string' ? (
              part
            ) : (
              <mark key={j} className="rounded bg-amber-400/25 px-0.5 text-amber-200">
                {part.p}
              </mark>
            )
          )}
        </div>
      ))}
    </pre>
    <figcaption className="mt-2 text-sm text-keen-600">
      <strong className="text-keen-800">Figure 3.</strong> The SqlPlugin’s query. The
      highlighted placeholders are the only parts the model can influence.
    </figcaption>
  </figure>
)

const Glance = () => (
  <section className="pb-6" aria-label="The case at a glance">
    <div className="container">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-card md:p-8">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            <IconifyIcon icon="lucide:target" className="h-4 w-4" />
            Learning objectives
          </p>
          <p className="mb-4 text-keen-700">
            After working through this case, you will be able to:
          </p>
          <ol className="space-y-3">
            {objectives.map((objective, i) => (
              <li key={objective} className="flex gap-3 text-[15px] text-keen-800">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  {i + 1}
                </span>
                {objective}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-keen-300 bg-white p-6 shadow-card md:p-8">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-keen-600">
            <IconifyIcon icon="lucide:clipboard-list" className="h-4 w-4" />
            Case facts
          </p>
          <dl className="divide-y divide-keen-200">
            {facts.map(([term, value]) => (
              <div
                key={term}
                className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 text-sm"
              >
                <dt className="font-medium text-keen-600">{term}</dt>
                <dd className="text-keen-900">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-center gap-2 text-sm text-keen-600">
            <IconifyIcon icon="lucide:clock" className="h-4 w-4" />
            About 45 minutes, with both labs.
          </p>
        </div>
      </div>
    </div>
  </section>
)

const Advisor = ({ bot, title, tool, path }) => (
  <div className="flex min-w-0 flex-col">
    <div className="mb-3">
      <h3 className="text-lg font-semibold text-keen-900">{title}</h3>
      <p className="text-sm text-keen-600">
        {tool} · <ManifestLink path={path} />
      </p>
    </div>
    {/* the chat draws its own frame, in Stackademy's colors */}
    <SmarterChatEmbed bot={bot} height="600px" />
  </div>
)

const Stackademy = () => {
  return (
    <PageShell
      title="Case Study: Stackademy Online Coding Academy"
      description="A teaching case: how a code academy that no AI model has heard of got AI course advisors that answer from its private database and web API, with no-code tool calling, governed with git. With live advisors and an editor for every manifest."
    >
      <ManifestProvider repo={repo} files={files}>
        <PageHero
          eyebrow="Case study"
          title="Stackademy Online"
          highlight="Coding Academy"
          accent="emerald"
          lead="How a fictitious online academy that no AI model has ever heard of gets AI course advisors to accurately answer from its own private data, without writing code."
        >
          <Button href="#try" icon="lucide:message-circle">
            Talk to the advisors
          </Button>
          <Button href="#lab" variant="secondary" icon="lucide:file-code">
            Open the manifests
          </Button>
          <Button href={repo.url} variant="secondary" icon="lucide:github">
            smarter-sh/stackademy
          </Button>
        </PageHero>

        <Glance />

        <div className="container">
          <div className="mx-auto mt-4 max-w-6xl rounded-lg border border-keen-300 bg-keen-100 px-5 py-3 text-sm text-keen-700">
            <IconifyIcon
              icon="lucide:info"
              className="me-2 inline h-4 w-4 -translate-y-px"
            />
            Stackademy, its courses and its people are fictional. The software, the
            database, the web API and the two advisors on this page are real and running
            on Smarter.
          </div>

          <div className="mx-auto mt-6 grid max-w-6xl gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <Contents sections={sections} />
            </aside>

            <article className="min-w-0">
              <Part id="situation" number={1} title="The situation">
                <p>
                  Stackademy is an online code academy. It offers 48 computer science
                  courses, from <strong>CS101 Introduction to Computer Science</strong> to{' '}
                  <strong>CS408 Professional Practice</strong>: web development,
                  databases, cloud architecture, machine learning, even quantum computing.
                  Each course has a code, a short description, a price between $450 and
                  $1,000, and usually a prerequisite. You take CS301 Machine Learning
                  after CS210 Artificial Intelligence, which you take after CS107
                  Algorithms.
                </p>
                <p>Every day, prospective students ask the same kinds of questions:</p>
                <ul className="mb-6 flex max-w-3xl flex-wrap gap-2">
                  {[
                    'Do you offer any courses on AI?',
                    'My budget is $1,000. What courses can I take?',
                    'I want to study programming. Where should I start?',
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
                  Stackademy wants an assistant on its web site that answers them
                  accurately, at any hour. That sounds like the easiest AI project there
                  is. It isn’t, and the reason why is the subject of this case.
                </p>
              </Part>

              <Part
                id="problem"
                number={2}
                title="The problem: the answers are in a private database"
              >
                <p>
                  An AI model, however capable, knows only what was in its training data:
                  a snapshot of the public internet. Stackademy’s catalogue was never in
                  it. It lives in Stackademy’s own database, behind a password, like most
                  of the data that any organization runs on: products, prices, inventory,
                  policies, customers.
                </p>
                <p>
                  So a model asked about Stackademy’s courses can do one of two things. It
                  can say that it doesn’t know, which helps nobody. Or it can make
                  something up: a plausible course, at a plausible price, that doesn’t
                  exist.
                </p>
                <Callout type="term" title="Hallucination">
                  <p>
                    A fluent, confident answer that isn’t true. A model predicts likely
                    text; when the facts aren’t in what it was given, a likely-sounding
                    invention is what it produces.
                  </p>
                </Callout>
                <p>
                  Better instructions can’t fix this, because the knowledge isn’t in the
                  model. Pasting the whole catalogue into the prompt doesn’t scale either:
                  real catalogues are large, they change, and every token of a prompt is
                  paid for on every turn. A prompt that’s out of date is just a slower way
                  to be wrong. The model has to be able to <em>ask the database</em>.
                </p>
                <Callout type="exercise" title="Before you read on">
                  <p>
                    Ask the AI chatbot you use every day:{' '}
                    <em>
                      “Stackademy is an online code academy. My budget is $1,000. Which of
                      its AI courses can I take?”
                    </em>{' '}
                    Note what it says. Does it admit it can’t know, or does it guess? Keep
                    the answer: you’ll compare it with Stanley’s in Lab 1.
                  </p>
                </Callout>
              </Part>

              <Part
                id="tool-calling"
                number={3}
                title="Tool calling: how a model asks the database"
              >
                <p>
                  Modern AI models can do something better than guess: they can ask for
                  help. The application tells the model which <strong>tools</strong> it
                  may use, and what each one does. When a question needs one, the model
                  doesn’t answer. It asks the application to run the tool, and says with
                  which values. The application runs it, and hands the result back, and
                  the model answers from those facts.
                </p>
                <SequenceDiagram actors={actors} steps={sequence} />
                <Callout type="term" title="Tool calling (or function calling)">
                  <p>
                    A protocol between an application and an AI model. The application
                    describes functions; the model replies with a request to call one,
                    with arguments it chose; the application runs it and returns the
                    result for the model to use.
                  </p>
                </Callout>
                <Callout type="idea">
                  <p>
                    The model never connects to anything. It only <em>asks</em>.
                    Everything that touches the database, the password, the query and the
                    network, happens in the application, where it can be secured, logged
                    and controlled. In this case, the application is Smarter.
                  </p>
                </Callout>
              </Part>

              <Part
                id="hard"
                number={4}
                title="Why connecting a private database is hard"
              >
                <p>
                  Figure 1 looks simple. Building it isn’t. Every arrow is code that
                  someone has to write, secure and maintain, and it’s different for every
                  database, every web API and every AI provider:
                </p>
                <div className="my-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {challenges.map((challenge, i) => (
                    <div
                      key={challenge.title}
                      className="rounded-xl border border-keen-300 bg-white p-5 shadow-card"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-keen-100 text-keen-800">
                          <IconifyIcon icon={challenge.icon} className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-semibold text-keen-500">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="mb-1.5 font-semibold text-keen-900">
                        {challenge.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-keen-600">
                        {challenge.text}
                      </p>
                    </div>
                  ))}
                </div>
                <p>
                  It’s a software project in its own right. That’s why most teams that
                  want an AI assistant over their own data never finish one.
                </p>
              </Part>

              <Part
                id="solution"
                number={5}
                title="The solution: plugins, described instead of coded"
              >
                <p>
                  Smarter’s{' '}
                  <SmartLink
                    href={`${DOCS}/en/latest/smarter-resources/smarter-llmtool.html`}
                    className="text-primary hover:underline"
                  >
                    plugin architecture
                  </SmartLink>{' '}
                  does every step above. You <em>describe</em> what you want, in short
                  YAML text files called <strong>manifests</strong>, and the platform does
                  the rest:
                </p>
                <div className="my-6 overflow-x-auto rounded-xl border border-keen-300 bg-white shadow-card">
                  <table className="w-full min-w-[36rem] text-left text-sm">
                    <thead className="bg-keen-100 text-xs uppercase tracking-wider text-keen-600">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Manifest</th>
                        <th className="px-4 py-3 font-semibold">What you write</th>
                        <th className="px-4 py-3 font-semibold">
                          What Smarter does with it
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-keen-200">
                      {solution.map((row) => (
                        <tr key={row.kind}>
                          <td className="px-4 py-3 font-mono font-medium text-keen-900">
                            {row.kind}
                          </td>
                          <td className="px-4 py-3 text-keen-700">{row.write}</td>
                          <td className="px-4 py-3 text-keen-700">{row.does}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  The same holds for a web API, with an <strong>ApiConnection</strong> and
                  an <strong>ApiPlugin</strong>. Stackademy’s catalogue lives in both
                  places, as data often does: in the registrar’s database, and behind the
                  catalogue’s web API. These are the two most common uses of tool calling,
                  so the project builds its advisor, Stanley, twice, once over each, so
                  that you can compare them. Neither needed a line of code.
                </p>
              </Part>

              <Part id="try" number={6} title="Lab 1: Talk to Stanley">
                <p>
                  Both advisors below are live. They are the same Stanley, with the same
                  instructions, except for the tool each may use. Work through the
                  experiments in both chats, and compare what you see.
                </p>
                <div className="my-8 grid gap-8 xl:grid-cols-2">
                  <Advisor
                    bot={chatbots.stackademySql}
                    title="Stanley, over the database"
                    tool="SqlPlugin"
                    path="llm-clients/stackademy-sql.yaml"
                  />
                  <Advisor
                    bot={chatbots.stackademyApi}
                    title="Stanley, over the web API"
                    tool="ApiPlugin"
                    path="llm-clients/stackademy-api.yaml"
                  />
                </div>
                <h3>Experiments</h3>
                <ol className="max-w-3xl space-y-4">
                  {experiments.map((experiment, i) => (
                    <li
                      key={experiment.prompt}
                      className="rounded-xl border border-keen-300 bg-white p-5 shadow-card"
                    >
                      <p className="mb-2 flex items-start gap-3">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                          {i + 1}
                        </span>
                        <span className="font-medium text-keen-900">
                          Ask: <em>“{experiment.prompt}”</em>
                        </span>
                      </p>
                      <p className="ps-9 text-[15px] leading-relaxed text-keen-700">
                        <strong className="text-keen-800">Observe. </strong>
                        {experiment.observe}
                      </p>
                    </li>
                  ))}
                </ol>
                <Callout type="exercise" title="Compare">
                  <p>
                    Put Stanley’s answer to the $1,000 question beside the one you saved
                    from your everyday chatbot in Part 2. Which would you trust to enroll
                    a student? What made the difference: a better model, or better
                    information?
                  </p>
                </Callout>
                <p className="text-sm">
                  In the Smarter web console, the same advisors open in the Prompt
                  Engineer’s Workbench, whose console shows each tool call: the values the
                  model chose and the rows that came back. Every Smarter platform loads
                  this project, so they’re in yours too.{' '}
                  <SmartLink href={QUICK_START} className="text-primary hover:underline">
                    Install Smarter
                  </SmartLink>{' '}
                  to look inside.
                </p>
              </Part>

              <Part id="anatomy" number={7} title="Anatomy of the project">
                <p>
                  Neither advisor is one thing. Each is built from several{' '}
                  <strong>resources</strong>, each with one job, and each of which depends
                  on others. Every resource is described by its own manifest, in the{' '}
                  <SmartLink href={repo.url} className="text-primary hover:underline">
                    smarter-sh/stackademy
                  </SmartLink>{' '}
                  repository on GitHub.
                </p>
                <DependencyDiagram />
                <ul className="mb-6 max-w-3xl space-y-2 text-[15px] leading-relaxed text-keen-700">
                  <li>
                    A <strong>Secret</strong> keeps a password or key, encrypted, so that
                    nothing else has to spell it out.
                  </li>
                  <li>
                    A <strong>Connection</strong> says how to reach a data source, and
                    which Secret holds its password.
                  </li>
                  <li>
                    A <strong>Plugin</strong> is a tool the model may call: what it does,
                    in words the model understands, the filters it takes, and the
                    Connection it uses.
                  </li>
                  <li>
                    An <strong>LLMClient</strong> is the assistant itself: its model,
                    instructions, personality, tools, and the look of its chat.
                  </li>
                  <li>
                    A <strong>Budget</strong> limits what the resources it lists may
                    spend.
                  </li>
                </ul>
                <Callout type="idea" title="Names are references">
                  <p>
                    Resources refer to each other by <Code>metadata.name</Code>, never by
                    copying values. That is why the order matters: the platform applies
                    Secrets, then Connections, then plugins, then LLMClients, then the
                    Budget, because a resource can only refer to one that already exists.
                  </p>
                </Callout>
              </Part>

              <Part id="reading" number={8} title="How to read a manifest">
                <p>
                  Every Smarter manifest, of every kind, has the same five sections. Learn
                  them once and you can read any of the ten files, or the hundreds in a
                  larger project. Open{' '}
                  <ManifestLink path="llm-clients/stackademy-sql.yaml" /> beside this
                  list.
                </p>
                <dl className="my-6 max-w-3xl divide-y divide-keen-200 rounded-xl border border-keen-300 bg-white shadow-card">
                  {manifestSections.map((section) => (
                    <div
                      key={section.key}
                      className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr] sm:gap-4"
                    >
                      <dt className="font-mono text-sm font-semibold text-primary">
                        {section.key}
                      </dt>
                      <dd className="text-[15px] leading-relaxed text-keen-700">
                        {section.text}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p>
                  <strong>Annotations</strong>, in <Code>metadata</Code>, deserve a note.
                  Smarter stores them exactly as written and never interprets them.
                  They’re how a team connects its own systems, a billing cost center, an
                  on-call owner, a compliance review date, to a resource, as Kubernetes
                  annotations do for operators. Because they live in the manifest, they
                  are reviewed in the same pull request as the prompt.
                </p>
                <Callout type="idea" title="Declarative, not imperative">
                  <p>
                    A manifest says what a resource <em>should be</em>, not the steps to
                    build it. Applying it creates the resource, or updates it to match.
                    Applying the same file twice changes nothing. That property is what
                    makes a repository of manifests a reliable description of a running
                    system.
                  </p>
                </Callout>
              </Part>

              <Part id="sql-plugin" number={9} title="Close reading: the SqlPlugin">
                <p>
                  <ManifestLink path="plugins/sql/stackademy-sql.yaml" /> is where tool
                  calling happens, and it rewards a careful reading. Its{' '}
                  <Code>sqlData</Code> holds the query:
                </p>
                <QueryBlock />
                <p>
                  The model never sees this query. It sees the <strong>parameters</strong>
                  , each with a description in plain words, and decides from them, and
                  from the student’s question, what to fill in.{' '}
                  <em>“My budget is $1,000”</em> becomes <Code>max_cost: 1000</Code>.
                  Writing those descriptions well is prompt engineering too.
                </p>
                <h3>Two safety mechanisms</h3>
                <p>
                  <strong>Parameterized values.</strong> Smarter inserts each value into
                  its <Code>{'{placeholder}'}</Code> as a quoted, escaped literal.
                  Whatever a student types, it can only ever be a value, never more SQL.
                  That closes the door on <em>SQL injection</em>, one of the oldest and
                  most damaging attacks on the web.
                </p>
                <p>
                  <strong>An enum of allowed values.</strong> The <Code>description</Code>{' '}
                  parameter may only be one of <Code>AI</Code>, <Code>mobile</Code>,{' '}
                  <Code>web</Code>, <Code>database</Code>, <Code>network</Code> or{' '}
                  <Code>neural networks</Code>: the keywords the course descriptions
                  actually use. The model can’t invent a filter that matches nothing. You
                  saw the consequence in Lab 1: asked about COBOL, Stanley searched
                  without a filter and reported honestly that there was no such course.
                </p>
                <Callout type="caution" title="The OR … IS NULL pattern">
                  <p>
                    Both filters are optional. <Code>{'OR {max_cost} IS NULL'}</Code>{' '}
                    makes a condition true when the model leaves that parameter out, so
                    one query serves “AI courses”, “courses under $600” and both at once.
                  </p>
                </Callout>
                <h3>The same tool, over a web API</h3>
                <p>
                  <ManifestLink path="plugins/api/stackademy-api.yaml" /> declares the
                  same two parameters, but its <Code>apiData</Code> names an endpoint and
                  a method instead of a query: the model’s values become the request’s
                  query string, <Code>?max_cost=1000&amp;description=AI</Code>. Same
                  question, same model, a different contract with the data. As Lab 1’s
                  second experiment showed, what the tool returns sets the ceiling on what
                  the assistant can say.
                </p>
              </Part>

              <Part id="lab" number={10} title="Lab 2: The manifest editor">
                <p>
                  Here are all ten manifests, read live from GitHub. Change anything. As
                  you type, the editor checks the YAML, then validates it against the JSON
                  Schema that the Smarter platform publishes for its kind: the very check
                  that runs on every pull request to the repository. Hover over any key
                  for an explanation.
                </p>
                <div className="my-8">
                  <ManifestLab initialPath="llm-clients/stackademy-sql.yaml" />
                </div>
                <h3>Exercises</h3>
                <ol className="mb-6 max-w-3xl space-y-3">
                  {labExercises.map((exercise, i) => (
                    <li
                      key={exercise.title}
                      className="flex gap-3 text-[15px] leading-relaxed"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        {String.fromCharCode(97 + i)}
                      </span>
                      <span className="text-keen-700">
                        <strong className="text-keen-900">{exercise.title}. </strong>
                        {exercise.text}
                      </span>
                    </li>
                  ))}
                </ol>
                <Callout type="idea" title="Validation is not verification">
                  <p>
                    A schema can tell you that <Code>defaultTemperature</Code> must be a
                    number. It can’t tell you that a temperature of 1.0 is right for a
                    course advisor, or that a prompt is kind and accurate. Machines check
                    form; people review meaning. A good process uses both.
                  </p>
                </Callout>
              </Part>

              <Part id="governance" number={11} title="Governing the project with git">
                <p>
                  A prompt is code. A one-word change to Stanley’s instructions can change
                  every answer he gives. Yet prompts are often edited in place, in a web
                  form, with no record of who changed what, or why, and no way back. Ten
                  resources are already more than one person should keep in their head;
                  real projects have hundreds, changed by many people over months.
                </p>
                <p>
                  Keeping the manifests in GitHub gives an AI project the habits that
                  software teams depend on:
                </p>
                <div className="my-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {gitBenefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="rounded-xl border border-keen-300 bg-white p-5 shadow-card"
                    >
                      <IconifyIcon
                        icon={benefit.icon}
                        className="mb-3 h-6 w-6 text-primary"
                      />
                      <h3 className="mb-1.5 font-semibold text-keen-900">
                        {benefit.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-keen-600">
                        {benefit.text}
                      </p>
                    </div>
                  ))}
                </div>
                <h3>A change, the GitHub way</h3>
                <ol className="mb-6 max-w-3xl space-y-0">
                  {pullRequest.map((step, i) => (
                    <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
                      {i < pullRequest.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[13px] top-7 h-[calc(100%-1.5rem)] border-s-2 border-keen-300"
                        />
                      )}
                      <span className="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-keen-900 text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-[15px] leading-relaxed text-keen-700">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
                <p>
                  Spending is governed too.{' '}
                  <ManifestLink path="budgets/stackademy-project.yaml" /> caps the
                  database advisor at $2,500 a month and $10,000 over the project’s six
                  months, warns at 80%, and then refuses further requests. Only a platform
                  administrator may apply a Budget: the people who build assistants aren’t
                  the ones who set their limits.
                </p>
                <Callout type="caution" title="Keep secrets secret">
                  <p>
                    The passwords in this repository are public test passwords, which is
                    the only reason they can be there. Never commit a real password or API
                    key, even to a private repository: git keeps it in history after the
                    file is deleted. Commit a Secret with a placeholder value, and set the
                    real one in the web console.
                  </p>
                </Callout>
              </Part>

              <Part id="discussion" number={12} title="Discussion questions">
                <p>For a classroom, a study group, or your own notes.</p>
                <ol className="max-w-3xl space-y-4">
                  {discussion.map((question, i) => (
                    <li key={question} className="flex gap-4">
                      <span className="font-mono text-sm font-semibold text-emerald-600">
                        Q{i + 1}
                      </span>
                      <p className="text-[16px] leading-relaxed text-keen-800">
                        {question}
                      </p>
                    </li>
                  ))}
                </ol>
              </Part>

              <Part id="reading-list" number={13} title="Further reading">
                <ul className="grid max-w-3xl gap-2 sm:grid-cols-2">
                  {readingList.map((item) => (
                    <li key={item.url}>
                      <SmartLink
                        href={item.url}
                        className="group flex items-center gap-2 rounded-lg border border-keen-300 bg-white px-4 py-3 text-sm text-keen-800 transition-colors hover:border-primary hover:text-primary"
                      >
                        <IconifyIcon
                          icon="lucide:book-open"
                          className="h-4 w-4 shrink-0 text-keen-500 group-hover:text-primary"
                        />
                        {item.title}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </Part>
            </article>
          </div>
        </div>

        <CtaBand
          title="Make Stackademy your own"
          text="Fork the repository, rename the resources, change the prompts, and apply them to your own Smarter platform. The best way to learn this is to build the next one."
        >
          <Button href={repo.url} icon="lucide:git-fork">
            Fork smarter-sh/stackademy
          </Button>
          <Button href={QUICK_START} variant="secondary" icon="lucide:rocket">
            Install Smarter
          </Button>
        </CtaBand>
      </ManifestProvider>
    </PageShell>
  )
}
export default Stackademy
