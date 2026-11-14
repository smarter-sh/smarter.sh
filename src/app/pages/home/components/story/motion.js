import { useEffect, useRef, useState } from 'react'

// The story's animations start when a slide scrolls into view, and its canvases draw only while
// they are on screen. Where IntersectionObserver is missing (Jest's jsdom, very old browsers),
// every slide shows its finished state and no canvas draws.
export const canAnimate =
  typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function'

const reducedQuery = '(prefers-reduced-motion: reduce)'
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(reducedQuery).matches

// Whether the visitor asked their system for less motion. Timed sequences jump to their end.
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(prefersReduced)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const query = window.matchMedia(reducedQuery)
    const onChange = () => setReduced(query.matches)
    query.addEventListener?.('change', onChange)
    return () => query.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

// seen: the element has been on screen at least once (entrances play once). visible: it is on
// screen now (loops and timers run only then).
export const useInView = (threshold = 0.25) => {
  const ref = useRef(null)
  const [state, setState] = useState({ seen: !canAnimate, visible: !canAnimate })
  useEffect(() => {
    const el = ref.current
    if (!canAnimate || !el) return
    const observer = new window.IntersectionObserver(
      ([entry]) =>
        setState((prev) => ({
          seen: prev.seen || entry.isIntersecting,
          visible: entry.isIntersecting,
        })),
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, state]
}

// Runs a canvas scene while running is true. makeScene(width, height) returns a draw(ctx, t, dt)
// function in css pixels; it is made again when the canvas changes size, so that every scene lays
// itself out for the width it has, from a phone to a wide screen.
export const useCanvasScene = (makeScene, running) => {
  const ref = useRef(null)
  const makeRef = useRef(makeScene)
  makeRef.current = makeScene
  useEffect(() => {
    const canvas = ref.current
    if (!canAnimate || !running || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let draw = null
    let start = performance.now()
    let last = start
    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw = makeRef.current(w, h)
    }
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (draw) draw(ctx, (now - start) / 1000, dt)
      raf = requestAnimationFrame(frame)
    }
    layout()
    const resize =
      typeof ResizeObserver === 'function' ? new ResizeObserver(() => layout()) : null
    resize?.observe(canvas)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      resize?.disconnect()
    }
  }, [running])
  return ref
}

// A seeded random number generator, so that a scene looks the same on every visit.
export const rng = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Moves through count steps every ms milliseconds while running, until the visitor picks one.
export const useAutoStep = (count, ms, running) => {
  const [step, setStep] = useState(0)
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (!running || held || !canAnimate) return
    const id = setInterval(() => setStep((s) => (s + 1) % count), ms)
    return () => clearInterval(id)
  }, [count, ms, running, held])
  const pick = (s) => {
    setHeld(true)
    setStep(s)
  }
  return [step, pick]
}
