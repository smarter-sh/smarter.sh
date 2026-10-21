import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { pages, redirects } from './pages'

// each page's component, by its folder in src/app/pages. A page is added in src/routes/pages.js,
// which also puts it in the sitemap, and here.
const components = {
  home: lazy(() => import('@/app/pages/home/page')),
  platform: lazy(() => import('@/app/pages/platform/page')),
  education: lazy(() => import('@/app/pages/education/page')),
  extensions: lazy(() => import('@/app/pages/extensions/page')),
  integrations: lazy(() => import('@/app/pages/integrations/page')),
  sdks: lazy(() => import('@/app/pages/sdks/page')),
  'case-studies/stackademy': lazy(
    () => import('@/app/pages/case-studies/stackademy/page')
  ),
  cli: lazy(() => import('@/app/pages/cli/page')),
  about: lazy(() => import('@/app/pages/about/page')),
  developers: lazy(() => import('@/app/pages/developers/page')),
  tos: lazy(() => import('@/app/pages/tos/page')),
  privacy: lazy(() => import('@/app/pages/privacy/page')),
  legal: lazy(() => import('@/app/pages/legal/page')),
  partners: lazy(() => import('@/app/pages/partners/page')),
}

const pageRoutes = pages.map(({ path, name, page }) => {
  const Page = components[page]
  return { path, name, element: <Page /> }
})

const redirectRoutes = redirects.map(({ path, to }) => ({
  path,
  element: <Navigate to={to} replace />,
}))

export const appRoutes = [...pageRoutes, ...redirectRoutes]
