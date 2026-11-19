'use client'

import { useEffect, useRef, useState } from 'react'
import Gumshoe from 'gumshoejs'
import IconifyIcon from './wrappers/IconifyIcon'
import { Link, useLocation } from 'react-router-dom'
import SmartLink from './site/SmartLink'
import NavDropdown from './NavDropdown'
import { BLOG, QUICK_START } from '@/common/constants'
import logo from '@/assets/images/logo.png'
import useScrollEvent from '@/hooks/useScrollEvent'

const navLinks = [
  { label: 'Platform', link: '/platform' },
  { label: 'Education', link: '/education' },
  { label: 'Case Studies', link: '/case-studies' },
  // A menu, not a page: building on Smarter. The /developers page, which is about
  // contributing to Smarter itself, is the panel's footer link.
  {
    label: 'Developers',
    items: [
      {
        label: 'Integrations',
        link: '/integrations',
        icon: 'lucide:plug',
        description: 'Put an assistant on WordPress, Shopify, Docusaurus and more.',
      },
      {
        label: 'Plugins',
        link: '/plugins',
        icon: 'lucide:file-code-2',
        description: 'Wire up tool calls to a database, an API or the web, in YAML.',
      },
      {
        label: 'Extensions',
        link: '/extensions',
        icon: 'lucide:puzzle',
        description: 'Plugins, Python extensions and MCP servers, all governed.',
      },
      {
        label: 'SDKs',
        link: '/sdks',
        icon: 'lucide:code',
        description: 'Python, Node.js and Go SDKs, the CLI and the OpenAPI contract.',
      },
    ],
    footer: {
      label: 'Contribute to Smarter',
      link: '/developers',
      description: 'Source code, developer guides and help.',
    },
  },
  // the project's own blog, in this tab
  { label: 'Blog', link: BLOG, newTab: false },
]

const TopNavbar = () => {
  const navRef = useRef(null)
  const { scrollY } = useScrollEvent()
  const { pathname } = useLocation()
  // the menu's open state below the lg breakpoint, where it collapses behind a button
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
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
  }, [])
  return (
    <>
      <header id="navbar-sticky" className={`navbar ${scrollY >= 50 && 'nav-sticky'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav>
            <Link to="/" className="logo shrink-0">
              <img src={logo} className="h-16" alt="Smarter" />
            </Link>
            <div className="ms-auto flex items-center px-2.5 lg:hidden">
              <button
                className="inline-flex h-9 w-12 items-center justify-center rounded-md border border-keen-300 bg-white"
                type="button"
                aria-label="Menu"
                aria-controls="mobileMenu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <IconifyIcon icon="lucide:menu" className="h-5 w-5 text-keen-700" />
              </button>
            </div>
            <div
              ref={navRef}
              id="mobileMenu"
              className={`mx-auto mt-2 ${
                menuOpen ? 'block' : 'hidden'
              } grow basis-full items-center justify-center transition-all duration-300 lg:mt-0 lg:flex lg:basis-auto`}
            >
              <ul id="navbar-navlist" className="navbar-nav">
                {navLinks.map((item, idx) =>
                  item.items ? (
                    <NavDropdown key={item.label} {...item} />
                  ) : (
                    <li
                      key={item.link + idx}
                      className={`nav-item ${
                        pathname.startsWith(item.link) ? 'active' : ''
                      }`}
                    >
                      <SmartLink
                        href={item.link}
                        newTab={item.newTab}
                        className="nav-link"
                      >
                        {item.label}
                      </SmartLink>
                    </li>
                  )
                )}
              </ul>
              <div className="mt-4 flex items-center border-t border-keen-200 pt-4 lg:mt-0 lg:hidden lg:border-none lg:pt-0">
                <a
                  href={QUICK_START}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary/80"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/smarter-sh/smarter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-keen-700 hover:text-primary"
                >
                  <IconifyIcon icon="lucide:github" className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
            <div className="hidden items-center gap-4 lg:flex xl:gap-5">
              <a
                href="https://github.com/smarter-sh/smarter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Smarter on GitHub"
                className="text-keen-700 transition-colors hover:text-primary"
              >
                <IconifyIcon icon="lucide:github" className="h-6 w-6" />
              </a>
              <a
                href={QUICK_START}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary/80 xl:px-5"
              >
                Get started
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
export default TopNavbar
