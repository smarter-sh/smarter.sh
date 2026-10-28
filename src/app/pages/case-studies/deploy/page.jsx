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
import HostnameDiagram from './components/HostnameDiagram'
import {
  API_DOMAIN,
  A_RECORD_CODE,
  CUSTOM_HOST_CODE,
  DEFAULT_HOST_CODE,
  DEPLOY_DOCS,
  FACADE_CODE,
  GUARD_CODE,
  HOST,
  INGRESS_CODE,
  ISSUER_CODE,
  ISSUER_TEMPLATE,
  LOCK_CODE,
  SAMPLE_CERT,
  TIMING_CODE,
  actors,
  challenges,
  discussion,
  experiments,
  facts,
  files,
  hostLayers,
  inspectCommands,
  labExercises,
  objectives,
  owned,
  posts,
  readingList,
  repo,
  sections,
  sequence,
  sourceFile,
  sweepGuards,
  takeaways,
  waitSteps,
} from './data'

/*
 * Case Study: What Happens When You Click Deploy.
 *
 * A lesson, in the form of a business-school case, that follows one LLMClient, the weather chatbot, from
 * a manifest to its own live https URL: a DNS record, a Kubernetes Ingress and a certificate from Let's
 * Encrypt per chatbot, with no wildcards; a task queue that waits for the outside world without blocking;
 * custom domains that must be proven; the checks of the Host header; the daily sweep for orphaned records;
 * and the facade that keeps the cloud out of the tests. Built from eight posts on blog.smarter.sh. The
 * deployed chatbot is live (src/common/chatbots.js), and Lab 2 inspects it with dig, openssl and curl.
 */

const Deploy = () => {
  return (
    <PageShell
      title="Case Study: What Happens When You Click Deploy"
      description="A teaching case: how Smarter gives each AI chatbot its own live https URL, with one DNS record, one Kubernetes Ingress and one Let's Encrypt certificate per host, a task queue that never blocks, custom domains that must be proven, and a daily sweep for leftovers. With a live chatbot, dig, openssl and curl labs, and an editor for its manifests."
    >
      <ManifestProvider repo={repo} files={files}>
        <PageHero
          eyebrow="Case study"
          title="What happens when you"
          highlight="click Deploy"
          accent="emerald"
          lead="How one command gives an AI chatbot its own address on the internet, with its own DNS record, its own route into a Kubernetes cluster and its own certificate, and takes all of it away again when the chatbot goes."
        >
          <Button href="#deploy" icon="lucide:workflow">
            Follow the deploy
          </Button>
          <Button href="#inspect" variant="secondary" icon="lucide:terminal">
            Inspect it yourself
          </Button>
          <Button href={DEPLOY_DOCS} variant="secondary" icon="lucide:book-open">
            The documentation
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
            Everything in this case is real and running: the platform at ubc.smarter.sh,
            the weather chatbot, its DNS record and its certificate. The case is adapted
            from eight posts on the Smarter blog, starting with{' '}
            <TextLink href={posts.perHost}>
              One DNS Record and One TLS Certificate per Deployed LLM
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
                  A prompt engineer has built a chatbot on Smarter. It forecasts the
                  weather, it works in the web console’s workbench, and now it should go
                  on a web site, where anyone can use it. They type one command:
                </p>
                <CodeBlock code="smarter deploy llmclient weather" copy />
                <p>
                  About ten minutes later, an email says that the chatbot has been
                  deployed, and this address works, from any browser in the world, with a
                  padlock:
                </p>
                <CodeBlock code={`https://${HOST}/`} />
                <p>
                  Nobody edited a DNS zone, wrote an Ingress or requested a certificate.
                  This case is about everything that happened in those ten minutes, and
                  everything that happens when the chatbot goes away.
                </p>
              </Part>

              <Part
                id="problem"
                number={2}
                title="The problem: a URL is a promise that several systems keep"
              >
                <p>
                  For that address to work, four separate systems, run by different
                  people, all have to agree. The name has to resolve to an address.
                  Something has to prove to the browser that the server really is that
                  name. The cluster has to route the request to the right program. And the
                  program has to know which chatbot it’s talking to.
                </p>
                <Callout type="term" title="DNS and an A record">
                  <p>
                    The Domain Name System is the internet’s directory. An{' '}
                    <strong>A record</strong> maps a name to an IPv4 address. A{' '}
                    <strong>hosted zone</strong> holds the records of one domain and its
                    subdomains; Amazon Route 53 is the DNS service that Smarter uses. A
                    name that has no record gets the answer <strong>NXDOMAIN</strong>, “no
                    such domain”, and the browser never connects at all.
                  </p>
                </Callout>
                <Callout type="term" title="TLS and a certificate">
                  <p>
                    TLS is what puts the s in https: it encrypts the connection, and
                    proves the server’s identity with a <strong>certificate</strong>, a
                    public key and the names it may speak for, signed by a certificate
                    authority that browsers trust. The server keeps the matching private
                    key secret. Whoever holds the key can impersonate every name on the
                    certificate.
                  </p>
                </Callout>
                <p>
                  A web site with three hostnames does all of this by hand, once. Smarter
                  creates a hostname for every chatbot that every account deploys, and a
                  platform with many tenants has thousands of them, created and deleted
                  all day. Doing it by hand is impossible. Doing it carelessly gives
                  tenants each other’s names, or keys.
                </p>
                <Callout type="exercise" title="Before you read on">
                  <p>
                    Think of a web site you use that gives each customer an address of its
                    own, a shop, a blog, a form. Guess: does it have one DNS record per
                    customer, or one record for all of them? One certificate, or many?
                    Keep your guess; Lab 2 shows you how to check.
                  </p>
                </Callout>
              </Part>

              <Part id="deploy" number={3} title="One deploy, end to end">
                <p>
                  When an LLMClient’s <Code>deployed</Code> field changes from false to
                  true, its <Code>save()</Code> sends a signal, and the signal’s receiver
                  queues a task, <Code>deploy_default_api</Code>, for a Celery worker. The
                  command returns at once. Everything else happens in the background.
                </p>
                <Callout type="term" title="Celery and a task queue">
                  <p>
                    Celery runs Python functions, called tasks, in separate worker
                    processes, from a queue. A web request puts a task on the queue and
                    returns; a worker picks it up whenever it’s free. Smarter has two
                    queues on purpose: an infrastructure queue for slow work like this,
                    and another for the bookkeeping of prompts, so a backlog of
                    certificates never delays a chat.
                  </p>
                </Callout>
                <SequenceDiagram
                  actors={actors}
                  steps={sequence}
                  caption={
                    <>
                      <strong className="text-keen-800">Figure 1.</strong> One deploy. The
                      platform creates a record and an Ingress (steps 3 and 4), and
                      cert-manager and Let’s Encrypt do the rest (5 to 8) while no worker
                      waits. The platform checks back later (step 9).
                    </>
                  }
                />
                <p>
                  The deploy creates four objects, each named after exactly one host, and
                  each removed with the chatbot:
                </p>
                <Table head={['Object', 'Named', 'Removed when']} rows={owned} />
                <Callout type="idea">
                  <p>
                    Steps 5 to 8 involve no Smarter code at all. Smarter states what it
                    wants, an Ingress for one host that asks for a certificate, and
                    standard Kubernetes software makes it true. That is what “declarative”
                    means, at the scale of a cluster.
                  </p>
                </Callout>
              </Part>

              <Part id="hard" number={4} title="Why giving each chatbot a URL is hard">
                <p>Figure 1 looks orderly. Each arrow hides a problem:</p>
                <CardGrid cards={challenges} numbered />
                <p>Each of the next six parts answers one of these.</p>
              </Part>

              <Part id="hostname" number={5} title="The hostname is the tenant boundary">
                <p>
                  A chatbot’s default host is built from its name, its account number and
                  the environment’s API domain, in a property of the LLMClient model:
                </p>
                <CodeBlock
                  code={DEFAULT_HOST_CODE}
                  number={3}
                  caption="default_host, in models/llmclient.py. base_default_host is <account-number>.<environment API domain>."
                />
                <HostnameDiagram />
                <p>
                  Because the account number is part of the name, two accounts that both
                  create a chatbot called <Code>hr</Code> get different hostnames,
                  different records and different certificates. No tenant can claim
                  another’s name. A name must also be a valid DNS label, letters, digits
                  and hyphens, so <Code>stackademy_sql</Code> is served at{' '}
                  <Code>stackademy-sql</Code>.
                </p>
              </Part>

              <Part id="dns" number={6} title="One record, and no wildcard">
                <p>
                  The usual shortcut for thousands of hosts is a <strong>wildcard</strong>
                  : one <Code>*.api.example.com</Code> record that answers for every name
                  under the domain, and one wildcard certificate in front of them. It’s
                  quick to set up, and it works. It also means that every name anyone can
                  think of resolves, connects and handshakes as if it were real.
                </p>
                <p>
                  Smarter has no wildcard. Each deploy creates one A record, and the
                  record is a copy of the API domain’s own, which Terraform manages as an
                  alias of the Traefik load balancer:
                </p>
                <CodeBlock
                  code={A_RECORD_CODE}
                  number={4}
                  caption="Creating a chatbot’s record, from infrastructure/services/dns.py. It says nothing that the API domain’s record doesn’t already say. It adds exactly one name."
                />
                <p>
                  A name that Smarter didn’t create returns NXDOMAIN. Scanners,
                  typo-squatters and anyone probing for a deleted tenant’s chatbot never
                  reach the cluster.
                </p>
                <Callout type="idea" title="The cheapest rejection there is">
                  <p>
                    A request that never resolves costs nothing: no connection, no
                    handshake, no log line, no database query. Every later check in this
                    case is cheaper because this one runs first.
                  </p>
                </Callout>
              </Part>

              <Part id="tls" number={7} title="One certificate per host">
                <p>
                  A wildcard certificate’s private key authenticates every host under it.
                  If it leaks, from a misconfigured backup, a debug dump or a compromised
                  node, the holder can impersonate every chatbot on the platform, and
                  revoking it takes every chatbot down at once. A per-host certificate
                  limits each of those to one host. Its key lives in one Kubernetes Secret
                  named after that host, and is deleted with the chatbot.
                </p>
                <Callout type="term" title="Ingress, and an ingress controller">
                  <p>
                    A Kubernetes <strong>Ingress</strong> is a rule that says “requests
                    for this host go to this service”. An{' '}
                    <strong>ingress controller</strong>, Traefik in Smarter’s case, reads
                    every Ingress and routes traffic accordingly.{' '}
                    <strong>cert-manager</strong> watches Ingresses too, and gets a
                    certificate for each host that asks for one.
                  </p>
                </Callout>
                <CodeBlock
                  code={INGRESS_CODE}
                  number={5}
                  caption="A chatbot’s Ingress, trimmed from llmclient/k8s/ingress.yaml.tpl. The rule’s host and the TLS block’s host are the same single name, and the Secret is named after it."
                />
                <h3>How the certificate is issued</h3>
                <p>
                  Let’s Encrypt is a free certificate authority. It speaks{' '}
                  <strong>ACME</strong>, a protocol in which the requester proves control
                  of a name by passing a challenge. There are two common ones.{' '}
                  <strong>HTTP-01</strong> asks you to serve a token at a well-known path
                  on port 80. <strong>DNS-01</strong> asks you to publish a TXT record at{' '}
                  <Code>_acme-challenge.&lt;host&gt;</Code>. Smarter uses DNS-01
                  everywhere.
                </p>
                <ul className="mb-6 max-w-3xl list-disc space-y-2 ps-6 text-[15px] leading-relaxed text-keen-700">
                  <li>
                    <strong>Nothing has to be reachable.</strong> HTTP-01 would need the
                    load balancer, Traefik’s routing and the https redirect all to be
                    right before the very first certificate. DNS-01 needs only the zone.
                  </li>
                  <li>
                    <strong>Port 80 doesn’t have to serve anything</strong> for
                    certificates to keep working.
                  </li>
                  <li>
                    <strong>The proof lives where the name lives</strong>, in a zone that
                    Terraform created. Whoever can’t write to that zone can’t get a
                    certificate for its names.
                  </li>
                </ul>
                <p>
                  Each environment’s API domain has its own Route 53 zone and its own
                  cert-manager <strong>ClusterIssuer</strong>, named after the zone and
                  pinned to it:
                </p>
                <CodeBlock
                  code={ISSUER_CODE}
                  number={6}
                  caption="The ClusterIssuer template, trimmed from smarter-infrastructure. hostedZoneID makes the issuer write challenge records into exactly one zone."
                />
                <p>
                  Two more details, from{' '}
                  <TextLink href={posts.dns01}>the post on DNS-01</TextLink>. cert-manager
                  gets its AWS permissions through IAM Roles for Service Accounts,
                  short-lived credentials that only its own service account can assume, so
                  there is no key to leak. And it checks that the TXT record is visible
                  from public resolvers, 8.8.8.8 and 1.1.1.1, which see what Let’s Encrypt
                  will see, rather than from inside the cluster’s network, which may see
                  something else.
                </p>
                <Callout type="caution" title="Certificate Transparency">
                  <p>
                    Every publicly trusted certificate is written to public Certificate
                    Transparency logs. So every deployed chatbot’s hostname, with its
                    account number, becomes public the moment its certificate is issued.
                    Smarter’s account numbers are identifiers, not secrets. If yours are
                    sensitive, don’t put them in hostnames that you certify one at a time.
                  </p>
                </Callout>
              </Part>

              <Part
                id="waiting"
                number={8}
                title="Waiting without blocking, and without racing"
              >
                <p>
                  A certificate takes minutes. A Celery worker that sleeps through those
                  minutes is a worker that can’t deploy anything else. So the deploy task
                  applies the Ingress and hands off to a continuation task that checks
                  once, and reschedules itself:
                </p>
                <CodeBlock
                  code={TIMING_CODE}
                  number={7}
                  caption={
                    <>
                      The timing, from{' '}
                      <TextLink
                        href={sourceFile('llmclient/tasks/deploy_default_api.py')}
                      >
                        deploy_default_api.py
                      </TextLink>
                      .
                    </>
                  }
                />
                <Steps steps={waitSteps} />
                <h3>Two tasks, one chatbot</h3>
                <p>
                  A deploy and an undeploy of the same chatbot can run at the same moment
                  on different workers, for example when a manifest is applied twice. Each
                  task locks the LLMClient’s database row while it reads its state and
                  creates or destroys the record:
                </p>
                <CodeBlock
                  code={LOCK_CODE}
                  number={8}
                  caption="select_for_update() locks the row until the transaction ends. Whichever task runs second waits, then reads what the first one saved."
                />
                <p>
                  Only that short section holds the lock; the slow Ingress and certificate
                  work happens outside it. The undeploy task also does nothing if the
                  chatbot was marked deployed again after it was queued, and deleting an
                  LLMClient queues its clean-up with <Code>transaction.on_commit()</Code>,
                  so a deletion that is rolled back removes nothing.
                </p>
                <Callout type="idea" title="Check later, and reschedule">
                  <p>
                    When a step depends on the outside world, don’t wait for it. Check
                    once, record what you found, and schedule the next check. The worker
                    is free, the state is visible to anyone who asks, and a restart loses
                    nothing.
                  </p>
                </Callout>
              </Part>

              <Part
                id="custom-domains"
                number={9}
                title="Custom domains: a claim, until it’s proven"
              >
                <p>
                  An account can serve its chatbots from a domain of its own, with a{' '}
                  <ManifestLink path="custom-domains/example-com.yaml" /> manifest. But
                  anyone can type a domain into a manifest. A platform that took it at
                  face value would create records, request certificates and route traffic
                  for names its tenants don’t own.
                </p>
                <p>
                  So deploying a CustomDomain creates a Route 53 zone for it, and tells
                  the owner the zone’s name servers. The owner adds those{' '}
                  <strong>NS records</strong> at their own DNS provider: that is{' '}
                  <strong>delegation</strong>, and only the domain’s owner can do it. Then
                  two checks, in order:
                </p>
                <ol className="mb-6 max-w-3xl list-decimal space-y-2 ps-6 text-[15px] leading-relaxed text-keen-700">
                  <li>
                    The domain’s <em>public</em> NS records include one of the zone’s name
                    servers. The question is what the world sees, not what Route 53 says.
                  </li>
                  <li>
                    Its certificate from AWS Certificate Manager, requested with DNS
                    validation, is ISSUED. ACM can only find its validation record through
                    public DNS, so an issued certificate is a second, independent witness
                    that the delegation is real.
                  </li>
                </ol>
                <p>
                  Nothing public exists for a custom host until both pass. The rule lives
                  in one property, so no code path can forget it:
                </p>
                <CodeBlock
                  code={CUSTOM_HOST_CODE}
                  number={9}
                  caption="custom_host, in models/llmclient.py. Every task and URL that would use the custom domain reads this, and gets None until the domain is verified."
                />
                <p>
                  Delegation is a human step at someone else’s DNS provider, and can take
                  a day. So verification checks every 30 minutes for up to 24 hours,
                  telling the owner which step is blocking, “add these NS records” before
                  “certificate pending”, and emails them the result either way.
                </p>
              </Part>

              <Part id="host-checks" number={10} title="Four checks of the Host header">
                <p>
                  Every HTTP request names the host it’s for, in its Host header, and the
                  client chooses it. Django uses it to build absolute URLs, in redirects
                  and in password-reset emails, so a server that accepts any Host can be
                  tricked into sending users to an attacker’s address. Django’s defense,{' '}
                  <Code>ALLOWED_HOSTS</Code>, is a fixed list, and Smarter’s hosts aren’t
                  fixed. Many projects give up and set it to <Code>[&quot;*&quot;]</Code>.
                  Smarter checks the host four times instead, each layer cheaper because
                  of the one before:
                </p>
                <Table head={['Layer', 'Where', 'Turns away']} rows={hostLayers} />
                <p>
                  Layer 2 admits <Code>.api.example.com</Code>, Django’s notation for
                  “this domain and every subdomain”. Layer 3, Smarter’s replacement for
                  Django’s SecurityMiddleware, compares hosts with <Code>fnmatch</Code>,
                  which reads that leading dot as a literal character that no real host
                  matches. So every subdomain falls through to a lookup of the LLMClient
                  that uses it, and a subdomain that no LLMClient uses gets a 400 (
                  <TextLink href={posts.allowedHosts}>the post on ALLOWED_HOSTS</TextLink>
                  ).
                </p>
                <Callout type="idea" title="Two questions, two owners">
                  <p>
                    “Is this one of our hosts?” and “is this chatbot live?” are different
                    questions. The middleware answers the first; the chat views answer the
                    second, so an owner can still test an undeployed chatbot with their
                    own credentials, while an anonymous visitor gets a 404.
                  </p>
                </Callout>
              </Part>

              <Part id="try" number={11} title="Lab 1: Talk to the deployed chatbot">
                <p>
                  Here is the weather chatbot, from its manifest{' '}
                  <ManifestLink path="llm-clients/llmclient-weather.yaml" />, deployed on
                  the platform at ubc.smarter.sh. This page is on smarter.sh; the chat
                  talks to its own host.
                </p>
                <div className="my-8 max-w-3xl">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-keen-900">
                      The weather chatbot, at its own URL
                    </h3>
                    <p className="break-all text-sm text-keen-600">
                      LLMClient · <span className="font-mono">{HOST}</span>
                    </p>
                  </div>
                  <SmarterChatEmbed bot={chatbots.weather} height="600px" />
                </div>
                <h3>Experiments</h3>
                <Experiments experiments={experiments} />
              </Part>

              <Part
                id="inspect"
                number={12}
                title="Lab 2: Inspect the deploy from the outside"
              >
                <p>
                  Everything in Parts 5 to 10 can be checked from your own terminal, with
                  tools that only read. On macOS and Linux, <Code>dig</Code>,{' '}
                  <Code>openssl</Code> and <Code>curl</Code> are usually installed
                  already.
                </p>
                <Commands commands={inspectCommands} />
                <p>The third command’s answer, when this case was written:</p>
                <CodeBlock
                  code={SAMPLE_CERT}
                  number={10}
                  caption="The weather chatbot’s certificate: one name, from Let’s Encrypt, for 90 days. cert-manager renews it on its own, well before it expires."
                />
                <Callout type="exercise" title="Compare, and look it up">
                  <p>
                    Go back to your guess in Part 2, and run commands a and c against the
                    site you chose. Then search for {API_DOMAIN} at crt.sh, a public
                    search engine of Certificate Transparency logs (it can be slow). How
                    many chatbot hostnames can you find?
                  </p>
                </Callout>
              </Part>

              <Part id="lab" number={13} title="Lab 3: The manifests">
                <p>
                  Here are the chatbot’s manifest and the example CustomDomain, read live
                  from GitHub. As you type, the editor validates each against the JSON
                  Schema that the platform publishes for its kind. Hover over any key for
                  an explanation.
                </p>
                <div className="my-8">
                  <ManifestLab initialPath="llm-clients/llmclient-weather.yaml" />
                </div>
                <h3>Exercises</h3>
                <Exercises exercises={labExercises} />
              </Part>

              <Part
                id="cleanup"
                number={14}
                title="Cleaning up: a daily sweep for orphans"
              >
                <p>
                  Deleting a chatbot deletes its record, Ingress, Certificate and Secret.
                  Most of the time, that’s the end of it. But a task can fail after all
                  its retries, or a worker can be replaced while a task waits in the
                  queue, and then a record is left in the zone that nothing in the
                  database owns.
                </p>
                <Callout type="term" title="Dangling record and subdomain takeover">
                  <p>
                    A record that points at something that no longer exists is{' '}
                    <em>dangling</em>. When it points at a third-party resource, a storage
                    bucket or a released cloud address, anyone who claims that resource
                    inherits the subdomain: a <em>subdomain takeover</em>. Smarter’s
                    records point at its own load balancer, which closes the classic
                    takeover, but an orphan still answers, still names a former tenant,
                    and still counts against the zone’s quota.
                  </p>
                </Callout>
                <p>
                  So once a day, Celery Beat runs{' '}
                  <TextLink
                    href={sourceFile('llmclient/tasks/delete_orphan_dns_records.py')}
                  >
                    delete_orphan_dns_records
                  </TextLink>
                  . It lists the A records in the API zone, computes the hosts that the
                  database says are live, and deletes the difference. Most of its code is
                  about when <em>not</em> to delete:
                </p>
                <CardGrid cards={sweepGuards} />
                <Callout type="idea" title="The zone is a function of the database">
                  <p>
                    Every chatbot host in one should exist in the other. The deletion task
                    keeps them in step in the common case; the sweep does in every other.
                    Write the guards first.
                  </p>
                </Callout>
              </Part>

              <Part id="tests" number={15} title="Keeping the cloud out of the tests">
                <p>
                  Smarter’s development containers are not sandboxes. They hold a
                  kubeconfig for a real cluster and AWS credentials that can create zones,
                  certificates and machines, because that is what the platform does for a
                  living. An unguarded test once created two real EKS node groups, one of
                  them a GPU instance.
                </p>
                <p>
                  So no app calls the AWS SDK or kubectl itself. Every DNS record,
                  certificate and Kubernetes manifest goes through one facade:
                </p>
                <CodeBlock
                  code={FACADE_CODE}
                  number={11}
                  caption="The infrastructure facade, from the docstring of infrastructure/services/__init__.py."
                />
                <p>
                  Every real backend behind it calls one guard at its last step, before
                  the boto3 session is created or the kubectl process is spawned:
                </p>
                <CodeBlock
                  code={GUARD_CODE}
                  number={12}
                  caption={
                    <>
                      From{' '}
                      <TextLink href={sourceFile('infrastructure/services/base.py')}>
                        services/base.py
                      </TextLink>
                      . running_unit_tests() is true exactly when the process is manage.py
                      test: no setting to forget.
                    </>
                  }
                />
                <p>
                  The tests run against an <Code>InMemoryProvider</Code>, whose zones,
                  records and certificates live in dictionaries and behave like the
                  cloud’s: a certificate is issued only once its validation record exists
                  in the zone, as in ACM. The few tests that must touch real
                  infrastructure are tagged <Code>infrastructure</Code>, and skipped
                  unless asked for (
                  <TextLink href={posts.facade}>the post on the facade</TextLink>).
                </p>
                <Callout type="caution" title="What the guard can’t see">
                  <p>
                    It checks the process it runs in. A test that calls a task’s{' '}
                    <Code>.delay()</Code> sends it to a worker container, which isn’t
                    running tests and holds the same credentials. There, the rule is a
                    convention: tests call task functions directly, and patch{' '}
                    <Code>.delay()</Code>.
                  </p>
                </Callout>
              </Part>

              <Part id="tradeoffs" number={16} title="Costs and trade-offs">
                <p>
                  <strong>Time.</strong> A first deploy takes ten minutes or more, where a
                  wildcard would answer in seconds. A redeploy is fast: the certificate is
                  already issued.
                </p>
                <p>
                  <strong>Quotas, not money.</strong> Let’s Encrypt certificates are free
                  and Route 53 bills per zone, not per record. The limits that matter are
                  Let’s Encrypt’s weekly cap on new certificates per domain, and Route
                  53’s records per zone. A test suite that deploys for real in a loop
                  would hit the first, which is one more reason the tests fake every call.
                </p>
                <p>
                  <strong>Moving parts.</strong> Four Kubernetes objects and a record per
                  chatbot, and a router table that grows with every deploy.
                </p>
                <p>
                  <strong>Failures stay local.</strong> A certificate that fails blocks
                  one deploy. A Let’s Encrypt outage stops new deploys, but existing
                  chatbots’ certificates are valid for months. A wildcard’s failures are
                  the opposite: one thing to break, and every tenant down together.
                </p>
                <Callout type="exercise" title="Takeaways, to keep">
                  <ol className="list-decimal space-y-1 ps-5">
                    {takeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ol>
                </Callout>
                <p>
                  A wildcard is a promise that every name under a domain is real. Smarter
                  makes the opposite promise: a name resolves, presents a certificate and
                  reaches a pod only while a chatbot owns it.
                </p>
              </Part>

              <Part id="discussion" number={17} title="Discussion questions">
                <p>For a classroom, a study group, or your own notes.</p>
                <Questions questions={discussion} />
              </Part>

              <Part id="reading-list" number={18} title="Further reading">
                <ReadingList items={readingList} />
                <p className="mt-6 text-sm">
                  The infrastructure itself, Terraform for the zones, issuers and cluster,
                  is in <TextLink href={ISSUER_TEMPLATE}>smarter-infrastructure</TextLink>
                  .
                </p>
              </Part>
            </article>
          </div>
        </div>

        <CtaBand
          title="Deploy one yourself"
          text="Install Smarter, apply a manifest, run smarter deploy, and watch the record, the Ingress and the certificate appear."
        >
          <Button href={QUICK_START} icon="lucide:rocket">
            Install Smarter
          </Button>
          <Button href={DEPLOY_DOCS} variant="secondary" icon="lucide:book-open">
            Deploying an LLMClient
          </Button>
        </CtaBand>
      </ManifestProvider>
    </PageShell>
  )
}
export default Deploy
