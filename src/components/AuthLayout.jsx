'use client'

import { currentYear } from '@/common/constants'
import Background2 from '@/components/Background2'
import { Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FallbackLoading from './FallbackLoading'
import { default as BaseFooter } from '@/components/Footer'
const AuthLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('bg-slate-900', 'relative', 'h-full')
    return () => {
      document.body.classList.remove('bg-slate-900', 'relative', 'h-full')
    }
  }, [])
  return (
    <>
      <Background2 />
      <section className="flex w-full items-center px-0 py-6 lg:h-screen lg:p-10">
        <div className="container">
          <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
        </div>
      </section>
      <footer>
        <BaseFooter />
      </footer>
    </>
  )
}
export default AuthLayout
