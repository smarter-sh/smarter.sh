'use client'

import { Fragment, useEffect } from 'react'
import Aos from 'aos'
import BackToTop from '../BackToTop'
import { useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
const AppProviders = ({ children }) => {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    Aos.init()
    import('preline/preline')
  }, [])
  // a new page opens at its top, or at the section that its url names, e.g. /#try-it.
  useEffect(() => {
    if (!hash) {
      window.scrollTo?.(0, 0)
      return
    }
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
    return () => clearTimeout(timer)
  }, [pathname, hash])
  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods) window.HSStaticMethods.autoInit()
    }, 400)
  }, [pathname])
  return (
    <Fragment>
      <HelmetProvider>
        {children}
        <BackToTop />
      </HelmetProvider>
    </Fragment>
  )
}
export default AppProviders
