import { act, fireEvent, render, screen } from '@testing-library/react'
import { CodeBlock, Contents } from './Teaching'

const sections = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
]

test('the contents highlight the part that the reader is in', () => {
  let callback
  const observe = jest.fn()
  const disconnect = jest.fn()
  global.IntersectionObserver = jest.fn((cb) => {
    callback = cb
    return { observe, disconnect }
  })
  const { unmount } = render(
    <>
      <Contents sections={sections} />
      <section id="one" />
      <section id="two" />
    </>
  )
  expect(observe).toHaveBeenCalledTimes(2)
  expect(screen.getByRole('link', { name: /One/ })).toHaveClass('font-medium')

  act(() => callback([{ isIntersecting: true, target: { id: 'two' } }]))
  expect(screen.getByRole('link', { name: /Two/ })).toHaveClass('font-medium')
  // a part that leaves the view changes nothing
  act(() => callback([{ isIntersecting: false, target: { id: 'one' } }]))
  expect(screen.getByRole('link', { name: /Two/ })).toHaveClass('font-medium')

  unmount()
  expect(disconnect).toHaveBeenCalled()
  delete global.IntersectionObserver
})

describe('a code block', () => {
  afterEach(() => {
    jest.useRealTimers()
    delete navigator.clipboard
  })

  test('shows its code and its numbered caption, with no copy button by default', () => {
    render(<CodeBlock code="print('hi')" number={3} caption="A program." />)
    expect(screen.getByText("print('hi')")).toBeInTheDocument()
    expect(screen.getByText('Figure 3.')).toBeInTheDocument()
    expect(screen.getByText('A program.')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('copies its code, and says so for a moment', async () => {
    jest.useFakeTimers()
    const writeText = jest.fn(() => Promise.resolve())
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })
    render(<CodeBlock code="curl -s https://example.com" copy />)
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Copy' })))
    expect(writeText).toHaveBeenCalledWith('curl -s https://example.com')
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1200))
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  test('does nothing when the browser refuses to copy', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn(() => Promise.reject(new Error('denied'))) },
      configurable: true,
    })
    render(<CodeBlock code="x" copy />)
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Copy' })))
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })
})
