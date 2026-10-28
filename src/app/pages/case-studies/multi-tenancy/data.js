import { BLOG, DOCS } from '@/common/constants'
import { githubRepository } from '@/components/manifest/manifests'

// The platform's source, at the files that this case reads.
export const sourceFile = (path) =>
  `https://github.com/smarter-sh/smarter/blob/main/smarter/smarter/${path}`

// The blog posts that this case is based on.
export const posts = {
  querysets: `${BLOG}2026/09/26/smarter-tenant-isolation-django-querysets/`,
  ownership: `${BLOG}2026/07/18/smarter-metadata-with-ownership/`,
  sessions: `${BLOG}2026/02/02/smarter-chat-session-one-chatbot/`,
  hosts: `${BLOG}2026/01/20/smarter-django-allowed-hosts/`,
  cors: `${BLOG}2026/08/26/smarter-cors-csrf-per-chatbot/`,
  keys: `${BLOG}2026/06/26/smarter-api-keys-knox/`,
}

// The case's manifests: two of the chatbots that every Smarter platform loads.
export const repo = githubRepository('smarter-sh/example-manifests')

export const files = [
  {
    path: 'llm-clients/llmclient-weather.yaml',
    kind: 'LLMClient',
    name: 'weather',
    role: 'The weather chatbot that Lab 2 probes. Its allowedOrigins lists https://smarter.sh, which is why its chat works on this page, and why https://example.com gets no CORS header.',
  },
  {
    path: 'llm-clients/llmclient-math.yaml',
    kind: 'LLMClient',
    name: 'math',
    role: 'Euclid, the math tutor: another account resource on the same parent domain. In Lab 2, a session key from the weather chatbot is refused here.',
  },
]

export const objectives = [
  'Explain what a tenant is, and why one shared database makes a guessed id the most common way that tenants leak into each other.',
  'Compare three ways to isolate tenants: a database per tenant, row-level security, and query rules in the application.',
  'Read a permission-aware Django queryset, and predict what it returns for a given user.',
  'Explain why “not yours” should answer 404, and why a separate, stricter rule should govern changes.',
  'Trace how a client-chosen identity (a profile, a session key, a Host header) is treated as a claim and checked on the server.',
  'Tell CORS and CSRF apart, and say what each does, and doesn’t, protect.',
  'Explain why API keys are stored as digests, and named by an unrelated id.',
]

export const facts = [
  ['Organization', 'The Smarter Project, an open source community'],
  ['The question', '“Can one account ever see another account’s resources?”'],
  ['The platform', 'One Django application and one MariaDB database, for every account'],
  ['The resources', 'Chatbots, Secrets, connections, plugins, Guardrails, API keys…'],
  ['The boundary', 'Two queryset rules, inherited by every resource model'],
  ['The edges', 'Profiles, Host headers, session keys, browser origins, API keys'],
  ['Infrastructure added', 'None. No database, schema or grant table per tenant.'],
  ['Its weakness', 'It depends on every lookup starting from the rules'],
]

// The attack of Part 4, as a UML sequence diagram.
export const actors = [
  {
    id: 'attacker',
    label: 'Mallory',
    sub: 'a free account',
    icon: 'lucide:user-round-x',
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'view',
    label: 'A console view',
    sub: 'Django',
    icon: 'lucide:panel-top',
    color: 'bg-orange-100 text-primary',
  },
  {
    id: 'rule',
    label: 'The rule',
    sub: 'a queryset method',
    icon: 'lucide:shield-check',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'db',
    label: 'The database',
    sub: 'every tenant’s rows',
    icon: 'lucide:database',
    color: 'bg-teal-100 text-teal-700',
  },
]

export const sequence = [
  {
    from: 'attacker',
    to: 'view',
    text: 'DELETE custom domain 41 (her own is 40; 41 is someone else’s)',
  },
  {
    from: 'view',
    to: 'rule',
    text: 'objects.with_ownership_permission_for(mallory).get(id=41)',
    code: true,
  },
  {
    from: 'rule',
    to: 'db',
    text: 'SELECT … WHERE id = 41 AND user_profile_id = <Mallory’s>',
    code: true,
  },
  { from: 'db', to: 'rule', text: 'no rows' },
  { from: 'rule', to: 'view', text: 'DoesNotExist' },
  {
    from: 'view',
    to: 'attacker',
    text: '404 Not Found: the same answer as an id that was never used',
  },
]

export const isolationDesigns = [
  [
    'A database or schema per tenant',
    'The connection. A query can’t see another tenant’s rows at all. The strongest isolation, and the most expensive to run: migrations once per tenant, connections that grow with tenants, and shared, platform-wide resources made hard.',
  ],
  [
    'Row-level security',
    'A database policy filters every query by a session variable. PostgreSQL has it. Smarter runs on MariaDB, which doesn’t.',
  ],
  [
    'Query rules in the application',
    'Every table holds every tenant’s rows, and the application filters them. As strong as the code’s consistency. Smarter’s choice.',
  ],
]

export const rulesTable = [
  ['A platform superuser', 'everything', 'everything'],
  [
    'An account’s staff user',
    'their accounts’ resources, and the platform’s built-ins',
    'every resource owned in their accounts',
  ],
  [
    'A regular member',
    'their accounts’ resources, and the platform’s built-ins',
    'only what they own',
  ],
  ['Anyone without a profile, or not a User', 'nothing', 'nothing'],
]

export const READ_RULE = `def with_read_permission_for(self, user):
    if not isinstance(user, User):
        return self.none()

    def _get_for_user_profile(user_profile):
        if user_profile.user.is_superuser:
            return self.all()
        return self.filter(
            models.Q(user_profile__account=smarter_cached_objects.smarter_account)
            | models.Q(user_profile__account=user_profile.account)
        )

    request_user_profiles = UserProfile.get_cached_objects(user=user)
    if not request_user_profiles.exists():
        return self.none()

    qs = self.none()
    for request_user_profile in request_user_profiles:
        qs = qs | _get_for_user_profile(request_user_profile)
    return qs.distinct()`

export const CHANGE_RULE = `def _get_for_user_profile(user_profile):
    # superusers have ownership permission for all resources
    if user_profile.user.is_superuser:
        return self.all()

    # staff users have ownership permission for resources owned within their account, or owned by themselves
    if user_profile.user.is_staff:
        return self.filter(user_profile__account=user_profile.account)

    # regular authenticated users have ownership permission only for resources they own
    return self.filter(user_profile=user_profile)`

export const PATTERN_LINE = `custom_domain = LLMClientCustomDomain.objects.with_ownership_permission_for(
    self.user_profile.user
).get(id=custom_domain_id)`

export const LISTVIEW_CODE = `if ownership_filter == SmarterResourceOwnershipFilterEnum.OWNED:
    queryset = manager.owned_by(user)
elif ownership_filter == SmarterResourceOwnershipFilterEnum.SHARED:
    queryset = manager.shared_with(user)
else:
    queryset = manager.with_read_permission_for(user)`

export const defaults = [
  {
    icon: 'lucide:layers',
    title: 'The rules are inherited',
    text: 'They live on the manager of MetaDataWithOwnershipModel, the abstract base model that nearly every resource kind inherits. A new kind has them from its first line.',
  },
  {
    icon: 'lucide:link-2',
    title: 'They survive chaining',
    text: 'The manager declares again every method that returns a queryset (filter, select_related, order_by…) with the permission-aware type, so the rule is one call away wherever a query starts, and type checkers know it.',
  },
  {
    icon: 'lucide:list',
    title: 'Shared views use them',
    text: 'Every list page in the web console gets its rows from one method that has no unfiltered branch: owned_by(), shared_with() or with_read_permission_for().',
  },
  {
    icon: 'lucide:file-code',
    title: 'So do the manifest brokers',
    text: 'apply and delete act only on the caller’s own resource of that name. describe falls back to with_read_permission_for() when the caller doesn’t own one.',
  },
  {
    icon: 'lucide:shield',
    title: 'And the Django admin',
    text: 'The admin’s querysets for chatbots and Secrets go through with_ownership_permission_for(), so even staff see only their accounts.',
  },
  {
    icon: 'lucide:search-code',
    title: 'What’s left is reviewable',
    text: 'A lookup that doesn’t start from a rule stands out. A reviewer can grep for it, and a test with a second account should get a 404.',
  },
]

// Lab 1: the people and resources of a small platform, and the two rules, in JavaScript.
export const PLATFORM = 'Smarter (the platform)'

export const people = [
  {
    id: 'ana',
    name: 'Ana',
    description: 'a member of Acme',
    profiles: [{ id: 'ana@acme', account: 'Acme' }],
  },
  {
    id: 'ben',
    name: 'Ben',
    description: 'Acme’s account admin (staff)',
    staff: true,
    profiles: [{ id: 'ben@acme', account: 'Acme' }],
  },
  {
    id: 'chen',
    name: 'Chen',
    description: 'a member of Acme and of Globex',
    profiles: [
      { id: 'chen@acme', account: 'Acme' },
      { id: 'chen@globex', account: 'Globex' },
    ],
  },
  {
    id: 'dee',
    name: 'Dee',
    description: 'a platform superuser',
    superuser: true,
    profiles: [{ id: 'dee@smarter', account: PLATFORM }],
  },
  {
    id: 'anonymous',
    name: 'A visitor',
    description: 'not signed in',
    profiles: [],
  },
]

export const resources = [
  { name: 'support', kind: 'LLMClient', owner: 'ana@acme', account: 'Acme' },
  { name: 'billing_db', kind: 'Secret', owner: 'ben@acme', account: 'Acme' },
  { name: 'sales', kind: 'LLMClient', owner: 'chen@globex', account: 'Globex' },
  { name: 'pricing', kind: 'SqlPlugin', owner: 'gil@globex', account: 'Globex' },
  {
    name: 'secrets_leak_output',
    kind: 'Guardrail',
    owner: 'smarter_admin',
    account: PLATFORM,
  },
]

/** with_read_permission_for(), for one person and one resource. */
export const mayRead = (person, resource) => {
  if (person.superuser) return true
  return person.profiles.some(
    (profile) => resource.account === PLATFORM || resource.account === profile.account
  )
}

/** with_ownership_permission_for(), for one person and one resource. */
export const mayChange = (person, resource) => {
  if (person.superuser) return true
  return person.profiles.some((profile) =>
    person.staff ? resource.account === profile.account : resource.owner === profile.id
  )
}

export const ruleQuestions = [
  'Before you click: which of the five resources can Chen read? Which can Chen change?',
  'Ben is Acme’s admin. Can he change Ana’s chatbot? Can he change the built-in Guardrail that he can read?',
  'Chen chooses the Globex profile in the console’s menu. Does that change what Chen may read? (Part 7 answers it.)',
]

export const profileChecks = [
  {
    title: 'Checked when it’s chosen',
    text: 'The Change Profile view refuses a profile that isn’t the caller’s, with the same 404, and logs a warning. Only then is the profile’s id stored in the Django session, which Smarter keeps on the server, in its cache. The browser holds only the session’s id.',
  },
  {
    title: 'Checked again on every use',
    text: 'Whenever code resolves a user’s profile, the stored choice counts only if that profile belongs to the user being resolved. Code that resolves a different user during the same request, an account’s admin for instance, can’t pick up the signed-in user’s choice.',
  },
  {
    title: 'Kept per request',
    text: 'Middleware carries the choice in a Python ContextVar and resets it in a finally block, so concurrent requests on the same ASGI worker can’t see each other’s choice.',
  },
  {
    title: 'Ignored for API keys',
    text: 'A request authenticated with an API key ignores the session’s choice entirely. A key acts as its own user.',
  },
]

export const PROFILE_CODE = `profile_id = selected_user_profile_id.get()
if not profile_id or not user_id:
    return None
try:
    user_profile = cls.get_cached_object(pk=profile_id)
except cls.DoesNotExist:
    return None
if user_profile.user_id != user_id:
    return None
return user_profile`

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

export const SESSION_CODE = `if prompt and self.llmclient and prompt.llmclient_id != self.llmclient.id:
    # A session belongs to one llmclient. A key of another llmclient's session, e.g. a
    # session_key cookie that the browser sends to every host of the platform's domain,
    # starts a new session rather than continuing the other llmclient's chat.
    prompt = None
    self._session_key = self.generate_session_key()`

export const CORS_CODE = `@receiver(check_request_enabled, dispatch_uid="smarter.apps.llmclient.cors.allow_llmclient_origins")
def allow_llmclient_origins(sender, request: HttpRequest, **kwargs) -> bool:
    origin = request.headers.get("Origin")
    if not origin:
        return False
    llmclient = llmclient_for_cors(request)
    allowed = origin_allowed(origin, llmclient)
    return allowed

def origin_allowed(origin: Optional[str], llmclient: Optional[LLMClient]) -> bool:
    if not origin or not llmclient:
        return False
    allowed = llmclient.allowed_origins or []
    return origin.strip().lower().rstrip("/") in allowed`

export const corsProperties = [
  {
    icon: 'lucide:crosshair',
    title: 'Scoped',
    text: 'A chatbot’s origins apply only to the endpoints that its chat calls: /, /config/ and /prompt/ on its own host, and the matching API paths. They never open the web console, the manifest API or another chatbot.',
  },
  {
    icon: 'lucide:equal',
    title: 'Exact',
    text: 'Set membership on normalized strings. No regular expressions built from user input, no suffix matching. The manifest refuses paths and wildcards: https://*.example.com is an error.',
  },
  {
    icon: 'lucide:lock',
    title: 'Fails closed',
    text: 'Any lookup it can’t resolve (an unknown id, an undeployed host, a malformed path) returns no chatbot, and no chatbot means False. A bug breaks a widget; it never allows an origin.',
  },
  {
    icon: 'lucide:arrow-up-to-line',
    title: 'Runs early',
    text: 'The CORS middleware is second in Django’s list, so even a 401 or a 500 carries CORS headers. Otherwise the browser hides the real error behind a CORS error.',
  },
]

export const keyProperties = [
  [
    'Only a digest is stored',
    'A database dump, backup or replica that would otherwise be a list of working keys',
  ],
  [
    'A random UUID is its public name',
    'URLs, logs and manifests that would otherwise carry something derived from the key',
  ],
  [
    'Only staff users may hold keys',
    'Every member of an account minting long-lived credentials',
  ],
]

export const KEY_CODE = `def validate_token(self, token: str) -> bool:
    """Return True if token is this api key's token, which is stored only as its digest."""
    if not token or token[: CONSTANTS.TOKEN_KEY_LENGTH] != self.token_key:
        return False
    return hmac.compare_digest(crypto.hash_token(token), self.digest)`

// The commands of Lab 2, against two chatbots that every Smarter platform deploys, on ubc.smarter.sh.
export const WEATHER = 'https://weather.3141-5926-5359.api.ubc.smarter.sh'
export const MATH = 'https://math.3141-5926-5359.api.ubc.smarter.sh'

const preflight = (origin) =>
  [
    `curl -s -o /dev/null -D - -X OPTIONS ${WEATHER}/config/ \\`,
    `  -H "Origin: ${origin}" \\`,
    `  -H "Access-Control-Request-Method: POST" \\`,
    `  -H "Access-Control-Request-Headers: content-type" | grep -i "^HTTP\\|access-control-allow-origin"`,
  ].join('\n')

export const curlCommands = [
  {
    title: 'Ask, as a page on smarter.sh, whether you may call the weather chatbot',
    text: 'This is the preflight a browser sends before Smarter Chat’s first request. The answer names the origin in Access-Control-Allow-Origin: smarter.sh is in the chatbot’s allowedOrigins.',
    code: preflight('https://smarter.sh'),
  },
  {
    title: 'Ask the same thing as a page on example.com',
    text: 'Still 200, but no Access-Control-Allow-Origin header. A browser on example.com would refuse to hand the answer to the page.',
    code: preflight('https://example.com'),
  },
  {
    title: 'Call it anyway, from example.com',
    text: 'curl isn’t a browser, and ignores CORS. The chatbot answers in full. CORS decides what a page may read in a visitor’s browser, not who may send a request.',
    code: [
      `curl -s -X POST ${WEATHER}/config/ \\`,
      `  -H "Origin: https://example.com" \\`,
      `  -H "Content-Type: application/json" -d '{}' | head -c 300`,
    ].join('\n'),
  },
  {
    title: 'Carry a session key from one chatbot to another',
    text: 'Get a session key from the weather chatbot, send it back to the weather chatbot, then to the math chatbot. The first answer keeps the key. The second is a different key: a new session.',
    code: [
      `KEY=$(curl -s -X POST ${WEATHER}/config/ -H "Content-Type: application/json" -d '{}' \\`,
      `  | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['session_key'])")`,
      `echo "weather: $KEY"`,
      `for BOT in ${WEATHER} ${MATH}; do`,
      `  curl -s -X POST $BOT/config/ -H "Content-Type: application/json" -d "{\\"session_key\\": \\"$KEY\\"}" \\`,
      `    | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['session_key'])"`,
      `done`,
    ].join('\n'),
  },
  {
    title: 'Make up a chatbot',
    text: 'There’s no wildcard DNS record, so a made-up host doesn’t resolve at all. Force it to the platform’s load balancer, and Traefik answers 404: no Ingress, no router. Django never sees it.',
    code: [
      `HOST=nosuchbot.3141-5926-5359.api.ubc.smarter.sh`,
      `curl -s -o /dev/null -w "%{http_code}\\n" https://$HOST/config/`,
      `IP=$(dig +short weather.3141-5926-5359.api.ubc.smarter.sh | tail -1)`,
      `curl -sk -o /dev/null -w "%{http_code}\\n" --resolve $HOST:443:$IP https://$HOST/config/`,
    ].join('\n'),
  },
]

export const labExercises = [
  {
    title: 'Find the list',
    text: 'In llmclient-weather.yaml, find spec.config.prompt.allowedOrigins. Which of Lab 2’s commands does it explain?',
  },
  {
    title: 'Add your own site',
    text: 'Add - http://localhost:5173 under allowedOrigins. It validates. Who would have to apply the change for it to take effect: the platform’s operator, or the chatbot’s owner?',
  },
  {
    title: 'Try a wildcard',
    text: 'Add - https://*.example.com. The editor accepts it: the JSON Schema only says “a list of strings”. The platform’s Pydantic validator would reject it on apply. What does that tell you about where a security rule must live?',
  },
  {
    title: 'Compare the two chatbots',
    text: 'Open llmclient-math.yaml. Which origins may embed Euclid? Neither manifest names an apiKey: what does that make them, and does CORS change it?',
  },
]

export const discussion = [
  'Smarter chose query rules over a database per tenant because it needs shared built-ins and people in several accounts. Name a product for which that would be the wrong choice, and say what you would accept in exchange for stronger isolation.',
  'A rule that every lookup must start from with_read_permission_for() is only as strong as the team’s discipline. List three things, in code, review or tests, that would catch a new endpoint that forgets it.',
  'Why answer 404, and not 403 Forbidden, when a resource exists but belongs to someone else? Is there any case where 403 would be the better answer?',
  'The profile switcher, the session key and the Host header are all values that the client chooses. What is the general rule that Smarter applies to all three? Find a fourth value of this kind in a web application you know.',
  'CORS is a rule for browsers, and curl ignores it. So what does a chatbot’s allowedOrigins list actually protect? Who would be harmed if it allowed every origin?',
  'API keys are hashed with SHA-512, but passwords are hashed with bcrypt or Argon2. Why the difference? What would go wrong if Smarter used bcrypt for its keys?',
  'A database dump can’t leak working API keys. Name two other places, outside the token table, where a key in an Authorization header could still be recorded in full.',
]

export const readingList = [
  { title: 'Tenant isolation as queryset rules (source post)', url: posts.querysets },
  { title: 'Smarter’s ownership model', url: posts.ownership },
  { title: 'A session key opens exactly one chatbot', url: posts.sessions },
  { title: 'ALLOWED_HOSTS on a multi-tenant platform', url: posts.hosts },
  { title: 'CORS and CSRF per chatbot', url: posts.cors },
  { title: 'API keys as digests, named by a UUID', url: posts.keys },
  {
    title: 'The MetaDataWithOwnership model reference',
    url: `${DOCS}/en/latest/smarter-resources/account/models/metadata_with_ownership.html`,
  },
  {
    title: 'Embedding Smarter Chat, and allowedOrigins',
    url: `${DOCS}/en/latest/smarter-framework/smarter-chat/embedding.html`,
  },
  {
    title: 'OWASP: Broken Object Level Authorization',
    url: 'https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/',
  },
  {
    title: 'MDN: Cross-Origin Resource Sharing (CORS)',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS',
  },
]

export const sections = [
  { id: 'situation', label: 'The situation' },
  { id: 'problem', label: 'The problem' },
  { id: 'designs', label: 'Three ways to isolate' },
  { id: 'rules', label: 'The rules, as querysets' },
  { id: 'defaults', label: 'The safe path by default' },
  { id: 'rules-lab', label: 'Lab 1: Apply the rules' },
  { id: 'profiles', label: 'The profile switcher' },
  { id: 'hosts', label: 'Many hosts, one domain' },
  { id: 'sessions', label: 'One session, one chatbot' },
  { id: 'cors', label: 'CORS and CSRF' },
  { id: 'curl', label: 'Lab 2: Probe the edges' },
  { id: 'keys', label: 'API keys' },
  { id: 'lab', label: 'Lab 3: allowedOrigins' },
  { id: 'costs', label: 'Costs and limits' },
  { id: 'discussion', label: 'Discussion questions' },
  { id: 'reading-list', label: 'Further reading' },
]
