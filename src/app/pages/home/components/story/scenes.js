import { clamp, rng } from './motion'

// The story's canvas scenes. Each one is make(width, height, options) => draw(ctx, t, dt), in css
// pixels, so that it lays itself out for the width it has. The colors are the story's (story.css).
const C = {
  bg: '#1e1f2b',
  deep: '#14151b',
  card: '#23252e',
  ink: '#ffffff',
  ink2: '#c9cad3',
  ink3: '#8d8fa0',
  dim: '#4a4d59',
  blue: '#4fa3ff',
  green: '#3dd68c',
  amber: '#f59e0b',
}
const FONT = 'Inter, "Segoe UI", Helvetica, Arial, sans-serif'

// The Smarter loop: a figure eight in the brand's orange draws itself, then people flow around it
// from learning to building to governing. The cover and the closing band show it.
export const loopScene = (W, H, { words }) => {
  const cx = W / 2
  const cy = H / 2
  const A = Math.min(W * 0.46, H * 0.9)
  const N = 320
  const r = rng(5)
  const at = (u) => {
    const t = u * Math.PI * 2
    const s = Math.sin(t)
    const c = Math.cos(t)
    const d = 1 + s * s
    return [cx + (A * c) / d, cy + (A * 1.5 * s * c) / d]
  }
  const pts = []
  for (let i = 0; i <= N; i++) pts.push(at(i / N))
  const people = []
  for (let k = 0; k < 44; k++)
    people.push({ u: r(), v: 0.035 + r() * 0.03, z: 1 + r() * 2 })
  const scale = A / 414
  const ribbon = (ctx, n, w, a) => {
    const g = ctx.createLinearGradient(cx - A, 0, cx + A, 0)
    g.addColorStop(0, '#f15a24')
    g.addColorStop(0.5, '#f7931e')
    g.addColorStop(1, '#ffc50c')
    ctx.strokeStyle = g
    ctx.lineWidth = w * scale
    ctx.globalAlpha = a
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const p = pts[(i + Math.round(N * 0.5)) % N]
      if (i) ctx.lineTo(p[0], p[1])
      else ctx.moveTo(p[0], p[1])
    }
    ctx.stroke()
    ctx.globalAlpha = 1
  }
  const word = (ctx, txt, x, y, col, a) => {
    ctx.globalAlpha = a
    ctx.font = `700 ${Math.round(clamp(40 * scale, 15, 40))}px ${FONT}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = col
    ctx.fillText(txt, x, y)
    ctx.globalAlpha = 1
    ctx.textAlign = 'left'
  }
  return (ctx, t, dt) => {
    const p = clamp((t - 0.3) / 2.4, 0, 1)
    const n = Math.round(N * (1 - Math.pow(1 - p, 3)))
    ctx.clearRect(0, 0, W, H)
    if (n > 1) {
      ribbon(ctx, n, 74, 0.1)
      ribbon(ctx, n, 44, 0.22)
      ribbon(ctx, n, 26, 1)
    }
    const a = clamp((t - 2.4) / 0.8, 0, 1)
    if (a <= 0) return
    for (const q of people) {
      q.u = (q.u + q.v * dt) % 1
      for (let k = 0; k < 7; k++) {
        const [x, y] = at((q.u - k * 0.004 + 1) % 1)
        ctx.globalAlpha = a * (1 - k / 7) * 0.95
        ctx.fillStyle = C.ink
        ctx.beginPath()
        ctx.arc(x, y, (2.4 + q.z * 1.3) * scale * (1 - k / 9), 0, 7)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
    word(ctx, words[0], cx - A * 0.58, cy, C.green, clamp((t - 2.6) / 0.6, 0, 1))
    word(ctx, words[1], cx, cy - A * 0.5, C.amber, clamp((t - 3.0) / 0.6, 0, 1))
    word(ctx, words[2], cx + A * 0.58, cy, C.blue, clamp((t - 3.4) / 0.6, 0, 1))
  }
}
