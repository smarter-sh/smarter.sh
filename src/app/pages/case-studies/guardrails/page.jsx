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
import { QUICK_START } from '@/common/constants'
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
import SequenceDiagram from '../components/SequenceDiagram'
import GuardrailSimulator from './components/GuardrailSimulator'
import {
  ADDRESS_CODE,
  CHAT_LIB,
  EXTRACTION_CODE,
  GUARDRAIL_DOCS,
  GUARDRAIL_SERVICES,
  MASK_CODE,
  PII_MANIFEST,
  POSTS,
  SANITIZE_CODE,
  actors,
  challenges,
  detectors,
  discussion,
  dispositions,
  experiments,
  facts,
  files,
  htmlLayers,
  labExercises,
  layers,
  objectives,
  readingList,
  repo,
  sections,
  sequence,
  sourceFile,
  ssrfRules,
  strategies,
} from './data'

/*
 * Case Study: Guardrails.
 *
 * A lesson, in the form of a business-school case, on whether an AI application can trust what its model
 * receives and what it says. Built on Smarter's Guardrail resource and three blog posts: guardrails in
 * YAML, rendering the model's reply as untrusted HTML, and an HTTP client for URLs that a model chooses.
 * Sam, the Smarter Developer Guide, runs four guardrails and is live (src/common/chatbots.js); Lab 2 runs
 * a JavaScript copy of those four guardrails in the browser; and the built-in guardrail manifests open,
 * from GitHub, in the site's manifest editor.
 */

const Guardrails = () => {
  return (
    <PageShell
      title="Case Study: Guardrails"
      description="A teaching case: can an AI application trust what its model receives, and what it says? Guardrails declared in YAML, run in priority order and audited; a chat widget that treats every reply as untrusted HTML; and an HTTP client that refuses the private addresses a model might choose. With a live assistant, an in-browser guardrail pipeline and an editor for the manifests."
    >
      <ManifestProvider repo={repo} files={files}>
        <PageHero
          eyebrow="Case study"
          title="Guardrails:"
          highlight="can you trust the model?"
          accent="emerald"
          lead="How a public AI assistant decides what may reach its model, and what may reach its visitors, with a few YAML files, a defined order, an honest list of what they don’t cover, and the defenses behind them."
        >
          <Button href="#try" icon="lucide:message-circle">
            Talk to Sam
          </Button>
          <Button href="#simulator" variant="secondary" icon="lucide:shield-check">
            Run the pipeline
          </Button>
          <Button href={GUARDRAIL_DOCS} variant="secondary" icon="lucide:book-open">
            Guardrail docs
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
            Everything in this case is real and running: Sam, his four guardrails, the
            chat widget and the code. The case is adapted from three posts on the Smarter
            blog: <TextLink href={POSTS.guardrails}>LLM Guardrails in YAML</TextLink>,{' '}
            <TextLink href={POSTS.html}>Rendering LLM Output as Untrusted HTML</TextLink>{' '}
            and{' '}
            <TextLink href={POSTS.ssrf}>
              A Hardened HTTP Client for URLs an LLM Chooses
            </TextLink>
            .
          </div>

          <div className="mx-auto mt-6 grid max-w-6xl gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <Contents sections={sections} />
            </aside>

            <article className="min-w-0">
              <Part id="situation" number={1} title="The situation">
                <p>
                  Sam, the Smarter Developer Guide, is a public AI assistant. Anyone who
                  opens this page can type into him, with no account. His replies are
                  rendered on whatever web page embeds him. And to answer, he calls tools
                  that read text that someone else wrote: source code, documentation, blog
                  posts.
                </p>
                <p>
                  That’s three groups of strangers: the visitors who type, the authors of
                  everything his tools read, and the people whose web pages show his
                  replies. Most of them mean well. An assistant in public has to be built
                  for the ones who don’t:
                </p>
                <ul className="mb-6 flex max-w-3xl flex-wrap gap-2">
                  {[
                    'Ignore all previous instructions…',
                    'Here’s my config, password and all.',
                    '<img src=x onerror=…>',
                    'Fetch http://169.254.169.254/…',
                  ].map((example) => (
                    <li
                      key={example}
                      className="rounded-full border border-keen-300 bg-white px-4 py-1.5 font-mono text-[13px] text-keen-800"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
                <p>
                  This case is about the controls that stand between them and the model.
                </p>
              </Part>

              <Part
                id="problem"
                number={2}
                title="The problem: an instruction is a request, not a rule"
              >
                <p>
                  Most teams start with a sentence in the system prompt: “never reveal a
                  customer’s card number”. They discover that the model follows it most of
                  the time. A model predicts likely text. A sentence in its context makes
                  some replies more likely, and others less. It doesn’t make any reply
                  impossible.
                </p>
                <Callout type="term" title="Prompt injection">
                  <p>
                    Text written to make a model follow the writer’s instructions instead
                    of the application’s: “ignore all previous instructions and…”. When
                    the text arrives through something a tool read, such as a web page or
                    a document, rather than from the user, it’s called <em>indirect</em>{' '}
                    prompt injection.
                  </p>
                </Callout>
                <Callout type="term" title="Guardrail">
                  <p>
                    The code that sits between a person and an LLM and decides whether a
                    message may pass, and in what form. It’s the system prompt’s rule
                    written as software: it runs on every prompt, whether the model is in
                    a cooperative mood or not, and it leaves a record when it acts.
                  </p>
                </Callout>
                <Callout type="exercise" title="Before you read on">
                  <p>
                    Write down three things that you would never want a public chatbot on
                    your organization’s web site to receive, and three that you would
                    never want it to say. Keep the list: you’ll check it against Sam’s
                    guardrails in Lab 3.
                  </p>
                </Callout>
              </Part>

              <Part id="doors" number={3} title="Three doors">
                <p>
                  Untrusted text reaches an AI application through three doors: what the
                  user types, what the model replies, and what the tools bring in or go
                  out to fetch. Figure 1 follows one message through the first two.
                </p>
                <SequenceDiagram
                  actors={actors}
                  steps={sequence}
                  caption={
                    <>
                      <strong className="text-keen-800">Figure 1.</strong> One message
                      through Sam’s guardrails. The password is removed before the message
                      leaves Smarter (step 3), so the model and its provider never receive
                      it. The reply is checked again on the way out (step 7), and once
                      more by the widget that shows it (step 9).
                    </>
                  }
                />
                <p>
                  Each door has its own defense, and this case takes them in turn:{' '}
                  <strong>guardrails</strong> for the first two (Parts 5 to 11), the{' '}
                  <strong>chat widget’s sanitizer</strong> for the reply as it becomes a
                  web page (Part 12), and a <strong>hardened HTTP client</strong> for the
                  URLs that tools fetch (Part 13).
                </p>
              </Part>

              <Part id="hard" number={4} title="Why it’s hard">
                <CardGrid cards={challenges} numbered />
                <p>
                  None of these has a complete answer. The design question is which
                  partial answers to combine, and how to know what each one misses.
                </p>
              </Part>

              <Part id="manifest" number={5} title="A guardrail is a manifest">
                <p>
                  In Smarter, a Guardrail is a resource like any other, declared in a YAML
                  manifest and applied with the same command as an LLMClient or a Plugin.
                  Here is one of the built-in guardrails that every Smarter platform
                  loads. It redacts personal data from the user’s message before the
                  message leaves for a third-party LLM provider.
                </p>
                <CodeBlock
                  code={PII_MANIFEST}
                  number={2}
                  caption="pii_redaction_input, trimmed. Twenty lines that a security reviewer can read without reading the chat pipeline."
                />
                <p>
                  An LLMClient opts in by listing guardrails by name, under{' '}
                  <Code>spec.guardrails</Code>. That is the whole integration: the code
                  that calls the LLM doesn’t change, and the guardrail is reviewed,
                  versioned and diffed like any other file. Open{' '}
                  <ManifestLink path="llm-clients/llmclient-smarter-developer.yaml" /> and
                  find Sam’s four.
                </p>
                <p>
                  Each guardrail combines two choices. Its <strong>strategy</strong>{' '}
                  decides whether some text triggers it:
                </p>
                <Table
                  head={['Strategies', 'How they decide', 'Cost']}
                  rows={strategies}
                />
                <p>
                  Its <strong>action</strong> decides what happens next: <Code>log</Code>,{' '}
                  <Code>flag</Code>, <Code>redact</Code>, <Code>transform</Code>,{' '}
                  <Code>block</Code> or <Code>escalate</Code>.
                </p>
                <Callout type="idea" title="Redacting needs to know where">
                  <p>
                    Redact and transform rewrite the matched characters, so they need a
                    strategy that reports where the match is. The manifest refuses{' '}
                    <Code>redact</Code> with <Code>llm_judge</Code>: a judge says “yes,
                    this is personal data” without saying which characters.
                  </p>
                </Callout>
                <p>
                  The <Code>detector</Code> strategy is the one most teams want. Its
                  built-in detectors are{' '}
                  {detectors.map((name, i) => (
                    <span key={name}>
                      <Code>{name}</Code>
                      {i < detectors.length - 1 ? ', ' : '. '}
                    </span>
                  ))}
                  Where the data has a checksum, the detector checks it: a card number
                  must pass the Luhn check, and an IBAN the mod-97 check. They favor
                  precision over recall, so a 16-digit order number isn’t taken for a
                  card.
                </p>
              </Part>

              <Part id="order" number={6} title="Order, and the most severe outcome">
                <p>
                  An LLMClient usually has several guardrails, and they interact. Smarter
                  runs them one at a time, sorted by <Code>priority</Code>, lowest first,
                  and each sees the text as the guardrails before it left it. The result
                  is the most severe disposition of any guardrail that triggered, from{' '}
                  <TextLink href={sourceFile(`${GUARDRAIL_SERVICES}/pipeline.py`)}>
                    pipeline.py
                  </TextLink>
                  , least severe first:
                </p>
                <Table head={['Disposition', 'What it means']} rows={dispositions} />
                <p>Two consequences follow, and both are deliberate.</p>
                <Callout type="idea" title="Ordering is a privacy control">
                  <p>
                    A redaction at priority 10 runs before an <Code>llm_judge</Code> at
                    priority 90, so the judge, itself a call to a third-party model, never
                    sees the card number that the redaction removed. Redact before any
                    guardrail that sends text to another model.
                  </p>
                </Callout>
                <Callout type="idea" title="Ordering is a cost control">
                  <p>
                    The first guardrail that blocks stops the pipeline. Give cheap local
                    checks the low numbers and the guardrails that call a model the high
                    ones: a message that a keyword list rejects in microseconds never pays
                    for a judge.
                  </p>
                </Callout>
                <p>
                  When an input guardrail blocks, the LLM isn’t called at all. The user
                  gets the guardrail’s message as an ordinary assistant reply, with a{' '}
                  <Code>finish_reason</Code> of <Code>content_filter</Code>, which is what
                  the OpenAI API returns when its own filter steps in, so clients that
                  already handle that case need nothing new. The blocked message is also
                  replaced in the stored history with a placeholder, so it isn’t sent to
                  the model with the next prompt either.
                </p>
              </Part>

              <Part
                id="operate"
                number={7}
                title="Shadow mode, failing open, and an audit trail"
              >
                <p>
                  Two settings decide how a guardrail behaves while you aren’t yet sure of
                  it, and when it breaks.
                </p>
                <p>
                  <strong>
                    <Code>mode: monitor</Code>
                  </strong>{' '}
                  evaluates the guardrail and records what it would have done, but never
                  changes or blocks anything. New guardrails should start there. A regex
                  that looks precise on a whiteboard will match something you didn’t
                  expect in real traffic, and monitor mode lets you find out from the
                  event log rather than from a user.
                </p>
                <p>
                  <strong>
                    <Code>failClosed</Code>
                  </strong>{' '}
                  decides what happens when the guardrail itself fails, for example
                  because its moderation provider timed out. The engine catches every
                  exception, records it, and by default lets the prompt continue, so a
                  broken guardrail never breaks a chat. With <Code>failClosed: true</Code>{' '}
                  it blocks instead, and an outage of the provider becomes an outage of
                  your chatbot. That trade is visible in the same file.
                </p>
                <Callout type="term" title="Fail open, fail closed">
                  <p>
                    A control <em>fails open</em> when, broken, it lets everything
                    through, and <em>fails closed</em> when, broken, it lets nothing
                    through. Fail-open suits a guardrail that reduces risk; fail-closed
                    suits one that enforces a legal obligation.
                  </p>
                </Callout>
                <p>
                  Every time a guardrail triggers or fails, Smarter records an event:
                  which guardrail, which LLMClient and session, the stage, the action, the
                  outcome and a short excerpt of what it matched. An audit trail that
                  stored the card number it had just redacted would be a new place for the
                  card number to leak from. So the excerpt is masked by category:
                </p>
                <CodeBlock
                  code={MASK_CODE}
                  number={3}
                  caption="From events.py. A secret is recorded only by its length; personal data keeps its last four characters, enough to say “the card ending in 4242” and no more."
                />
              </Part>

              <Part id="scope" number={8} title="What a guardrail looks at">
                <p>
                  This is the part to read twice. A guardrail you think covers something
                  it doesn’t is worse than none. Smarter’s guardrails scan two pieces of
                  text, and nothing else:
                </p>
                <ul className="mb-6 max-w-3xl list-disc space-y-2 ps-6 text-[15px] leading-relaxed text-keen-700">
                  <li>
                    <strong>Input guardrails scan the user’s latest message.</strong> Not
                    the system prompt, which would make an injection guardrail trigger on
                    the operator’s own instructions. Not the earlier turns.
                  </li>
                  <li>
                    <strong>Output guardrails scan the model’s final reply</strong>, after
                    any tool calls have been answered.
                  </li>
                </ul>
                <CodeBlock
                  code={EXTRACTION_CODE}
                  number={4}
                  caption="From text_extraction.py: the input stage reads one message, the latest one from the user."
                />
                <Callout type="caution" title="Tool results aren’t scanned">
                  <p>
                    The guardrails don’t see what plugins, MCP servers and extensions
                    return to the model, or the arguments of the tool calls it makes. A
                    web page that the search plugin fetched, carrying instructions aimed
                    at the model, reaches it without passing an input guardrail. Indirect
                    prompt injection is real, and isn’t what these guardrails defend
                    against. An output guardrail still catches a leak in what the user is
                    shown, whatever caused it; it won’t catch a tool call that sends data
                    somewhere else before the reply is written. The guardrails also run
                    only in Smarter’s chat pipeline, not in its provider proxy.
                  </p>
                </Callout>
                <p>
                  The source post rates guardrails about a 6 out of 10 for a typical
                  deployment. They cover the most visible surface, a person typing and
                  reading, and its most common incidents. They lose points for everything
                  a tool brings in, and because pattern guardrails are evaded by anyone
                  willing to spell a word differently. The model-based strategies are
                  harder to evade, and are themselves models that can be argued with.
                </p>
              </Part>

              <Part id="try" number={9} title="Lab 1: Talk to Sam">
                <p>
                  Sam runs four guardrails, two on each stage. In priority order:{' '}
                  <ManifestLink path="guardrails/secrets-redaction-input.yaml" /> and{' '}
                  <ManifestLink path="guardrails/prompt-injection-keyword-input.yaml" />{' '}
                  on what you type;{' '}
                  <ManifestLink path="guardrails/secrets-leak-output.yaml" /> and{' '}
                  <ManifestLink path="guardrails/script-injection-output.yaml" /> on what
                  he replies. Work through the experiments, and predict each result from
                  the manifests before you send it.
                </p>
                <div className="my-8 max-w-3xl">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-keen-900">
                      Sam, with four guardrails
                    </h3>
                    <p className="text-sm text-keen-600">
                      LLMClient ·{' '}
                      <ManifestLink path="llm-clients/llmclient-smarter-developer.yaml" />
                    </p>
                  </div>
                  <SmarterChatEmbed bot={chatbots.developer} height="600px" />
                </div>
                <h3>Experiments</h3>
                <Experiments experiments={experiments} />
                <Callout type="caution" title="Use test values">
                  <p>
                    Never type a real password or key into any chatbot, guarded or not.
                    The values above are made up, which is the only reason to use them.
                  </p>
                </Callout>
              </Part>

              <Part id="simulator" number={10} title="Lab 2: Run the pipeline">
                <p>
                  Here are Sam’s four guardrails again, as a copy in JavaScript that runs
                  in your browser, so you can see each one’s verdict, in order. Edit the
                  message and the reply, and put guardrails into monitor mode.
                </p>
                <GuardrailSimulator />
                <h3>Exercises</h3>
                <Steps
                  steps={[
                    'With the starting message, which guardrail acts first, and what does the second one see? Why is the password gone from the text that was blocked anyway?',
                    'Put prompt_injection_keyword_input into monitor mode. The disposition drops from BLOCKED to REDACTED. What would reach the model now?',
                    'Change “Ignore previous instructions” to “Ignore your previous instructions”. Why does nothing block it? Try “IGNORE PREVIOUS INSTRUCTIONS”, and explain the difference.',
                    'In the reply, change secret: tiger-lily-42 to secret: tiger. Why does the detector let it through? What does that rule trade away?',
                  ]}
                />
              </Part>

              <Part id="lab" number={11} title="Lab 3: The guardrail manifests">
                <p>
                  Here are Sam’s four guardrails, three that he doesn’t run, and his own
                  manifest, read live from GitHub. As you type, the editor validates each
                  against the JSON Schema that the platform publishes for its kind. Hover
                  over any key for an explanation.
                </p>
                <div className="my-8">
                  <ManifestLab initialPath="guardrails/prompt-injection-keyword-input.yaml" />
                </div>
                <h3>Exercises</h3>
                <Exercises exercises={labExercises} />
                <Callout type="exercise" title="Check your list">
                  <p>
                    Go back to the list you wrote in Part 2. Which of your six would Sam’s
                    guardrails catch? Which built-in guardrail, in the{' '}
                    <TextLink href="https://github.com/smarter-sh/example-manifests/tree/main/guardrails">
                      guardrails folder
                    </TextLink>
                    , would catch the others? Which would none of them catch?
                  </p>
                </Callout>
              </Part>

              <Part
                id="html"
                number={12}
                title="The second line: the reply is untrusted HTML"
              >
                <p>
                  Sam’s replies are Markdown, and the chat widget, the{' '}
                  <Code>@smarter.sh/ui-chat</Code> package, turns them into HTML on
                  whatever page embeds it. It’s tempting to treat the model’s reply as the
                  application’s own output, like a template the developer wrote. It isn’t.
                  It’s shaped by everything in the model’s context, including web pages
                  and documents that anyone could have written. If the model can be
                  persuaded to write <Code>{'<img src=x onerror=…>'}</Code>, and the
                  widget turns that into a page element, the attacker’s script runs with
                  the embedding site’s origin: its cookies, its storage, its logged-in
                  session.
                </p>
                <Callout type="term" title="Cross-site scripting (XSS)">
                  <p>
                    An attack in which text from an attacker becomes script on someone
                    else’s page. An XSS in a widget is an XSS in every site that embeds
                    it.
                  </p>
                </Callout>
                <Callout
                  type="caution"
                  title="A shadow DOM is a style boundary, not a security boundary"
                >
                  <p>
                    The widget draws itself in a shadow root, so that the site’s CSS can’t
                    change the chat and the chat’s CSS can’t change the site. A shadow
                    root isolates styles and element ids. It doesn’t isolate scripts: an
                    event handler inside it runs with the page’s origin, exactly as if it
                    were outside.
                  </p>
                </Callout>
                <p>
                  So the defense is in how a message becomes HTML, in{' '}
                  <TextLink href={sourceFile(`${CHAT_LIB}/messages.ts`)}>
                    messages.ts
                  </TextLink>
                  . It has six layers:
                </p>
                <CardGrid cards={htmlLayers} />
                <CodeBlock
                  code={SANITIZE_CODE}
                  number={5}
                  caption="The renderer’s overrides and the final sanitizer, trimmed from messages.ts. The renderer is written not to produce dangerous HTML; DOMPurify assumes that it failed."
                />
                <p>
                  Compare this with <Code>script_injection_output</Code> from Lab 1. Both
                  stop the same attack, at different points. The guardrail runs on the
                  platform, for any client, including ones that render HTML carelessly.
                  The widget runs in the browser, and protects a page even from a reply
                  that every guardrail missed. That overlap is the point.
                </p>
              </Part>

              <Part id="ssrf" number={13} title="The third line: URLs a model chooses">
                <p>
                  The third door opens outward. A web search plugin fetches the pages that
                  the model chose from search results. A server that fetches a URL on
                  someone else’s behalf can be pointed at addresses that only the server
                  can reach: its own admin port, a database on a private subnet, or, in a
                  cloud, the instance metadata service at <Code>169.254.169.254</Code>,
                  which hands out temporary credentials to anyone on the machine who asks.
                </p>
                <Callout type="term" title="Server-side request forgery (SSRF)">
                  <p>
                    An attack that makes a server send a request it shouldn’t, to an
                    address of the attacker’s choosing. Classic SSRF needed a form field
                    that took a URL. An LLM application has something better: a model that
                    decides which URL to fetch, and can be talked into it.
                  </p>
                </Callout>
                <p>
                  Smarter’s plugins fetch the web through{' '}
                  <TextLink href={sourceFile('smarter/apps/llmtool/plugin/safe_http.py')}>
                    safe_http
                  </TextLink>
                  , a small wrapper around Python’s requests library. Its rules fit in a
                  list:
                </p>
                <Steps steps={ssrfRules} />
                <CodeBlock
                  code={ADDRESS_CODE}
                  number={6}
                  caption="The address check, trimmed from safe_http.py. It resolves the name, checks every address, and allows only addresses that are globally routable, instead of listing the ranges to block."
                />
                <Callout type="idea" title="Check addresses, not names">
                  <p>
                    A filter that rejects the strings <Code>localhost</Code> and{' '}
                    <Code>127.0.0.1</Code> is defeated by any DNS name that resolves to
                    127.0.0.1, by <Code>0177.0.0.1</Code>, by <Code>[::1]</Code>.
                    Resolving first, and asking Python’s <Code>ipaddress</Code> module
                    about the result, sidesteps every spelling. And a redirect is a second
                    door: a check that validates the first URL and lets the library follow
                    a <Code>302</Code> to the metadata service has validated nothing.
                  </p>
                </Callout>
                <p>
                  The module documents its own gap. It resolves a name to check it, and
                  requests resolves it again to connect; a DNS server under an attacker’s
                  control can answer the two lookups differently. That window, DNS
                  rebinding, is written down in the module’s docstring, with the stronger
                  control that closes it: an egress proxy, at the network layer.
                </p>
              </Part>

              <Part id="depth" number={14} title="Defense in depth">
                <p>
                  No layer in this case is complete, and each says what it misses. Put
                  together:
                </p>
                <Table head={['Layer', 'Looks at', 'Catches', 'Misses']} rows={layers} />
                <p>
                  Read the last column. Each layer’s gaps are covered, at least in part,
                  by another one, and the gap that nothing covers, a tool result carrying
                  instructions, is narrowed by giving tools as little power as possible:
                  read-only connections, and no way to send data to an address the model
                  chooses.
                </p>
                <Callout type="exercise" title="Takeaways, to keep">
                  <ol className="list-decimal space-y-1 ps-5">
                    <li>Put guardrails in configuration a reviewer can read.</li>
                    <li>
                      Run them in order, cheap and local first; the worst outcome wins.
                    </li>
                    <li>Redact before any guardrail that sends text to another model.</li>
                    <li>
                      Start every guardrail in monitor mode; choose fail-open or closed.
                    </li>
                    <li>Mask what the audit trail records.</li>
                    <li>
                      Write down exactly which text you scan, and defend the rest
                      elsewhere.
                    </li>
                    <li>
                      Treat the model’s reply as untrusted input, everywhere it’s shown.
                    </li>
                    <li>
                      Check the address a model’s URL resolves to, at every redirect.
                    </li>
                  </ol>
                </Callout>
                <p>
                  Treat the guardrails as the controls on the front door, and keep the
                  tools behind them on a short leash. They reduce risk; they don’t remove
                  it.
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
          title="Guard your own assistant"
          text="Every Smarter platform loads the built-in guardrails. Install Smarter, list a few in an LLMClient’s spec.guardrails, start them in monitor mode, and read what they would have done."
        >
          <Button href={QUICK_START} icon="lucide:rocket">
            Install Smarter
          </Button>
          <Button href={GUARDRAIL_DOCS} variant="secondary" icon="lucide:book-open">
            Read the documentation
          </Button>
        </CtaBand>
      </ManifestProvider>
    </PageShell>
  )
}
export default Guardrails
