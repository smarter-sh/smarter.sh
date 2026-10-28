import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { chatbots } from '@/common/chatbots'
import {
  Callout,
  CardGrid,
  Code,
  CodeBlock,
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
import SeriesChart from './components/SeriesChart'
import {
  AGENTIC_DOCS,
  CACHE_KEY_CODE,
  CACHE_RULE,
  CICD_POST,
  CLONE,
  COMMIT_BODIES,
  MEASURE,
  PART_1,
  PART_2,
  PART_3,
  REPO,
  bugHunt,
  cicd,
  commit,
  discussion,
  experiments,
  facts,
  factors,
  fixSteps,
  innerLoop,
  layers,
  measureExercises,
  measured,
  objectives,
  reach,
  readingList,
  repoFile,
  repoTree,
  scenarios,
  sections,
  series,
} from './data'

/*
 * Case Study: Converge or Diverge, AI coding agents in a 240,000-line codebase.
 *
 * A lesson, in the form of a business-school case, built on the three-part blog series "Converge or
 * Diverge" and the smarter repository itself: why an AI coding agent multiplies whatever it finds, the five
 * properties of the codebase that kept Claude Code on course, what the agent actually reads, the
 * antipattern of a second way to do things and its four-step fix, and the guard rails that belong in the
 * environment. Students read CLAUDE.md and the skills, measure the antipattern with git, and talk to Sam.
 */

// A numbered card with a task, whose answer the reader reveals after deciding.
const Scenario = ({ scenario, number }) => (
  <li className="rounded-xl border border-keen-300 bg-white p-5 shadow-card">
    <p className="mb-3 flex items-start gap-3">
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
        {number}
      </span>
      <span className="font-medium text-keen-900">{scenario.task}</span>
    </p>
    <details className="ps-9 text-[15px] leading-relaxed text-keen-700">
      <summary className="cursor-pointer font-medium text-primary">
        What does the agent do?
      </summary>
      <p className="mt-2">{scenario.answer}</p>
      <p className="mt-2 text-sm">
        Written in <TextLink href={scenario.source[1]}>{scenario.source[0]}</TextLink>.
      </p>
    </details>
  </li>
)

const AiCodingAgents = () => {
  return (
    <PageShell
      title="Case Study: Converge or Diverge, AI Coding Agents"
      description="A teaching case: how Claude Code built 19 minor releases of a 240,000-line Django platform in 18 days without wrecking it, what it actually read, the antipattern that nearly made the codebase diverge, and how to measure it with git. With labs and a live assistant."
    >
      <PageHero
        eyebrow="Case study"
        title="Converge or Diverge:"
        highlight="AI Coding Agents"
        accent="emerald"
        lead="An AI coding agent multiplies whatever it finds in your codebase, good or bad. How a 240,000-line platform kept its agent on course for 19 releases in 18 days, and what nearly sent it the other way."
      >
        <Button href="#rules" icon="lucide:file-text">
          Read the rules
        </Button>
        <Button href="#measure" variant="secondary" icon="lucide:terminal">
          Measure the series
        </Button>
        <Button href={repoTree('skills')} variant="secondary" icon="lucide:github">
          The Agent Skills
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
          Everything in this case is real: the repository, its history, its rules and the
          numbers. It is adapted from the three-part series{' '}
          <TextLink href={PART_1}>Converge or Diverge</TextLink> by Lawrence McDaniel, who
          wrote Part 1; Claude Code drafted Part 3, from his notes and from its own
          session transcripts. The case covers the releases from v0.14 to v0.33, in 2026.
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <Contents sections={sections} />
          </aside>

          <article className="min-w-0">
            <Part id="situation" number={1} title="The situation">
              <p>
                Smarter is a large Django platform for building and running LLM
                applications. On October 10, 2026, it had about 240,000 lines of Python in
                21 Django apps, a React web console of 24 packages, about 5,300 Python
                tests and more than 1,100 pages of documentation. It had been built over
                three and a half years, mostly by one person.
              </p>
              <p>
                In early October, <strong>Claude Code</strong>, an AI coding agent, was
                given the rest of the year’s road map. It finished in 8 days, over about
                20 prompts, each of which took between one and four hours. For every
                feature, it designed the change, wrote the code, the unit tests and the
                documentation. Then it kept going. Between September 30 and October 17,
                Smarter shipped 19 minor releases, v0.15 to v0.33, and 45 patch releases.
              </p>
              <p>
                That would be easy to tell as a story about a clever model. This case
                argues that it isn’t one. The agent worked on top of years of unglamorous
                human work, and that foundation, unlike the model, is something any team
                can copy.
              </p>
            </Part>

            <Part
              id="problem"
              number={2}
              title="The problem: an agent copies what it finds"
            >
              <Callout type="term" title="AI coding agent">
                <p>
                  A program that uses an AI model to change software on its own: it
                  searches and reads the code, edits files, runs commands such as the
                  tests, reads the results, and repeats. Anthropic describes Claude Code’s
                  loop as gather context, take action, verify work, repeat.
                </p>
              </Callout>
              <p>
                An agent can’t hold a large codebase in its head. So it learns the
                project’s conventions by example: before it writes, it looks for code that
                does something similar, and copies it. And the code it writes today is an
                example it will copy tomorrow. That feedback loop is the whole story. What
                matters is what it does with mistakes.
              </p>
              <CardGrid cards={series} />
              <Callout type="idea" title="The ratio is chosen before the agent starts">
                <p>
                  Part 1 of the series puts it this way: you don’t choose the ratio of the
                  series when you start the agent. You chose it over the years before,
                  with every test, type annotation, docstring, linter rule and
                  architecture decision.
                </p>
              </Callout>
              <Callout type="exercise" title="Before you read on">
                <p>
                  Think of a codebase you know. Name one thing it does in two different
                  ways, e.g. two ways to read a setting, or to report an error. If an
                  agent copied the nearest example of it ten times, which way would win?
                </p>
              </Callout>
            </Part>

            <Part id="split" number={3} title="Who built what">
              <p>
                Smarter has two layers. The <strong>subsystems</strong> are the framework
                everything stands on: the manifest and broker machinery, the API’s
                response contract, multi-tenancy and ownership, secrets, settings,
                middleware, logging, caching and the test base classes. People designed
                and wrote them, over years. The <strong>applications</strong> are the
                resource families a user works with, such as Guardrails, MCPClients,
                LLMHosts and the infrastructure layer. Those exist in large part thanks to
                Claude Code. git blame shows the split:
              </p>
              <Table
                head={['Package', 'Lines (non-test)', 'Claude Code’s share', 'Layer']}
                rows={layers}
              />
              <p className="text-sm">
                From Part 1, measured on October 17. The application numbers are a floor:
                some of the agent’s work was committed under the author’s name. And the
                author scaffolded the new apps by hand in July, before the agent filled
                them in.
              </p>
              <Callout type="idea" title="The agent writes the difference">
                <p>
                  Each new application is a small difference: the part of the feature
                  that’s genuinely new. Tenancy, permissions, the API contract, error
                  handling and secrets are already solved, once, by subsystems that every
                  resource shares. When Claude Code built a new resource kind, it wrote a
                  Pydantic manifest model, a subclass of <Code>AbstractBroker</Code>, a
                  Django model that inherits the ownership model, and a React list page.
                  The foundation cancels the rest. That’s the telescope.
                </p>
              </Callout>
            </Part>

            <Part id="factors" number={4} title="Five success factors">
              <p>
                The question that matters is less “how smart is the model?” than “what
                does the agent find when it goes looking?” Part 1 gives five answers, each
                a way of keeping the series telescopic.
              </p>
              <CardGrid cards={factors} />
              <h3>Coverage is a bug-finding machine</h3>
              <p>
                Raising coverage means writing tests for branches nobody has exercised,
                and that’s where bugs live. In the first week alone, the coverage
                campaigns found roughly 130:
              </p>
              <ul className="mb-6 max-w-3xl list-disc space-y-1 ps-6 text-[15px] leading-relaxed text-keen-700">
                {bugHunt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Several were serious, and many were in the human-written subsystems: a
                view that let any user read any account’s LLMClient configuration, and a
                middleware that never blocked anyone, because it discarded the 403 it
                computed. The coverage push made the foundation stronger before the agent
                built more on top of it, which is the right order.
              </p>
              <Callout type="term" title="Agent Skill">
                <p>
                  A folder of written know-how that the agent loads only when a task needs
                  it: a <Code>SKILL.md</Code> file with a name and a one-line description,
                  plus optional reference files and scripts. Smarter’s live in{' '}
                  <TextLink href={repoTree('skills')}>skills/</TextLink>, versioned and
                  reviewed like any other code. A short{' '}
                  <TextLink href={repoFile('CLAUDE.md')}>CLAUDE.md</TextLink> at the root
                  holds only the rules for nearly every task, and points to the skills.
                </p>
              </Callout>
            </Part>

            <Part id="reads" number={5} title="What the agent actually reads">
              <p>
                Claude Code keeps a transcript of every session: every file it opened,
                every search, every skill and every test run. For Part 3, it went back
                through 237 of its own sessions in the Smarter repository, from September
                28 to October 17, and counted, for{' '}
                <TextLink href={PART_3}>Part 3</TextLink>. Of those, 94 changed source
                code. The median one read 8 files before its first edit, and about 60 in
                all.
              </p>
              <Table head={['Source', 'Kind', 'Reach']} rows={reach} />
              <p className="text-sm">
                Reach is the share of the 94 code-changing sessions that used the source
                at least once, from Part 3, abridged.
              </p>
              <p>
                Three things stand out. The agent reads what is close, current and
                specific: the code and the tests, nearly always; architecture decision
                records, in about one session in ten, because their decisions had been
                distilled into the skills. Three of the six most-used sources are{' '}
                <em>feedback</em>, not guidance. And one short file changed behavior:
              </p>
              <Callout type="idea" title="151 lines that changed the agent’s habits">
                <p>
                  CLAUDE.md was added on October 7, in the middle of the window. Before it
                  existed, 5 of 33 code-changing sessions loaded{' '}
                  <Code>smarter-development</Code>, the skill that says which narrower
                  skill covers each kind of work: 15%. After, 47 of 61 did: 77%. Whenever
                  it was loaded, it was loaded before the first edit, when it could still
                  change the design.
                </p>
              </Callout>
              <p>
                The agent also writes most of its own guidance. 38 of the 45 commits that
                touched skills/ by October 17 were authored by Claude Code, from its own
                experience of each task, traps included. The human decides which skills
                should exist and what each covers. And commit bodies of five lines or more
                went from 4% of commits to 44%, mostly written by the agent, for a reader
                who is mostly the agent: it runs git log in three sessions out of four.
              </p>
            </Part>

            <Part id="loop" number={6} title="Guidance, feedback and autonomy">
              <p>
                The five factors sort into three things the agent needs at once.{' '}
                <strong>Guidance</strong> says what good looks like before it starts: the
                existing code and tests, the docs, CLAUDE.md and the skills.{' '}
                <strong>Feedback</strong> says whether it worked: the tests, the linters
                and a runtime it can drive alone. <strong>Autonomy</strong> lets it decide
                how to get there, for hours, without anyone checking each step.
              </p>
              <Steps steps={innerLoop} />
              <p>
                The first four steps are the inner loop, which corrects the change in
                front of the agent. The fifth is the outer arc: writing the lesson down
                changes what the next agent finds when it goes looking, and that’s what
                makes the codebase converge across changes. Skip it, and every change
                passes its own tests while the codebase drifts.
              </p>
              <Callout type="caution" title="Autonomy without feedback">
                <p>
                  Guidance and feedback set the direction, the ratio of the series.
                  Autonomy sets the speed. Autonomy without feedback is how you diverge
                  fast.
                </p>
              </Callout>
            </Part>

            <Part
              id="antipattern"
              number={7}
              title="The antipattern: a second way to do things"
            >
              <p>
                Every codebase has a canonical way to do the things it does often: one way
                to check a permission, read a setting, shape an error, cache a result. The
                antipattern is a second way, living alongside the first. It’s never wrong
                enough to fail a test. It’s just different, and usually a little worse.
              </p>
              <p>
                At agent speed it spreads for a mechanical reason. The agent copies the{' '}
                <em>nearest</em> example, not the best one. If the nearest is the second
                way, the new feature is a third copy of it, and that copy is now the
                nearest example for the next feature. Nothing in that loop asks which way
                is canonical.
              </p>
              <h3>Smarter’s hand-rolled caches</h3>
              <p>
                <TextLink href={PART_2}>Part 2</TextLink> of the series follows one
                example from start to finish.
              </p>
              <p>
                Smarter has had a caching decorator, <Code>@cache_results()</Code>, since
                April 2024, backed by Redis, with repeatable keys and an{' '}
                <Code>.invalidate()</Code>. It also had a few direct{' '}
                <Code>cache.get()</Code> and <Code>cache.set()</Code> calls, some
                legitimate. The boundary between the two lived in the author’s head. In
                late September, the agent built the MCPClient and the WebsearchPlugin, and
                both got hand-rolled caches. Then the dashboard’s health check, the
                ImageSearchPlugin and the semantic guardrail did too.
              </p>
              <CodeBlock
                code={CACHE_KEY_CODE}
                number={1}
                caption="A copy’s fingerprint: an opaque key from a sha256 of a JSON payload, built on a database id, from the ImageSearchPlugin just before the fix."
              />
              <p>
                The copies carried their original’s design. The ImageSearchPlugin cached
                the last step of its workflow, the filtered list of image URLs, so “show
                me cats” showed the same cat every time, and changing the plugin’s filters
                did nothing until the cache expired.
              </p>
              <SeriesChart rows={measured} />
              <Callout type="caution" title="Why nobody noticed">
                <p>
                  Every copy worked, and every copy’s tests passed, because they tested
                  the copy. A reviewer reading any single change saw a reasonable cache.
                  The antipattern doesn’t live in any one change. It lives in the
                  comparison between changes, and nothing was making it.
                </p>
              </Callout>
            </Part>

            <Part id="fix" number={8} title="Fixing it in four steps">
              <p>
                The fix landed on the morning of October 11, in{' '}
                <TextLink href={commit('eeb7a7a19bccd08c0b341feecf3ca444875a1f48')}>
                  one commit
                </TextLink>{' '}
                that changed 59 files. Its four steps suit any codebase an agent works in.
              </p>
              <Steps
                steps={fixSteps.map((step) => (
                  <>
                    <strong className="text-keen-900">{step.title}. </strong>
                    {step.text}
                  </>
                ))}
              />
              <CodeBlock
                code={CACHE_RULE}
                number={3}
                caption={
                  <>
                    The rule, as it reads today in{' '}
                    <TextLink href={repoFile('skills/smarter-development/SKILL.md')}>
                      smarter-development
                    </TextLink>
                    . Its Caching section adds the reasons: cache the expensive call, not
                    the workflow; the parameters are the key; never pass a secret; never
                    cache a failure.
                  </>
                }
              />
              <p>
                It worked. In the six days after the fix, the platform gained more than
                43,000 lines of Python, nearly all from about 80 Claude Code commits.
                Several new features needed caches, and every long-lived one went through{' '}
                <Code>@cache_results</Code>. Not one new file called{' '}
                <Code>cache.get()</Code> or <Code>cache.set()</Code> directly.
              </p>
              <Callout type="idea">
                <p>
                  A mistake that’s written down happens once. A mistake that’s checked by
                  a machine shouldn’t happen at all.
                </p>
              </Callout>
            </Part>

            <Part id="wrong" number={9} title="When it went wrong">
              <p>
                The local containers hold real credentials while tests run, including a
                kubeconfig for the production Kubernetes cluster and working cloud DNS
                credentials, because Smarter manages cloud infrastructure, and those
                operations need testing. On October 6, a release included a one-line
                change to a function that verifies DNS records. Lacking an accurate source
                of DNS host data, the agent filled the blank with a plausible guess, and
                propagated it onto real DNS records. Smarter was offline for nearly 20
                minutes.
              </p>
              <p>
                The lasting change was a new skill,{' '}
                <TextLink
                  href={repoFile('skills/smarter-infrastructure-safety/SKILL.md')}
                >
                  smarter-infrastructure-safety
                </TextLink>
                : every Kubernetes, DNS, certificate and cloud call is faked in tests, and
                a command that writes to real infrastructure is handed to the human, never
                run. CLAUDE.md repeats it as a hard rule.
              </p>
              <p>
                On October 16, the opposite failure. The author had cached Smarter’s{' '}
                <Code>reverse()</Code> shortcut, which turns a view’s name into a URL,
                with <Code>@cache_results</Code> for a year. A release moved a page,
                production’s Redis kept the old URL, and the page broke. Claude Code found
                it, removed the cache, and added a test that <Code>reverse()</Code> is
                never cached; <TextLink href={commit('5be6cf37c')}>the fix</TextLink> was
                tagged 41 minutes after the release that exposed it.
              </p>
              <Callout type="caution" title="Missing truth, stale truth">
                <p>
                  The outage came from a missing source of truth; the URL bug from a stale
                  one, which is worse, because everything downstream trusts it. An agent
                  at 25 times your pace makes mistakes at 25 times your pace, so the guard
                  rails have to be in the environment and the written rules, not in your
                  attention span.
                </p>
              </Callout>
            </Part>

            <Part
              id="pipeline"
              number={10}
              title="The pipeline sets what you can delegate"
            >
              <p>
                <TextLink href={CICD_POST}>A separate post</TextLink> makes the same
                argument about CI/CD: the amount of work you can safely delegate, to a
                pipeline or an agent, is capped by how much the pipeline can prove on its
                own. Every Smarter repository ships through GitHub Actions and
                semantic-release, so a merged pull request becomes a version, a changelog,
                signed artifacts, a deployment and updated docs, with nobody typing any of
                it. Its seven practices:
              </p>
              <ol className="mb-6 max-w-3xl list-decimal space-y-1 ps-6 text-[15px] leading-relaxed text-keen-700">
                {cicd.map((practice) => (
                  <li key={practice}>{practice}</li>
                ))}
              </ol>
              <p>
                Practice 4 matters more when agents write the commits. Each message begins
                with its type, under the Conventional Commits convention, and
                semantic-release reads the messages to choose the next version: a{' '}
                <Code>fix</Code> is a patch release, a <Code>feat</Code> a minor one. So
                the commit message skill tells agents that <Code>feat</Code> must be rare,
                and that a commit that could be either is a fix, and a commitlint hook
                rejects any message that breaks the convention.
              </p>
            </Part>

            <Part id="rules" number={11} title="Lab 1: Read the rules">
              <p>
                Open <TextLink href={repoFile('CLAUDE.md')}>CLAUDE.md</TextLink> and the{' '}
                <TextLink href={repoTree('skills/smarter-development')}>
                  smarter-development
                </TextLink>{' '}
                skill in another tab. For each task below, decide what the agent will do,
                and where the rule is written. Then reveal the answer.
              </p>
              <ol className="my-6 max-w-3xl space-y-4">
                {scenarios.map((scenario, i) => (
                  <Scenario key={scenario.task} scenario={scenario} number={i + 1} />
                ))}
              </ol>
              <Callout type="exercise" title="Write a rule">
                <p>
                  Pick a mistake you’ve seen a person or an agent make twice in a project.
                  Write it as a rule for CLAUDE.md, in three sentences or fewer, with its
                  reason and its exception. Would an agent under pressure be able to
                  reason its way around it?
                </p>
              </Callout>
            </Part>

            <Part id="measure" number={12} title="Lab 2: Measure the series">
              <p>
                The antipattern is invisible in one diff, and plain across release tags.
                This is the loop from Part 2. It needs only git: clone the repository, and
                run it in the checkout.
              </p>
              <CodeBlock code={CLONE} copy />
              <CodeBlock
                code={MEASURE}
                copy
                caption="For each minor release tag: its date, the number of app files that call the cache directly, and the number of lines that use the helper."
              />
              <p>Then read the fix, and the rules that changed with the code:</p>
              <CodeBlock code={COMMIT_BODIES} copy />
              <h3>Exercises</h3>
              <Exercises exercises={measureExercises} />
            </Part>

            <Part id="try" number={13} title="Lab 3: Talk to Sam">
              <p>
                Sam, the Smarter Developer Guide, answers from the Smarter Project MCP
                server, which indexes the repository, CLAUDE.md and the skills included,
                and the blog. His own instructions say what Smarter’s skills say: find two
                or three existing implementations of the same kind, and follow them.
              </p>
              <div className="my-8 max-w-3xl">
                <SmarterChatEmbed bot={chatbots.developer} height="640px" />
              </div>
              <h3>Experiments</h3>
              <Experiments experiments={experiments} />
            </Part>

            <Part id="caveats" number={14} title="Caveats and takeaways">
              <p>
                <strong>About the numbers.</strong> The author contributed about 1,500
                lines of source a week over three and a half years; Claude Code, about
                40,000 in its first week, or about 25 times that pace. But lines of code
                are a poor measure of productivity, and they aren’t comparable: the
                author’s include the subsystems, the slowest lines to get right, and the
                reason the agent’s could be written so fast. Part 1 concludes that the
                pace belongs to the conditions, a well-understood road map meeting a
                codebase ready for it.
              </p>
              <p>
                <strong>About the measurement.</strong> The transcripts come from one
                machine over three weeks. Sources are classified by pattern-matching shell
                commands, so every number is an approximation. And use isn’t value: the
                ADRs are rarely read because their content moved into the skills, not
                because they don’t matter.
              </p>
              <Callout type="exercise" title="Takeaways, to keep">
                <ol className="list-decimal space-y-1 ps-5">
                  <li>
                    Build your subsystems by hand, well, before an agent builds on them.
                  </li>
                  <li>Raise test coverage, and make the tests runnable by the agent.</li>
                  <li>Annotate types, and enforce them with pre-commit hooks.</li>
                  <li>Make patterns consistent, and say which one to copy.</li>
                  <li>Keep a short, always-loaded file that points to the rest.</li>
                  <li>Turn every agent mistake into a written rule, under review.</li>
                  <li>
                    Count both ways at every release tag, and fix every copy at once.
                  </li>
                  <li>
                    Put the guard rails in the environment, and keep people on the
                    irreversible steps.
                  </li>
                </ol>
              </Callout>
              <p>
                A 25-times multiplier is neutral. It makes a telescoping series converge
                25 times faster, and a geometric one diverge 25 times faster. Every so
                often, count what your agent reads. If its sources are getting better
                faster than its code is getting bigger, the series is still converging.
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
        title="Read the rules an agent follows"
        text="Smarter’s CLAUDE.md, its Agent Skills and its whole history are public. Clone the repository, run the measurements, and write the first rule for your own."
      >
        <Button href={REPO} icon="lucide:github">
          smarter-sh/smarter
        </Button>
        <Button href={AGENTIC_DOCS} variant="secondary" icon="lucide:book-open">
          Agentic development in Smarter
        </Button>
      </CtaBand>
    </PageShell>
  )
}
export default AiCodingAgents
