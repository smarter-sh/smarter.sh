'use client'

import { useEffect, useRef } from 'react'
import 'glightbox/dist/css/glightbox.min.css'

// glightbox reads `window` when it's imported, so it is imported in the browser only, by the
// effect: the pages are also rendered in Node when the site is built (scripts/prerender.mjs).
const GlightBox = ({ children, href, ...other }) => {
  const ref = useRef(null)
  useEffect(() => {
    let instance = null
    let cancelled = false
    if (ref.current) {
      import('glightbox').then(({ default: glightbox }) => {
        if (cancelled) return
        instance = glightbox({
          openEffect: 'fade',
          closeEffect: 'fade',
        })
      })
    }
    return () => {
      cancelled = true
      instance?.destroy()
    }
  }, [ref])
  return (
    <a ref={ref} href={href} {...other} className={`glightbox ${other['className']}`}>
      {children}
    </a>
  )
}
export default GlightBox
