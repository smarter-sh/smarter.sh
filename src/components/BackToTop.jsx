'use client'

import useScrollEvent from '@/hooks/useScrollEvent'
import IconifyIcon from './wrappers/IconifyIcon'
const BackToTop = () => {
  const { scrollY } = useScrollEvent()
  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      id="back-to-top"
      className={`fixed bottom-5 end-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-center text-xl text-default-950 backdrop-blur-3xl transition-all hover:rounded-lg hover:bg-primary hover:text-white ${scrollY > 500 ? 'opacity-100' : 'opacity-0'}`}
    >
      <IconifyIcon icon="lucide:chevron-up" className="h-4 w-4" />
    </button>
  )
}
export default BackToTop
