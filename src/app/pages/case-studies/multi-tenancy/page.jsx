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
  Commands,
  Contents,
  Exercises,
  Glance,
  Part,
  Questions,
  ReadingList,
  Table,
  TextLink,
} from '../components/Teaching'
import SequenceDiagram from '../components/SequenceDiagram'
import RulesLab from './components/RulesLab'
import {
  CHANGE_RULE,
  CORS_CODE,
  KEY_CODE,
  LISTVIEW_CODE,
  PATTERN_LINE,
  PROFILE_CODE,
  READ_RULE,
  SESSION_CODE,
  actors,
  corsProperties,
  curlCommands,
  defaults,
  discussion,
  facts,
  files,
  hostLayers,
  isolationDesigns,
  keyProperties,
  labExercises,
  objectives,
  posts,
  profileChecks,
  readingList,
  repo,
  ruleQuestions,
  rulesTable,
  sections,
  sequence,
  sourceFile,
} from './data'

/*
 * Case Study: One Platform, Many Tenants.
 *
 * A lesson, in the form of a business-school case, built on the platform's account app and six posts on
 * blog.smarter.sh: how one Django application and one database keep every account's resources apart. It
 * covers the two queryset rules that every lookup starts from, the profile switcher, Host header checks,
 * chat sessions bound to one chatbot, per-chatbot CORS and CSRF, and API keys stored as digests. Lab 1
 * applies the rules interactively; Lab 2 probes a live chatbot's boundaries with curl; Lab 3 opens two
 * LLMClient manifests, from GitHub, in the site's manifest editor.
 */

const MultiTenancy = () => {
  return (
    <PageShell
      title="Case Study: One Platform, Many Tenants"
      description="A teaching case: how one Django platform and one database keep every account's AI resources apart, with queryset rules, a profile switcher that can't be spoofed, Host header checks, chat sessions bound to one chatbot, per-chatbot CORS and API keys stored as digests. With an interactive rules lab, curl labs against a live chatbot, and an editor for its manifests."
    >
      <ManifestProvider repo={repo} files={files}>
        <PageHero
          eyebrow="Case study"
          title="One Platform,"
          highlight="Many Tenants"
          accent="emerald"
          lead="How one Django application and one shared database keep every account’s chatbots, Secrets and conversations apart, and why every value that a client sends is treated as a claim to check."
        >
          <Button href="#rules-lab" icon="lucide:shield-check">
            Apply the rules
          </Button>
          <Button href="#curl" variant="secondary" icon="lucide:terminal">
            Probe a live chatbot
          </Button>
          <Button
            href={sourceFile('apps/account/models/metadata_with_ownership.py')}
            variant="secondary"
            icon="lucide:github"
          >
            The ownership model
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
            The platform, its code and the chatbots you’ll probe are real and running. The
            people and accounts in the examples (Acme, Globex, Mallory) are made up. The
            case is adapted from six posts on the Smarter blog, starting with{' '}
            <TextLink href={posts.querysets}>Tenant Isolation as Queryset Rules</TextLink>
            .
          </div>

          <div className="mx-auto mt-6 grid max-w-6xl gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <Contents sections={sections} />
            </aside>

            <article className="min-w-0">
              <Part id="situation" number={1} title="The situation">
                <p>
                  Smarter is an open source platform for building AI applications. One
                  installation serves many organizations. Each is an{' '}
                  <strong>account</strong>, with its own people, chatbots, plugins,
                  database connections, Secrets (provider API keys and database
                  passwords), Guardrails and chat histories. One person may belong to
                  several accounts: a consultant who works for Acme and for Globex has a
                  membership, a <strong>profile</strong>, in each.
                </p>
                <Callout type="term" title="Tenant">
                  <p>
                    One customer of a shared system, whose data must stay separate from
                    every other customer’s. In Smarter, a tenant is an account. A system
                    that serves many tenants from one installation is{' '}
                    <em>multi-tenant</em>.
                  </p>
                </Callout>
                <p>Every day, the platform has to answer questions like:</p>
                <ul className="mb-6 flex max-w-3xl flex-wrap gap-2">
                  {[
                    'May Ana read this Secret?',
                    'Which account is Chen working as right now?',
                    'Is this hostname a real chatbot?',
                    'May a page on example.com read this chatbot’s answers?',
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
                  Each answer has to be right every time. A single wrong one moves one
                  organization’s credentials, prompts or conversations into another’s.
                </p>
              </Part>

              <Part
                id="problem"
                number={2}
                title="The problem: everyone’s rows are in the same tables"
              >
                <p>
                  Smarter runs one Django application on one MariaDB database. Acme’s
                  chatbots and Globex’s chatbots are rows in the same table, numbered by
                  the same counter. Nothing in the database itself says that row 40 is
                  Acme’s and row 41 is Globex’s, except a column that the application has
                  to remember to check.
                </p>
                <Callout type="term" title="Broken Object Level Authorization (BOLA)">
                  <p>
                    An endpoint that takes an object’s id from the request and loads the
                    object without asking whether the caller may have it. OWASP lists it
                    first among API security risks. Sign up for a free account, open your
                    own chatbot, change the id in the url, and get someone else’s.
                  </p>
                </Callout>
                <p>
                  For Smarter the stakes are concrete. A cross-tenant read leaks
                  credentials and system prompts, which are often the product itself. A
                  cross-tenant write can repoint a customer’s chatbot at an attacker’s
                  tools. And the attack surface is every endpoint that touches a tenant’s
                  resource.
                </p>
                <Callout type="exercise" title="Before you read on">
                  <p>
                    Think of a web application you’ve built or used. Find a url or request
                    with an id in it. What, exactly, stops a signed-in user from changing
                    that id to someone else’s? Write it down; you’ll compare it with
                    Smarter’s answer in Part 4.
                  </p>
                </Callout>
              </Part>

              <Part id="designs" number={3} title="Three ways to isolate tenants">
                <p>
                  There are three common designs, and each puts the boundary in a
                  different place:
                </p>
                <Table
                  mono={false}
                  head={['Design', 'Where the boundary is']}
                  rows={isolationDesigns}
                />
                <p>
                  Smarter uses the third, because it needs what the first makes hard:
                  built-in Guardrails and other platform resources that every account
                  reads without copying them, sharing among an account’s members without a
                  table of grants, and one person who belongs to several accounts.
                </p>
                <Callout type="caution" title="The cost of that choice">
                  <p>
                    Isolation depends on every lookup going through the rules. Nothing
                    below the application backs them up. Most of the design that follows
                    is about making the rules the easy path, so that new code picks them
                    up without trying.
                  </p>
                </Callout>
              </Part>

              <Part id="rules" number={4} title="The rules, as querysets">
                <Callout type="term" title="QuerySet">
                  <p>
                    Django’s representation of a database query that hasn’t run yet.{' '}
                    <Code>LLMClient.objects.filter(name=&quot;support&quot;)</Code> is a
                    QuerySet. Calling <Code>.filter()</Code>, <Code>.order_by()</Code> or{' '}
                    <Code>.get()</Code> on it adds to the same query, and it runs only
                    when you read its results.
                  </p>
                </Callout>
                <p>
                  Smarter adds two methods to a custom QuerySet that every ownable
                  resource’s manager returns, in{' '}
                  <TextLink
                    href={sourceFile('apps/account/models/metadata_with_ownership.py')}
                  >
                    metadata_with_ownership.py
                  </TextLink>
                  . The owner of a resource is a profile (a person in an account), and the
                  read rule follows from it:
                </p>
                <CodeBlock
                  code={READ_RULE}
                  caption="with_read_permission_for(), trimmed. A member reads everything owned in their accounts, plus everything owned by the platform’s own account."
                />
                <p>Changing a resource has a separate, stricter rule:</p>
                <CodeBlock
                  code={CHANGE_RULE}
                  caption="The heart of with_ownership_permission_for(). Like the read rule, it takes the union over the user’s profiles."
                />
                <Table
                  mono={false}
                  head={['Who', 'May read', 'May change']}
                  rows={rulesTable}
                />
                <p>The security properties are in the details:</p>
                <ul className="mb-6 max-w-3xl list-disc space-y-2 ps-6 text-[15px] leading-relaxed text-keen-700">
                  <li>
                    <strong className="text-keen-900">The default is empty.</strong> An
                    anonymous user, an object that isn’t a User, or a user without a
                    profile gets <Code>self.none()</Code>. Nothing depends on the caller
                    remembering to check <Code>is_authenticated</Code> first.
                  </li>
                  <li>
                    <strong className="text-keen-900">
                      Reading and changing differ.
                    </strong>{' '}
                    A teammate who can read your chatbot can’t rewrite it.
                  </li>
                  <li>
                    <strong className="text-keen-900">The result is a QuerySet.</strong>{' '}
                    It composes with whatever comes next, so the safe lookup and the
                    convenient lookup are the same expression:
                  </li>
                </ul>
                <CodeBlock
                  code={PATTERN_LINE}
                  caption="From a web console delete view. This one line is the pattern."
                />
                <SequenceDiagram
                  actors={actors}
                  steps={sequence}
                  caption={
                    <>
                      <strong className="text-keen-800">Figure 1.</strong> A guessed id,
                      refused. A resource outside the rule doesn’t exist as far as the
                      query is concerned (the SQL is simplified). Mallory can’t tell “not
                      yours” from “not there”, so there’s nothing to enumerate.
                    </>
                  }
                />
                <Callout type="idea" title="404, not 403">
                  <p>
                    “403 Forbidden” would confirm that resource 41 exists. “404 Not
                    Found”, the same answer as an id that was never used, tells an
                    attacker nothing.
                  </p>
                </Callout>
              </Part>

              <Part
                id="defaults"
                number={5}
                title="Making the safe path the default path"
              >
                <p>
                  Query rules fail when someone writes{' '}
                  <Code>Model.objects.get(pk=pk)</Code> in a view and forgets the filter.
                  Smarter can’t make that impossible. It puts the rules where new code
                  picks them up without trying:
                </p>
                <CardGrid cards={defaults} />
                <CodeBlock
                  code={LISTVIEW_CODE}
                  caption="Every list page’s rows, from lib/django/listview.py. There is no unfiltered branch."
                />
                <Callout type="idea" title="Make the right thing the easy thing">
                  <p>
                    None of this proves that no endpoint loads a resource some other way.
                    It means that an endpoint built from the existing pieces is safe by
                    default, and that the exceptions are few enough to review.
                  </p>
                </Callout>
              </Part>

              <Part id="rules-lab" number={6} title="Lab 1: Apply the rules">
                <p>
                  Here are three accounts, Acme, Globex and the platform’s own, five
                  resources, and five people. Answer each question before you click, then
                  check your answer.
                </p>
                <ol className="mb-2 max-w-3xl list-decimal space-y-2 ps-6 text-[15px] leading-relaxed text-keen-700">
                  {ruleQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ol>
                <RulesLab />
                <Callout type="exercise" title="Explain the visitor’s row">
                  <p>
                    The visitor who isn’t signed in can read nothing, not even the
                    built-in Guardrail that every account reads. Which line of the read
                    rule makes that so?
                  </p>
                </Callout>
              </Part>

              <Part id="profiles" number={7} title="The profile switcher">
                <p>
                  The web console’s user menu has a Change Profile item that chooses which
                  of a person’s profiles the console acts as. That choice decides who owns
                  a resource you create, and which account a charge goes to: exactly the
                  kind of value an attacker would like to set to someone else’s profile.
                  So it’s checked twice, and more:
                </p>
                <div className="my-6 grid max-w-3xl gap-3 sm:grid-cols-2">
                  {profileChecks.map((check) => (
                    <div
                      key={check.title}
                      className="rounded-xl border border-keen-300 bg-white p-4 shadow-card"
                    >
                      <p className="mb-1 font-semibold text-keen-900">{check.title}</p>
                      <p className="text-sm leading-relaxed text-keen-600">
                        {check.text}
                      </p>
                    </div>
                  ))}
                </div>
                <CodeBlock
                  code={PROFILE_CODE}
                  caption="The second check, trimmed from apps/account/models/user_profile.py. The stored choice is a preference, not a fact."
                />
                <Callout
                  type="idea"
                  title="Choosing who you act as never widens what you see"
                >
                  <p>
                    Both rules take the union over all of a person’s profiles, whatever
                    profile is selected. So Chen reads the same resources whether the Acme
                    profile or the Globex one is selected. The choice changes who you act
                    as, among identities you already have, never what you may read or
                    change.
                  </p>
                </Callout>
              </Part>

              <Part id="hosts" number={8} title="Many hosts, one parent domain">
                <p>
                  Each deployed chatbot gets its own hostname, such as{' '}
                  <Code>weather.3141-5926-5359.api.ubc.smarter.sh</Code>: its name, its
                  account’s number, and the platform’s API domain. A busy platform has
                  thousands, created and deleted all day.
                </p>
                <Callout type="term" title="The Host header">
                  <p>
                    The part of an HTTP request that names the site it’s for. The client
                    chooses it. Django uses it to build absolute urls, in redirects and in
                    password-reset emails, so a forged Host can send a victim’s reset link
                    to the attacker. Django’s defense is <Code>ALLOWED_HOSTS</Code>, a
                    fixed list that no settings file could keep up with here.
                  </p>
                </Callout>
                <p>
                  Many projects give up with <Code>ALLOWED_HOSTS = [&quot;*&quot;]</Code>.
                  Smarter checks the Host in four layers, each doing what it’s good at (
                  <TextLink href={posts.hosts}>more on the blog</TextLink>):
                </p>
                <Table
                  mono={false}
                  head={['Layer', 'Where', 'Rejects']}
                  rows={hostLayers}
                />
                <p>
                  Layer 2 admits the API domain with a leading dot, which Django reads as
                  “every subdomain”. Layer 3’s middleware compares hosts with Python’s{' '}
                  <Code>fnmatch</Code>, which reads the same entry as a literal string
                  that no real host equals, so every subdomain falls through to a lookup
                  of the chatbot that owns it. No chatbot, 400.
                </p>
                <Callout type="caution" title="Don’t cache what isn’t there">
                  <p>
                    The lookup caches the chatbots it finds, by host, and invalidates them
                    when a chatbot is saved or deleted. It never caches a miss, so a new
                    chatbot is served on its first request, and nobody can fill the cache
                    with made-up hosts.
                  </p>
                </Callout>
              </Part>

              <Part id="sessions" number={9} title="One session, one chatbot">
                <Callout type="term" title="Session key">
                  <p>
                    A chat session is a conversation that the server remembers. Its key is
                    a 64-character random value that the chat gets from its chatbot’s{' '}
                    <Code>/config/</Code> endpoint and sends back with every prompt, so
                    the chatbot continues the same conversation. Whoever holds the key can
                    continue it: it’s a <em>bearer</em> value, like a session cookie.
                  </p>
                </Callout>
                <p>
                  Browsers treat every host under one parent domain as one site. A cookie
                  set for the parent goes to every chatbot, and a url copied from one
                  chatbot’s page works on another’s. If the server took any well-formed
                  key at face value, chatbot B would continue chatbot A’s conversation,
                  and A’s history would go to B’s owner, B’s logs, B’s tools and B’s
                  provider.
                </p>
                <p>
                  So one method, the only one that turns a key into a session, compares
                  the session’s chatbot with the request’s (
                  <TextLink href={sourceFile('apps/prompt/models/prompt_helper.py')}>
                    prompt_helper.py
                  </TextLink>
                  ):
                </p>
                <CodeBlock
                  code={SESSION_CODE}
                  caption="On a mismatch, start a new session, leave the other chatbot’s untouched, and return the new key to the client."
                />
                <p>
                  The same change made bad input harmless. A malformed key, from a cookie
                  some other application set or a truncated url, is logged and ignored,
                  and a new session starts. It used to cause a 500, which fills error logs
                  and tells a prober which inputs reach deep code.
                </p>
              </Part>

              <Part
                id="cors"
                number={10}
                title="CORS and CSRF: who may call a chatbot from a page"
              >
                <p>
                  Smarter Chat can be embedded in any web page: a WordPress site, a
                  Shopify store, this page. From the visitor’s browser, it calls its
                  chatbot’s <Code>/config/</Code> and <Code>/prompt/</Code>. That’s a
                  cross-origin request, so the browser asks first.
                </p>
                <Callout type="term" title="Origin, and CORS">
                  <p>
                    An origin is a scheme, a host and a port, such as{' '}
                    <Code>https://smarter.sh</Code>. Cross-Origin Resource Sharing is a
                    set of response headers that tell a browser which other origins may{' '}
                    <em>read</em> a response. Before some requests the browser sends a{' '}
                    <em>preflight</em>, an OPTIONS request that asks permission.
                  </p>
                </Callout>
                <p>
                  One platform-wide list would be wrong for somebody: too broad, and every
                  customer’s site could read every other customer’s chatbot in a visitor’s
                  browser; too narrow, and widgets break. So each chatbot names its own
                  origins, in its manifest’s <Code>allowedOrigins</Code>, and Smarter
                  plugs them into django-cors-headers through its{' '}
                  <Code>check_request_enabled</Code> signal (
                  <TextLink href={sourceFile('apps/llmclient/cors.py')}>cors.py</TextLink>
                  ):
                </p>
                <CodeBlock
                  code={CORS_CODE}
                  caption="The receiver, and the exact-match check."
                />
                <CardGrid cards={corsProperties} />
                <Callout
                  type="caution"
                  title="CORS doesn’t stop anyone sending a request"
                >
                  <p>
                    curl and any server-side script ignore it. A chatbot without an API
                    key is public by design. CORS stops a third-party page from reading,
                    in a visitor’s browser, what the browser fetched on the visitor’s
                    behalf. You’ll see the difference in Lab 2.
                  </p>
                </Callout>
                <Callout type="term" title="CSRF">
                  <p>
                    Cross-Site Request Forgery is a different attack: another site makes
                    the visitor’s browser send a state-changing request, with the
                    visitor’s cookies, that the visitor didn’t mean. Django defends with a
                    token that only the real site’s pages have, and a check of the
                    request’s Origin.
                  </p>
                </Callout>
                <p>
                  The web console, which a browser session authenticates, keeps Django’s
                  CSRF protection. The chat endpoints that other sites call are exempt: a
                  page on example.com can’t get a token for the platform, and those
                  endpoints authenticate with an API key in a header, or not at all. The
                  console’s session cookie is <Code>SameSite=Lax</Code>, so browsers don’t
                  send it with requests from other sites.
                </p>
                <Callout type="idea" title="One layer answers preflights">
                  <p>
                    The ingress for a chatbot deliberately has no Traefik CORS middleware.
                    If the proxy answered preflights with its fixed list, Django, which
                    knows each chatbot’s origins, would never get a vote.
                  </p>
                </Callout>
              </Part>

              <Part
                id="curl"
                number={11}
                title="Lab 2: Probe the edges of a live chatbot"
              >
                <p>
                  The weather chatbot below is public, needs no key, and lists{' '}
                  <Code>https://smarter.sh</Code> in its <Code>allowedOrigins</Code>,
                  which is why its chat works on this page. Talk to it if you like, then
                  run these in a terminal.
                </p>
                <div className="my-8 max-w-3xl">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-keen-900">
                      The weather chatbot
                    </h3>
                    <p className="text-sm text-keen-600">
                      LLMClient ·{' '}
                      <ManifestLink path="llm-clients/llmclient-weather.yaml" />
                    </p>
                  </div>
                  <SmarterChatEmbed bot={chatbots.weather} height="560px" />
                </div>
                <Commands commands={curlCommands} />
                <Callout type="exercise" title="Map each command to a layer">
                  <p>
                    For each of the five commands, name the part of this case that
                    explains its answer, and the layer that produced it: DNS, Traefik,
                    Django’s CORS middleware, or the session lookup.
                  </p>
                </Callout>
              </Part>

              <Part
                id="keys"
                number={12}
                title="API keys: stored as digests, named by a UUID"
              >
                <p>
                  Programs reach Smarter with API keys, and a key can do a lot: apply and
                  delete manifests, deploy chatbots, spend provider money. Keys leak from
                  the caller’s side, from CI secrets and <Code>.env</Code> files. The
                  design question here is what happens when the <em>platform’s</em> data
                  leaks: a backup, a replica, a developer’s restore.
                </p>
                <Callout type="term" title="Digest">
                  <p>
                    The output of a one-way hash function, such as SHA-512. The same input
                    always gives the same digest, but the digest can’t be turned back into
                    the input. Store a key’s digest, and you can recognize the key when it
                    arrives without being able to produce it.
                  </p>
                </Callout>
                <p>
                  Smarter’s keys are django-rest-knox tokens: 32 random bytes, written as
                  64 hexadecimal characters. The database keeps a SHA-512 digest and the
                  first 15 characters, to find candidate rows quickly. The other 49
                  characters, 196 bits, exist only in the caller’s configuration (
                  <TextLink href={posts.keys}>more on the blog</TextLink>):
                </p>
                <Table
                  mono={false}
                  head={['Property', 'Protects against']}
                  rows={keyProperties}
                />
                <CodeBlock
                  code={KEY_CODE}
                  caption="Checking a key, from lib/drf/models.py. hmac.compare_digest() takes the same time whether the first character differs or the last, so timing reveals nothing."
                />
                <Callout type="idea" title="Why SHA-512, and not bcrypt?">
                  <p>
                    A password is short and chosen by a person, so it’s hashed with a slow
                    function to make guessing expensive. A key is 256 random bits: there’s
                    nothing to guess. A slow hash would add latency to every API request
                    and no security.
                  </p>
                </Callout>
                <p>
                  A key is shown once, when it’s made, and a lost key is replaced, not
                  recovered. Its public name is a random UUID, unrelated to the key, so it
                  can appear in urls and logs. And the model’s <Code>save()</Code> refuses
                  a key for anyone who isn’t staff, so no view can forget the rule.
                </p>
                <Callout type="caution" title="A digest protects one table">
                  <p>
                    Anything else that records request headers, an access log, a proxy’s
                    debug log, an APM agent, sees the key in full in{' '}
                    <Code>Authorization</Code>, and must drop or mask it.
                  </p>
                </Callout>
              </Part>

              <Part id="lab" number={13} title="Lab 3: allowedOrigins">
                <p>
                  Here are the two chatbots of Lab 2, read live from GitHub. As you type,
                  the editor validates each against the LLMClient JSON Schema that the
                  platform publishes. Hover over any key for an explanation.
                </p>
                <div className="my-8">
                  <ManifestLab initialPath="llm-clients/llmclient-weather.yaml" />
                </div>
                <h3>Exercises</h3>
                <Exercises exercises={labExercises} />
                <Callout type="idea" title="Owners maintain their own boundary">
                  <p>
                    Adding a site is a change to the chatbot’s manifest, applied by its
                    owner, reviewed like any other change. The platform’s operator doesn’t
                    edit a settings file or restart anything, and one owner’s list can’t
                    widen anyone else’s.
                  </p>
                </Callout>
              </Part>

              <Part id="costs" number={14} title="Costs, and limits">
                <p>
                  <strong>Operations:</strong> nothing to provision per tenant, no
                  per-tenant migrations, no grant table to keep in sync. The burden moves
                  to code review: every new endpoint that loads a resource by id must
                  start from a rule, and its tests should show that a second account gets
                  a 404.
                </p>
                <p>
                  <strong>Performance:</strong> one join to the owner’s profile per query,
                  and an OR per profile for people in several accounts. Host and origin
                  lookups are cached. A key check is one SHA-512 hash, in microseconds.
                </p>
                <p>
                  <strong>Stability:</strong> isolation failures are code bugs, not
                  infrastructure incidents, so tests catch them and a deploy fixes them.
                  Lookups fail closed: a bug breaks a widget or answers 404, rather than
                  letting something through.
                </p>
                <p>
                  <strong>The limit:</strong> nothing below the application backs the
                  rules up. If your tenants must never share anything, or a regulator
                  wants isolation that doesn’t depend on application code, use a schema or
                  a database per tenant.
                </p>
                <Callout type="exercise" title="Takeaways, to keep">
                  <ol className="list-decimal space-y-1 ps-5">
                    <li>
                      Start every lookup of a tenant’s resource from a permission-aware
                      queryset.
                    </li>
                    <li>
                      Make “nothing” the default, and keep reading and changing separate.
                    </li>
                    <li>Answer 404 for a resource that exists but isn’t the caller’s.</li>
                    <li>
                      Treat every value the client chooses as a claim, and check it on the
                      server, every time.
                    </li>
                    <li>
                      Put each tenant’s boundary (its origins, its keys) on the tenant’s
                      own resource.
                    </li>
                    <li>Make lookups fail closed, and never cache a miss.</li>
                    <li>Store keys as digests, and name them by something unrelated.</li>
                  </ol>
                </Callout>
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
          title="Try to break it"
          text="Install Smarter, create two accounts, and look for a request that lets one see the other’s resources. If you find one, report it: that’s how open source gets safer."
        >
          <Button href={QUICK_START} icon="lucide:rocket">
            Install Smarter
          </Button>
          <Button
            href="https://github.com/smarter-sh/smarter/security"
            variant="secondary"
            icon="lucide:shield"
          >
            Security policy
          </Button>
        </CtaBand>
      </ManifestProvider>
    </PageShell>
  )
}
export default MultiTenancy
