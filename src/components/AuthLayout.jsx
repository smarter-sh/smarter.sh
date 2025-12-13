'use client'

import Background1 from '@/components/Background1'
import { Suspense, useEffect } from 'react'
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
      <Background1 />
      <section className="flex w-full px-0 py-6 lg:h-screen lg:p-10 font-sans">
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
