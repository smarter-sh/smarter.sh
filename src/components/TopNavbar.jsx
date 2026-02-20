'use client'

import { useEffect, useRef } from 'react'
import Gumshoe from 'gumshoejs'
import IconifyIcon from './wrappers/IconifyIcon'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import useScrollEvent from '@/hooks/useScrollEvent'

const navLinks = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About',
    link: '/about',
  },
  {
    label: 'CLI',
    link: '/cli',
  },
  {
    label: 'Services',
    link: '/#services',
  },
  {
    label: 'Legal',
    link: '/legal',
  },
]


const TopNavbar = () => {
  const navRef = useRef(null)
  const { scrollY } = useScrollEvent()
  useEffect(() => {
    document.body.classList.add('bg-default-900')
    // Only initialize Gumshoe for in-page anchor links
    if (navRef.current) {
      // Select only <a> tags with href starting with '#'
      const anchorLinks = navRef.current.querySelectorAll('.navbar-nav a[href^="#"]')
      if (anchorLinks.length > 0) {
        new Gumshoe('.navbar-nav a[href^="#"]', {
          offset: 80,
        })
      }
    }
    return () => {
      document.body.classList.remove('bg-default-900')
    }
  }, [])
  return (
    <>
      <header id="navbar-sticky" className={`navbar ${scrollY >= 50 && 'nav-sticky'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav>
            <Link to="/" className="logo">
              <img src={logo} className="h-16" alt="Smarter" />
            </Link>
            <div className="ms-auto flex items-center px-2.5 lg:hidden">
              <button
                className="hs-collapse-toggle inline-flex h-9 w-12 items-center justify-center rounded-md border border-white/20 bg-default-100/5"
                type="button"
                id="hs-unstyled-collapse"
                data-hs-collapse="#mobileMenu"
                data-hs-type="collapse"
              >
                <IconifyIcon icon="lucide:menu" className="h-5 w-5 stroke-white" />
              </button>
            </div>
            <div
              ref={navRef}
              id="mobileMenu"
              className="hs-collapse mx-auto mt-2 hidden grow basis-full items-center justify-center transition-all duration-300 lg:mt-0 lg:flex lg:basis-auto"
            >
              <ul id="navbar-navlist" className="navbar-nav">
                {navLinks.map((item, idx) => (
                  <li key={item.link + idx} className="nav-item">
                    <a href={item.link} className="nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center border-t border-white/10 pt-4 lg:mt-0 lg:hidden lg:border-none lg:pt-0">
                <a
                  href="https://github.com/smarter-sh/smarter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="duration-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary-hover mr-2"
                >
                  <IconifyIcon icon="lucide:github" className="h-5 w-5" />
                  <span>smarter-sh/smarter</span>
                </a>
                <a
                  href="https://ubc.smarter.sh/dashboard/"
                  className="duration-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary-hover"
                >
                  <IconifyIcon icon="lucide:layout-dashboard" className="me-2 h-5 w-5" />{' '}
                  Platform
                </a>
              </div>
            </div>
            <div className="hidden items-center lg:flex">
              <div className="me-6 flex items-center">
                <a
                  href="https://github.com/smarter-sh/smarter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                >
                  <IconifyIcon icon="lucide:github" className="h-6 w-6" />
                  <span>smarter-sh/smarter</span>
                </a>
                <div className="ml-4 flex items-center gap-3">
                  <a
                    href="https://github.com/smarter-sh/smarter/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <img
                      src="https://img.shields.io/github/v/release/smarter-sh/smarter?style=flat&color=ea580c"
                      alt="Latest Release"
                    />
                  </a>
                  <a
                    href="https://github.com/smarter-sh/smarter/stargazers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <img
                      src="https://img.shields.io/github/stars/smarter-sh/smarter?style=flat&color=ea580c"
                      alt="GitHub Stars"
                    />
                  </a>
                  <a
                    href="https://github.com/smarter-sh/smarter/network/members"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <img
                      src="https://img.shields.io/github/forks/smarter-sh/smarter?style=flat&color=ea580c"
                      alt="GitHub Forks"
                    />
                  </a>
                </div>
              </div>
              <a
                href="https://ubc.smarter.sh/dashboard/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2 text-white transition-all duration-300 hover:bg-primary-hover"
              >
                <IconifyIcon icon="lucide:layout-dashboard" className="me-2 h-5 w-5" />{' '}
                Platform
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
export default TopNavbar
