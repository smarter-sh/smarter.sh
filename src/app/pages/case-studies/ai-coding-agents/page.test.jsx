import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AiCodingAgents from './page'

beforeEach(() => {
  // the chatbot doesn't answer in tests: the page shows its preview.
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')))
})

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/case-studies/ai-coding-agents']}>
        <AiCodingAgents />
      </MemoryRouter>
    </HelmetProvider>
  )

describe('the AI coding agents case study', () => {
  test('teaches the case, with its three labs and Sam', async () => {
    renderPage()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Converge or Diverge:\s*AI Coding Agents/,
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Learning objectives')).toBeInTheDocument()
    for (const name of [
      'Lab 1: Read the rules',
      'Lab 2: Measure the series',
      'Lab 3: Talk to Sam',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(
      await screen.findByTestId('chat-preview-smarter_developer')
    ).toBeInTheDocument()
  })

  test('charts the hand-rolled caches at every tag, with the helper beside them', () => {
    renderPage()
    const chart = screen.getByRole('table', { name: /Hand-rolled cache files/ })
    const rows = chart.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(9)
    expect(rows[0]).toHaveTextContent('v0.14')
    expect(rows[5]).toHaveTextContent(/v0\.19\s*9\s*135/)
    expect(rows[7]).toHaveTextContent(/v0\.21\s*2\s*147/)
  })

  test('gives the measurement as a command to copy', () => {
    renderPage()
    expect(screen.getByText(/git tag --sort=creatordate/)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Copy' })).toHaveLength(3)
  })

  test('each scenario of Lab 1 reveals its answer and where the rule is written', () => {
    renderPage()
    const summaries = screen.getAllByText('What does the agent do?')
    expect(summaries).toHaveLength(5)
    fireEvent.click(summaries[0])
    expect(
      screen.getByText(/prints the git add and git commit commands/)
    ).toBeInTheDocument()
    const source = screen.getAllByRole('link', { name: 'smarter-infrastructure-safety' })
    expect(source[source.length - 1]).toHaveAttribute(
      'href',
      'https://github.com/smarter-sh/smarter/blob/main/skills/smarter-infrastructure-safety/SKILL.md'
    )
  })
})
