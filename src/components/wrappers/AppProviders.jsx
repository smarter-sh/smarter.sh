'use client'

import { Fragment, useEffect } from 'react'
import Aos from 'aos'
import BackToTop from '../BackToTop'
import { useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
const AppProviders = ({ children }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    Aos.init()
    import('preline/preline')
  }, [])
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
