'use client'

import { currentYear } from '@/common/constants'
import Background2 from '@/components/Background2'
import { Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FallbackLoading from './FallbackLoading'
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
      <footer className="bottom-0 end-0 start-0 py-3 2xl:fixed">
        <div className="container">
          <p className="text-center text-base font-medium text-default-200">
            {currentYear} © Smarter -{' '}
            <Link to="">Design &amp; Crafted ❤️ by Coderthemes</Link>
          </p>
        </div>
      </footer>
    </>
  )
}
export default AuthLayout
