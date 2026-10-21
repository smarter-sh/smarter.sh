import { architectures, withPublicUrls } from '@/common/architectures'

const nodes = (node) => [node, ...node.children.flatMap(nodes)]

// The home page's architecture trees: every card opens a public page, never a web console page.
describe('architectures', () => {
  test.each(Object.entries(architectures))(
    'every resource of %s links to a public page',
    (_, tree) => {
      for (const node of nodes(tree)) {
        expect(node.url).toMatch(
          /^https:\/\/(github\.com\/smarter-sh\/|docs\.smarter\.sh\/)/
        )
      }
    }
  )

  test('a resource opens its manifest, its repository, or its kind in the docs', () => {
    const tree = withPublicUrls({
      kind: 'LLMClient',
      name: 'weather',
      readable: true,
      children: [
        { kind: 'Guardrail', name: 'self_harm_input', readable: true, children: [] },
        { kind: 'Extension', name: 'weather', readable: true, children: [] },
        { kind: 'Provider', name: 'openai', readable: true, children: [] },
        { kind: 'Secret', name: null, readable: false, children: [] },
      ],
    })
    const [guardrail, extension, provider, secret] = tree.children
    expect(tree.url).toMatch(/llmclient\/data\/llm-clients\/llmclient-weather\.yaml$/)
    expect(guardrail.url).toMatch(/guardrail\/data\/guardrails\/self-harm-input\.yaml$/)
    expect(extension.url).toBe('https://github.com/smarter-sh/smarter-extension-weather')
    expect(provider.url).toMatch(
      /^https:\/\/docs\.smarter\.sh\/.*smarter-provider\.html$/
    )
    expect(secret.url).toBeNull()
  })
})
