import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Guardrails from './page'
import { compileKeywords, detect, replaceMatches, runStage } from './components/simulator'

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/case-studies/guardrails']}>
        <Guardrails />
      </MemoryRouter>
    </HelmetProvider>
  )

beforeEach(() => {
  // neither the chatbot nor GitHub answers in tests
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

describe('the guardrails case study', () => {
  test('teaches the case, with Sam, the pipeline and the manifests', async () => {
    renderPage()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Guardrails: can you trust the model?',
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Learning objectives')).toBeInTheDocument()
    for (const name of [
      'Lab 1: Talk to Sam',
      'Lab 2: Run the pipeline',
      'Lab 3: The guardrail manifests',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(
      await screen.findByTestId('chat-preview-smarter_developer')
    ).toBeInTheDocument()
    expect(await screen.findByText(/GitHub didn’t answer/)).toBeInTheDocument()
    // a manifest named in the text opens in the editor's dialog
    fireEvent.click(
      screen.getAllByRole('link', { name: 'prompt-injection-keyword-input.yaml' })[0]
    )
    expect(screen.getByRole('dialog')).toHaveTextContent('fifteen well-known injection')
  })

  test('the pipeline lab shows each verdict, and changes with the text and monitor mode', () => {
    renderPage()
    const input = screen.getByLabelText('The visitor’s message')
    const stage = input.closest('div')
    // the starting message: the password is redacted, then the injection phrase blocks
    expect(within(stage).getByText('BLOCKED')).toBeInTheDocument()
    expect(within(stage).getByText(/^redacted: password_assignment/)).toBeInTheDocument()
    expect(within(stage).getByText(/finish_reason of content_filter/)).toBeInTheDocument()

    fireEvent.click(
      screen.getByLabelText('prompt_injection_keyword_input in monitor mode')
    )
    expect(within(stage).getByText('REDACTED')).toBeInTheDocument()
    expect(within(stage).getByText(/^would have blocked/)).toBeInTheDocument()
    expect(
      within(stage).getByText(
        /Ignore previous instructions. My config has password = \[REDACTED SECRET\]/
      )
    ).toBeInTheDocument()
    fireEvent.click(
      screen.getByLabelText('prompt_injection_keyword_input in monitor mode')
    )
    expect(within(stage).getByText('BLOCKED')).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'How do guardrails work?' } })
    expect(within(stage).getByText('ALLOWED')).toBeInTheDocument()
    expect(within(stage).getAllByText('nothing found')).toHaveLength(2)

    const reply = screen.getByLabelText('The model’s reply')
    const output = reply.closest('div')
    expect(within(output).getByText('REDACTED')).toBeInTheDocument()
    expect(
      within(output).getByText(/Try this: <img src=x \[script removed\]"alert\(1\)">/)
    ).toBeInTheDocument()
  })
})

describe('the guardrail simulator', () => {
  test('keywords match whole words, in any case, across any whitespace', () => {
    const pattern = compileKeywords(['ignore previous instructions', 'jailbreak mode'])
    expect('IGNORE  previous\ninstructions'.match(pattern)).toHaveLength(1)
    expect('ignore your previous instructions'.match(pattern)).toBeNull()
    expect('jailbreak modes'.match(pattern)).toBeNull()
  })

  test('the detectors find each kind of secret, and only the value of an assignment', () => {
    const labels = (text) => detect(text).map((m) => m.label)
    // built from parts, so that no secret scanner takes the test for a leak
    expect(labels(`key ${'AKIA'}${'X'.repeat(16)} here`)).toEqual(['aws_access_key'])
    expect(labels(`token ghp_${'a'.repeat(36)}`)).toEqual(['api_key'])
    const key = 'PRIVATE' + ' KEY'
    expect(labels(`-----BEGIN ${key}-----\nabc\n-----END ${key}-----`)).toEqual([
      'private_key',
    ])
    expect(labels('eyJhbGciOiJI.eyJzdWIiOiIx.c2lnbmF0dXJl')).toEqual(['jwt'])
    const [match] = detect('PASSWORD = "hunter22"')
    expect(match).toMatchObject({ label: 'password_assignment' })
    expect('PASSWORD = "hunter22"'.slice(match.start, match.end)).toBe('hunter22')
    expect(labels('secret: tiger')).toEqual([])
  })

  test('overlapping matches are merged, keeping the longest', () => {
    // the api key is also the value of an assignment: one match
    expect(detect(`api_key=sk-${'b'.repeat(24)}`)).toHaveLength(1)
  })

  test('replacements keep the text around each match', () => {
    const matches = [
      { start: 0, end: 1 },
      { start: 4, end: 5 },
    ]
    expect(replaceMatches('a b c', matches, 'X')).toBe('X b X')
  })

  test('an output stage with nothing to do allows the reply unchanged', () => {
    const result = runStage('output', 'All clear.')
    expect(result).toMatchObject({
      disposition: 'ALLOWED',
      text: 'All clear.',
      blocked: null,
    })
    expect(result.steps.map((step) => step.guardrail.priority)).toEqual([10, 20])
  })
})
