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

// People already build with AI, as on the pitch deck's second slide: dots light up one by one,
// every 0.15 seconds, each with a ripple, outside the corner that IT knows about, and six of them
// are named as they light. When the last one is lit, the corner is outlined and onDone is called,
// once. finished draws the end state at once, for a visitor who has seen it play.
export const gridScene = (W, H, { labels, known, rest, finished, onDone }) => {
  const COLS = Math.max(10, Math.round(W / 40))
  const ROWS = Math.max(7, Math.round(H / 52))
  const dx = W / COLS
  const dy = H / ROWS
  const r = rng(11)
  const narrow = W < 560
  const dots = []
  for (let j = 0; j < ROWS; j++)
    for (let i = 0; i < COLS; i++)
      dots.push({ x: dx * (i + 0.5), y: dy * (j + 0.5), ok: i < 3 && j < 2 })
  // the named dots, placed by fraction so that they land in the same places at any width
  const named = (narrow ? labels.slice(0, 4) : labels).map((l) => {
    const i = Math.min(COLS - 1, Math.round(l.x * (COLS - 1)))
    // rows 0 and 1 hold the corner that IT knows about, and its labels, at the left
    const top = i < COLS / 2 ? 2 : 1
    const j = Math.min(ROWS - 1, Math.max(top, Math.round(l.y * (ROWS - 1))))
    return { ...l, k: j * COLS + i }
  })
  const namedIdx = named.map((l) => l.k)
  const pool = dots
    .map((d, k) => k)
    .filter((k) => !dots[k].ok && !namedIdx.includes(k) && k >= COLS)
  for (let k = pool.length - 1; k > 0; k--) {
    const q = Math.floor(r() * (k + 1))
    ;[pool[k], pool[q]] = [pool[q], pool[k]]
  }
  // the deck lights 58 dots of its 312, and names six of them at these places in the order
  const order = pool.slice(0, Math.min(58, Math.round(pool.length * 0.19)))
  const namedAt = [2, 7, 13, 20, 28, 37]
  named.forEach((l, n) => order.splice(Math.min(namedAt[n], order.length), 0, l.k))
  const litAt = new Map(order.map((k, n) => [k, 0.9 + n * 0.15]))
  const done = 0.9 + order.length * 0.15 + 0.8
  let told = false
  const fontSize = narrow ? 12 : 15
  const pill = (ctx, x, y, txt, a, left) => {
    ctx.font = `600 ${fontSize}px ${FONT}`
    const w = ctx.measureText(txt).width + 22
    // a label points the other way when it wouldn't fit, and stays inside the canvas
    let px = left ? x - 12 - w : x + 12
    if (!left && px + w > W - 2) px = x - 12 - w
    if (left && px < 2) px = x + 12
    px = clamp(px, 2, Math.max(2, W - w - 2))
    ctx.globalAlpha = a
    ctx.fillStyle = C.card
    ctx.strokeStyle = C.amber
    ctx.lineWidth = 1.25
    ctx.beginPath()
    ctx.roundRect(px, y - fontSize, w, fontSize * 2, 8)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = C.ink
    ctx.textBaseline = 'middle'
    ctx.fillText(txt, px + 11, y + 1)
    ctx.globalAlpha = 1
  }
  const rad = Math.min(dx, dy) * 0.16
  return (ctx, now) => {
    const t = finished ? now + 60 : now
    if (!told && t >= done) {
      told = true
      onDone?.()
    }
    const a1 = clamp((t - done) / 0.7, 0, 1)
    ctx.clearRect(0, 0, W, H)
    dots.forEach((d, k) => {
      const at = litAt.get(k)
      if (d.ok && a1 > 0) {
        ctx.fillStyle = C.blue
        ctx.globalAlpha = 0.35 + 0.65 * a1
        ctx.beginPath()
        ctx.arc(d.x, d.y, rad * 1.5, 0, 7)
        ctx.fill()
        ctx.globalAlpha = 1
        return
      }
      if (at !== undefined && t >= at) {
        const age = t - at
        if (age < 0.7) {
          ctx.strokeStyle = C.amber
          ctx.globalAlpha = 1 - age / 0.7
          ctx.lineWidth = 1.25
          ctx.beginPath()
          ctx.arc(d.x, d.y, rad * 1.6 + age * 22, 0, 7)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
        ctx.fillStyle = C.amber
        ctx.beginPath()
        ctx.arc(d.x, d.y, rad * 1.5, 0, 7)
        ctx.fill()
      } else {
        ctx.fillStyle = C.dim
        ctx.beginPath()
        ctx.arc(d.x, d.y, rad, 0, 7)
        ctx.fill()
      }
    })
    named.forEach((l) => {
      const at = litAt.get(l.k)
      const d = dots[l.k]
      if (t >= at + 0.15)
        pill(ctx, d.x, d.y, l.text, clamp((t - at - 0.15) / 0.4, 0, 1), l.left)
    })
    if (a1 > 0) {
      ctx.globalAlpha = a1
      ctx.strokeStyle = C.blue
      ctx.lineWidth = 1.5
      ctx.setLineDash([6, 6])
      ctx.beginPath()
      ctx.roundRect(3, 3, dx * 3 - 3, dy * 2 - 5, 8)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.font = `700 ${fontSize}px ${FONT}`
      ctx.textBaseline = 'middle'
      const bw = Math.max(ctx.measureText(known).width, ctx.measureText(rest).width) + 20
      ctx.fillStyle = C.bg
      ctx.fillRect(dx * 3 + 3, 2, bw, dy * 2 - 4)
      ctx.fillStyle = C.blue
      ctx.fillText(known, dx * 3 + 12, dy * 0.56)
      ctx.fillStyle = C.amber
      ctx.fillText(rest, dx * 3 + 12, dy * 1.38)
      ctx.globalAlpha = 1
    }
  }
}

// Three ways to respond, as on the pitch deck's fourth slide: people (dots) move left to right,
// wandering with no support (mode 0), stopped or slipping around a wall (mode 1), or funneled
// through one governed lane that opens out into live service (mode 2). getMode is read on every
// frame.
export const flowScene = (W, H, { getMode, labels }) => {
  const cy = H / 2
  const r = rng(7)
  const lane = Math.min(36, H * 0.09)
  const hw = (x) => {
    if (x <= W * 0.6) return lane
    const u = (x - W * 0.6) / (W * 0.4)
    return lane + lane * 1.6 * (1 - (1 - u) * (1 - u))
  }
  const wallX = W * 0.47
  const gateX = W * 0.6
  const laneX = W * 0.3
  const speed = Math.max(W / 1680, 0.45)
  const fontSize = W < 560 ? 11 : 14
  const P = []
  const count = Math.round(clamp(W / 7, 50, 170))
  for (let k = 0; k < count; k++)
    P.push({
      x: r() * W,
      y: 24 + r() * (H - 48),
      s: (70 + r() * 80) * speed,
      a: (r() - 0.5) * 0.8,
      stuck: r() < 0.4,
      q: r(),
      lane: (k % 3) - 1,
      c: C.amber,
    })
  let mode = -1
  let mt = 0
  const label = (ctx, txt, x, y, col, align) => {
    ctx.font = `700 ${fontSize}px ${FONT}`
    ctx.textAlign = align || 'left'
    ctx.textBaseline = 'middle'
    const w = ctx.measureText(txt).width
    ctx.fillStyle = C.deep
    const bx = align === 'right' ? x - w - 6 : align === 'center' ? x - w / 2 - 6 : x - 6
    ctx.fillRect(bx, y - fontSize * 0.8, w + 12, fontSize * 1.6)
    ctx.fillStyle = col
    ctx.fillText(txt, x, y)
    ctx.textAlign = 'left'
  }
  return (ctx, t, dt) => {
    const m = getMode()
    if (m !== mode) {
      mode = m
      mt = 0
      ctx.fillStyle = C.deep
      ctx.fillRect(0, 0, W, H)
    }
    mt += dt
    const a = clamp(mt / 0.8, 0, 1)
    ctx.fillStyle = 'rgba(20,21,27,.2)'
    ctx.fillRect(0, 0, W, H)
    if (mode === 1) {
      ctx.fillStyle = C.ink3
      ctx.globalAlpha = a
      ctx.beginPath()
      ctx.roundRect(wallX - 5, H * 0.13, 10, H * 0.74, 5)
      ctx.fill()
      ctx.globalAlpha = 1
    }
    if (mode === 2) {
      const x1 = laneX + (W - laneX) * a
      const xs = []
      for (let x = laneX; x < x1; x += 14) xs.push(x)
      xs.push(x1)
      ctx.fillStyle = '#1a2536'
      ctx.beginPath()
      xs.forEach((x, i) => (i ? ctx.lineTo(x, cy - hw(x)) : ctx.moveTo(x, cy - hw(x))))
      for (let i = xs.length - 1; i >= 0; i--) ctx.lineTo(xs[i], cy + hw(xs[i]))
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = C.blue
      ctx.globalAlpha = 0.7
      ctx.lineWidth = 2
      ;[-1, 1].forEach((sg) => {
        ctx.beginPath()
        xs.forEach((x, i) =>
          i ? ctx.lineTo(x, cy + sg * hw(x)) : ctx.moveTo(x, cy + sg * hw(x))
        )
        ctx.stroke()
      })
      ctx.globalAlpha = 1
      if (x1 > gateX) {
        ctx.fillStyle = C.ink
        ctx.beginPath()
        ctx.roundRect(gateX - 4, cy - lane * 1.7, 8, lane * 3.4, 4)
        ctx.fill()
      }
    }
    for (const p of P) {
      let vx = p.s
      let vy = 0
      if (mode === 0 || (mode === 1 && p.x >= wallX - 12)) {
        p.a = clamp(p.a + (r() - 0.5) * 0.45, -1, 1)
        vx = p.s * Math.cos(p.a)
        vy = p.s * 1.2 * Math.sin(p.a)
        p.c = C.amber
      } else if (mode === 1) {
        if (p.stuck) {
          const stop = wallX - 30 - p.q * W * 0.15
          vx = p.s * clamp((stop - p.x) / 140, 0, 1)
          vy = Math.sin(t * 2.5 + p.q * 30) * 6
          p.c = vx < 12 ? C.ink3 : C.amber
        } else {
          const gap = p.y < cy ? 22 : H - 22
          const k = clamp(1 - (wallX - p.x) / (W * 0.27), 0, 1)
          vy = (gap - p.y) * k * 2.6
          vx = p.s * (1 - 0.3 * k) + 20
          p.c = C.amber
        }
      } else if (p.x < laneX) {
        const u = clamp(p.x / laneX, 0, 1)
        vy = (cy + p.lane * lane * 0.8 - p.y) * (0.15 + 3.4 * u * u)
        p.c = C.amber
      } else if (p.x < gateX) {
        vy = (cy + p.lane * lane * 0.5 - p.y) * 5
        p.c = C.blue
      } else {
        vy = (cy + (p.q * 2 - 1) * hw(p.x) * 0.8 - p.y) * 5
        vx = 150 * speed
        p.c = C.green
      }
      p.x += vx * dt
      p.y += vy * dt
      if (p.y < 10) {
        p.y = 10
        p.a = Math.abs(p.a)
      }
      if (p.y > H - 10) {
        p.y = H - 10
        p.a = -Math.abs(p.a)
      }
      if (p.x > W + 8) {
        p.x = -8
        p.y = 24 + r() * (H - 48)
        p.a = (r() - 0.5) * 0.8
        p.stuck = r() < 0.4
        p.q = r()
      }
      ctx.fillStyle = p.c
      ctx.beginPath()
      ctx.arc(p.x, p.y, mode === 2 && p.x > laneX ? 4.2 : 3.6, 0, 7)
      ctx.fill()
    }
    ctx.globalAlpha = a
    const top = fontSize * 1.6
    if (mode === 0) label(ctx, labels.noRecord, W - 12, top, C.amber, 'right')
    if (mode === 1) {
      label(ctx, labels.banned, wallX, top, C.ink2, 'center')
      label(ctx, labels.stopped, wallX - W * 0.2, cy, C.ink3, 'center')
      label(ctx, labels.around, wallX + 16, H - top, C.amber)
    }
    if (mode === 2) {
      label(ctx, labels.onePlace, laneX + 8, cy - lane * 1.9, C.blue)
      if (mt > 0.5) {
        label(ctx, labels.rules, gateX, cy + lane * 2.4, C.ink, 'center')
        label(ctx, labels.live, W - 12, top, C.green, 'right')
      }
    }
    ctx.globalAlpha = 1
  }
}
