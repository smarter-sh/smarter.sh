import { act, render, screen } from '@testing-library/react'
import { Contents } from './Teaching'

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
