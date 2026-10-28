import { BLOG, DOCS } from '@/common/constants'
import { githubRepository } from '@/components/manifest/manifests'

// The deployed chatbot that the case follows, on the platform at ubc.smarter.sh (see src/common/chatbots.js).
export const HOST = 'weather.3141-5926-5359.api.ubc.smarter.sh'
export const API_DOMAIN = 'api.ubc.smarter.sh'

// The source code of the case.
const SMARTER = 'https://github.com/smarter-sh/smarter/blob/main/smarter/smarter/apps'
export const sourceFile = (path) => `${SMARTER}/${path}`
export const ISSUER_TEMPLATE =
  'https://github.com/smarter-sh/smarter-infrastructure/blob/main/aws/terraform/smarter/templates/issuer.yml.tpl'

// The blog posts that this case is built from.
export const posts = {
  perHost: `${BLOG}2026/03/12/smarter-per-host-dns-tls/`,
  dns01: `${BLOG}2026/03/05/cert-manager-dns01-route53/`,
  customDomains: `${BLOG}2026/02/23/route53-custom-domain-delegation/`,
  orphans: `${BLOG}2026/03/19/smarter-orphan-dns-sweep/`,
  facade: `${BLOG}2026/01/06/cloud-out-of-reach-of-tests/`,
  allowedHosts: `${BLOG}2026/01/20/smarter-django-allowed-hosts/`,
  release: `${BLOG}2026/10/19/release-v0-33-v0-34/`,
  docker: `${BLOG}2026/04/11/smarter-docker-kubernetes/`,
}

export const DEPLOY_DOCS = `${DOCS}/en/latest/smarter-framework/smarter-on-kubernetes/llmclient-deploy.html`

// The case's manifests, in the example manifests that every Smarter platform loads.
export const repo = githubRepository('smarter-sh/example-manifests')

export const files = [
  {
    path: 'llm-clients/llmclient-weather.yaml',
    kind: 'LLMClient',
    name: 'weather',
    role: 'The chatbot that this case deploys: its model, instructions, tools and the look of its chat. Its name becomes the first label of its hostname. customDomain, deployed and subdomain are the fields that the deploy is about.',
  },
  {
    path: 'custom-domains/example-com.yaml',
    kind: 'CustomDomain',
    name: 'example_com',
    role: 'A claim that a domain belongs to an account. Applying it proves nothing. This one is expected to fail verification: nobody can delegate example.com to Smarter.',
  },
]

export const objectives = [
  'Explain what has to be true, in DNS, TLS, routing and the application, before a URL works.',
  'Trace one deploy from a command, through a task queue, DNS, Kubernetes and a certificate authority, to an email that says it’s live.',
  'Compare a wildcard DNS record and certificate with one record and one certificate per host, and say what each costs and protects.',
  'Explain how ACME’s DNS-01 challenge proves control of a name, and why it suits hosts created at run time.',
  'Describe how a platform waits minutes, or a day, for the outside world without blocking a worker, and without racing itself.',
  'Explain why a custom domain is a claim until it is proven, and how delegation plus a DNS-validated certificate prove it.',
  'Inspect a live deployment from the outside with dig, openssl and curl.',
]

export const facts = [
  ['The platform', 'Smarter, on Kubernetes (Amazon EKS), behind Traefik'],
  ['The command', 'smarter deploy llmclient weather'],
  ['The result', `https://${HOST}/`],
  ['What it creates', '1 DNS record, 1 Ingress, 1 Certificate, 1 TLS Secret'],
  ['Time to live', 'About ten minutes, for a first deploy'],
  ['Services', 'Route 53, cert-manager, Let’s Encrypt, Celery'],
  ['Wildcards', 'None: no wildcard record, no wildcard certificate'],
  ['Clean-up', 'A daily sweep for records that nothing owns'],
]

// One deploy, end to end, between the five participants of the sequence diagram.
export const actors = [
  {
    id: 'engineer',
    label: 'Prompt engineer',
    sub: 'smarter CLI',
    icon: 'lucide:user-round',
    color: 'bg-keen-200 text-keen-800',
  },
  {
    id: 'platform',
    label: 'Smarter',
    sub: 'Django + Celery',
    icon: 'lucide:server',
    color: 'bg-orange-100 text-primary',
  },
  {
    id: 'dns',
    label: 'Route 53',
    sub: 'DNS',
    icon: 'lucide:globe',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'k8s',
    label: 'Kubernetes',
    sub: 'Traefik, cert-manager',
    icon: 'lucide:container',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'ca',
    label: 'Let’s Encrypt',
    sub: 'certificate authority',
    icon: 'lucide:badge-check',
    color: 'bg-teal-100 text-teal-700',
  },
]

export const sequence = [
  {
    from: 'engineer',
    to: 'platform',
    text: 'smarter deploy llmclient weather',
    code: true,
  },
  {
    from: 'platform',
    to: 'engineer',
    text: 'deployed: true. A task is queued on the infrastructure queue.',
  },
  {
    from: 'platform',
    to: 'dns',
    text: `A record ${HOST}, a copy of ${API_DOMAIN}’s`,
    code: true,
  },
  {
    from: 'platform',
    to: 'k8s',
    text: 'kubectl apply: an Ingress for exactly that host',
    code: true,
  },
  {
    from: 'k8s',
    to: 'dns',
    text: 'cert-manager writes a TXT record, _acme-challenge.<host>',
  },
  { from: 'k8s', to: 'ca', text: 'the challenge is ready' },
  { from: 'ca', to: 'dns', text: 'reads the TXT record, through public DNS' },
  { from: 'ca', to: 'k8s', text: 'a signed certificate, kept in the host’s TLS Secret' },
  {
    from: 'platform',
    to: 'k8s',
    text: '10 minutes later, then every minute: Ingress, Certificate, Secret ready?',
  },
  {
    from: 'platform',
    to: 'engineer',
    text: 'the hostname resolves: “your chatbot has been deployed”',
  },
]

export const challenges = [
  {
    icon: 'lucide:list-plus',
    title: 'Hosts made at run time',
    text: 'Every deployed chatbot gets its own hostname, and a platform with many tenants has thousands, created and deleted all day. No settings file can list them.',
  },
  {
    icon: 'lucide:badge-check',
    title: 'Proving control of a name',
    text: 'A browser trusts a certificate only if a certificate authority checked that the requester controls the name. For a host that existed a minute ago.',
  },
  {
    icon: 'lucide:users',
    title: 'Tenants must not collide',
    text: 'Two accounts can both call a chatbot “hr”. Neither may ever answer for the other’s, or be impersonated with the other’s key.',
  },
  {
    icon: 'lucide:hourglass',
    title: 'The outside world is slow',
    text: 'A certificate takes minutes. A customer’s DNS change can take a day. A web request can’t wait that long, and neither should a worker.',
  },
  {
    icon: 'lucide:shuffle',
    title: 'Deploy and undeploy race',
    text: 'Two tasks for the same chatbot can run at once on different workers. The second must not undo the first.',
  },
  {
    icon: 'lucide:trash-2',
    title: 'Leftovers, and real credentials',
    text: 'A failed deletion leaves a DNS record that nothing owns. And the development containers hold credentials that create real, billable resources.',
  },
]

// What a deployed chatbot owns, from the per-host DNS and TLS post.
export const owned = [
  [
    'Route 53 A record',
    '<name>.<account-number>.<env>.api.<root>',
    'it is undeployed, or deleted',
  ],
  ['Kubernetes Ingress', 'the same hostname', 'it is deleted'],
  ['cert-manager Certificate', '<hostname>-tls', 'it is deleted'],
  ['TLS Secret (key and certificate)', '<hostname>-tls', 'it is deleted'],
]

export const DEFAULT_HOST_CODE = `@property
def default_host(self) -> str:
    domain = f"{self.rfc1034_compliant_name}.{self.base_default_host}"
    SmarterValidator.validate_domain(domain)
    return domain`

export const A_RECORD_CODE = `a_record = self.get_environment_a_record(api_host_domain)
if a_record is None:
    raise DNSZoneNotFound(f"{api_host_domain} has no A record to copy to {hostname}.")
return self.get_or_create_record(
    zone_id=zone_id,
    name=hostname,
    record_type="A",
    ttl=smarter_settings.llmclient_tasks_default_ttl,
    values=a_record.values,
    alias=a_record.alias,
)`

export const INGRESS_CODE = `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: \${domain}
  namespace: \${environment_namespace}
  annotations:
    kubernetes.io/tls-acme: "true"
    cert-manager.io/cluster-issuer: \${cluster_issuer}
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
spec:
  ingressClassName: traefik
  rules:
  - host: \${domain}
    http:
      paths:
      - backend:
          service:
            name: \${service_name}
            port:
              number: 8000
        path: /
        pathType: Prefix
  tls:
  - hosts:
    - \${domain}
    secretName: \${domain}-tls`

export const ISSUER_CODE = `apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: \${target_domain}
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: \${target_domain}
    solvers:
    - dns01:
        route53:
          region: \${aws_region}
          hostedZoneID: \${hosted_zone_id}`

export const TIMING_CODE = `# continue_default_api_deployment checks the ingress resources and certificate 10 minutes after
# the ingress is applied, and then every minute, for up to half an hour, without blocking a worker.
CERTIFICATE_FIRST_CHECK_SECONDS = 600
CERTIFICATE_CHECK_INTERVAL = 60
CERTIFICATE_MAX_ATTEMPTS = 30`

export const LOCK_CODE = `with transaction.atomic():
    try:
        llmclient = LLMClient.objects.select_for_update().get(id=llmclient_id)
    except LLMClient.DoesNotExist:
        ...
        return None
    domain_name = llmclient.default_host
    if smarter_settings.llmclient_tasks_create_dns_record:
        _, created = infrastructure.dns.create_domain_a_record(
            hostname=domain_name, api_host_domain=llmclient.base_api_domain
        )`

export const CUSTOM_HOST_CODE = `@property
def custom_host(self) -> Optional[str]:
    if self.custom_domain and self.custom_domain.is_verified:
        domain = f"{self.rfc1034_compliant_name}.{self.custom_domain.domain_name}"
        SmarterValidator.validate_domain(domain)
        return domain
    return None`

export const GUARD_CODE = `def refuse_in_unit_tests(what: str, allow_in_tests: bool = False) -> None:
    if running_unit_tests() and not allow_in_tests:
        raise InfrastructureConfigurationError(
            f"Refusing to reach {what} from the unit tests. Install a fake, e.g. with "
            "smarter.apps.infrastructure.providers.configure_provider(), or pass allow_in_tests=True."
        )`

export const FACADE_CODE = `from smarter.apps.infrastructure.services import infrastructure

zone, created = infrastructure.dns.get_or_create_zone("example.com")
certificate_id, _ = infrastructure.certificates.get_or_create_certificate("example.com")
infrastructure.kubernetes.apply_manifest(manifest)`

// The stages of a deploy after the Ingress is applied, in deploy_default_api.py.
export const waitSteps = [
  'Apply the Ingress, then hand off to a continuation task, scheduled 10 minutes later. The worker is free at once.',
  'Each check looks for all three of the Ingress, the Certificate and the TLS Secret. If one is missing, the task reschedules itself a minute later, up to 30 times.',
  'When they’re ready, check that the hostname resolves, every 5 minutes for up to 4 hours.',
  'Mark the LLMClient’s DNS as verified, and email the account’s primary contact.',
  'If the certificate never arrives, set its status to failed, and report the deploy as failed, rather than leave it half-finished.',
]

// The four layers that turn away a request for a host that isn’t a real chatbot.
export const hostLayers = [
  [
    '1. Exact-host routing',
    'Traefik, one router per Ingress',
    'any host without an Ingress, before it reaches a pod',
  ],
  ['2. ALLOWED_HOSTS', 'Django settings', 'anything outside the platform’s own domains'],
  [
    '3. SmarterSecurityMiddleware',
    'Django middleware',
    'a subdomain of the API domain that no LLMClient uses',
  ],
  [
    '4. The chat views',
    'Django views',
    'anonymous prompts to an LLMClient that isn’t deployed',
  ],
]

// The guards of the daily orphan sweep, in delete_orphan_dns_records.py.
export const sweepGuards = [
  {
    icon: 'lucide:regex',
    title: 'Only the exact shape',
    text: 'An anchored pattern matches one label, an account number and this environment’s API domain. The API domain’s own record, ACME TXT records and other environments’ hosts are invisible to it.',
  },
  {
    icon: 'lucide:database',
    title: 'Live means “exists”',
    text: 'A host is live if any LLMClient or LLMHost uses it, deployed or not. Undeploying is the owner’s decision, not the sweep’s.',
  },
  {
    icon: 'lucide:octagon-x',
    title: 'When in doubt, delete nothing',
    text: 'An empty LLMClient table, a host that can’t be computed, or a missing zone would make every record look orphaned. The task raises an error and deletes nothing.',
  },
  {
    icon: 'lucide:map-pin-off',
    title: 'Only where it owns the zone',
    text: 'In local development every developer shares a DNS zone, and one database knows nothing of another’s chatbots, so the task does nothing there.',
  },
  {
    icon: 'lucide:gauge',
    title: 'A ceiling on every run',
    text: 'At most 50 deletions a run, with a warning when there are more. The worst bad day is 50 records, each restored by redeploying its chatbot.',
  },
  {
    icon: 'lucide:eye',
    title: 'A dry run first',
    text: 'manage.py delete_orphan_dns_records --dry-run lists what it would delete, and deletes nothing.',
  },
]

// The commands of Lab 2, against the deployed weather chatbot. All of them only read.
export const inspectCommands = [
  {
    title: 'Look up the chatbot’s DNS record',
    text: `An A record maps a name to an IP address. Compare the two answers: the chatbot’s record is a copy of ${API_DOMAIN}’s.`,
    code: `dig +short A ${HOST}\ndig +short A ${API_DOMAIN}`,
  },
  {
    title: 'Look up a chatbot that doesn’t exist',
    text: 'There’s no wildcard record, so a name that Smarter didn’t create doesn’t resolve. Find status: NXDOMAIN, “no such domain”, and ANSWER: 0.',
    code: `dig A nosuchbot.3141-5926-5359.${API_DOMAIN}`,
  },
  {
    title: 'Read the chatbot’s certificate',
    text: 'Find the subject and the subject alternative name: exactly one host. The issuer is Let’s Encrypt, and the certificate is valid for about 90 days.',
    code: `echo | openssl s_client -connect ${HOST}:443 -servername ${HOST} 2>/dev/null \\\n  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName`,
  },
  {
    title: 'Knock on the door with a made-up host',
    text: 'curl --resolve sends a request for a name that doesn’t resolve to the chatbot’s address anyway. Traefik has no router for it: it presents its own default certificate, -k accepts it, and the answer is 404 page not found. Django never sees the request.',
    code: `IP=$(dig +short A ${HOST})\ncurl -sk --resolve nosuchbot.3141-5926-5359.${API_DOMAIN}:443:$IP \\\n  https://nosuchbot.3141-5926-5359.${API_DOMAIN}/config/`,
  },
  {
    title: 'Ask the chatbot itself',
    text: 'A deployed LLMClient’s URL is an API, with a /config/ and a /prompt/ endpoint. Find is_deployed in the answer. The session_key is new each time: you just started a chat session.',
    code: `curl -s -X POST https://${HOST}/config/ \\\n  -H "Content-Type: application/json" -d '{}' | python3 -m json.tool | head -30`,
  },
]

// What a real answer to the third command says, on October 28, 2026.
export const SAMPLE_CERT = `subject=CN=${HOST}
issuer=C=US, O=Let's Encrypt, CN=YR2
notBefore=Oct 15 12:06:16 2026 GMT
notAfter=Jan 13 12:06:15 2027 GMT
X509v3 Subject Alternative Name:
    DNS:${HOST}`

// What to try with the live chatbot.
export const experiments = [
  {
    prompt: 'What is the weather in San Francisco?',
    observe: `Open your browser’s developer tools, on the Network tab, before you ask. The chat POSTs to /prompt/ on ${HOST}: the hostname that this case deployed, not smarter.sh.`,
  },
  {
    prompt: 'What is the capital of France?',
    observe:
      'The weather chatbot declines: it answers only about the weather. Deploying gives a chatbot an address; its manifest still decides what it says.',
  },
  {
    prompt: '(Click the padlock in your address bar, on this page.)',
    observe:
      'That certificate is smarter.sh’s. The chat inside the page makes its own TLS connection, to its own host, with its own certificate: the one you’ll read in Lab 2.',
  },
]

export const labExercises = [
  {
    title: 'Find the hostname’s first label',
    text: 'In llmclient-weather.yaml, find metadata.name. Which label of the chatbot’s hostname comes from it? Why does a name such as stackademy_sql become stackademy-sql in a hostname?',
  },
  {
    title: 'Deployed: false?',
    text: 'The repository’s copy says deployed: false, yet the weather chatbot on ubc.smarter.sh is deployed. Why is deploy a separate verb from apply, and what would happen if every apply deployed?',
  },
  {
    title: 'Claim a domain',
    text: 'In example-com.yaml, change domainName to a domain you own. It still validates. What, in Part 9, has to happen before a single chatbot is served on it?',
  },
  {
    title: 'Check the claim',
    text: 'Run dig +short NS example.com. Whose name servers answer for example.com? Why does that make the annotation expected-verification: Failed true?',
  },
  {
    title: 'Break a type',
    text: 'In llmclient-weather.yaml, change defaultMaxTokens: 4096 to defaultMaxTokens: lots. The check fails, names the key, and says what it must be.',
  },
]

export const takeaways = [
  'Give each tenant-facing host its own DNS record, created when it goes live and deleted when it goes away. NXDOMAIN is the cheapest rejection there is.',
  'Issue one certificate per host, with cert-manager and DNS-01. A leaked key then speaks for one host.',
  'Put the tenant’s identifier in the hostname, so no tenant can claim another’s name.',
  'Never block a worker on the outside world. Check once, and reschedule.',
  'Lock the row while you create or destroy its record, and sweep for orphans anyway.',
  'Treat a custom domain as a claim, and provision nothing until it’s proven.',
  'Put every cloud call behind one facade, and guard the backend, not the callers.',
]

export const sections = [
  { id: 'situation', label: 'The situation' },
  { id: 'problem', label: 'The problem' },
  { id: 'deploy', label: 'One deploy, end to end' },
  { id: 'hard', label: 'Why it’s hard' },
  { id: 'hostname', label: 'The hostname' },
  { id: 'dns', label: 'One record, no wildcard' },
  { id: 'tls', label: 'One certificate per host' },
  { id: 'waiting', label: 'Waiting without blocking' },
  { id: 'custom-domains', label: 'Custom domains' },
  { id: 'host-checks', label: 'Four checks of the host' },
  { id: 'try', label: 'Lab 1: The deployed chatbot' },
  { id: 'inspect', label: 'Lab 2: Inspect it' },
  { id: 'lab', label: 'Lab 3: The manifests' },
  { id: 'cleanup', label: 'Cleaning up' },
  { id: 'tests', label: 'Keeping the cloud out of tests' },
  { id: 'tradeoffs', label: 'Costs and trade-offs' },
  { id: 'discussion', label: 'Discussion questions' },
  { id: 'reading-list', label: 'Further reading' },
]

export const discussion = [
  'A wildcard DNS record and a wildcard certificate would make a deploy take seconds instead of ten minutes. For which kinds of platform would you choose the wildcard? What would you have to add to make it safe?',
  'Every publicly trusted certificate is written to Certificate Transparency logs, so every chatbot’s hostname, with its account number, becomes public. When would that be unacceptable? How would you change the hostname scheme?',
  'DNS-01 needs permission to write DNS records; HTTP-01 doesn’t. Why does Smarter accept that cost? When is HTTP-01 the better choice?',
  'The deploy task reschedules itself instead of sleeping. What would happen to the platform if it slept for ten minutes in a Celery worker, and a hundred people deployed at once?',
  'The sweep refuses to delete anything when the LLMClient table is empty. Describe a real incident that this rule would prevent.',
  'A custom domain is verified once, and nothing re-checks it on a schedule. What could go wrong? Is the failure safe?',
  'The guard in refuse_in_unit_tests() checks sys.argv. Why is such a crude check a feature? What can it not see?',
]

export const readingList = [
  {
    title: 'One DNS record and one TLS certificate per deployed LLM',
    url: posts.perHost,
  },
  { title: 'DNS-01 certificates, one issuer per delegated zone', url: posts.dns01 },
  { title: 'Custom domains that must prove delegation', url: posts.customDomains },
  { title: 'A daily sweep for orphaned DNS records', url: posts.orphans },
  { title: 'Keeping the cloud out of reach of tests', url: posts.facade },
  { title: 'ALLOWED_HOSTS on a multi-tenant platform', url: posts.allowedHosts },
  { title: 'One image, laptop to production', url: posts.docker },
  { title: 'Deploying an LLMClient on Kubernetes', url: DEPLOY_DOCS },
  {
    title: 'Custom domains, in the docs',
    url: `${DOCS}/en/latest/smarter-resources/smarter-custom-domain.html`,
  },
  {
    title: 'cert-manager: ACME DNS-01 with Route 53',
    url: 'https://cert-manager.io/docs/configuration/acme/dns01/route53/',
  },
  {
    title: 'Let’s Encrypt: challenge types',
    url: 'https://letsencrypt.org/docs/challenge-types/',
  },
  {
    title: 'MDN: subdomain takeover',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Subdomain_takeover',
  },
]
