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
  'case-studies': lazy(() => import('@/app/pages/case-studies/page')),
  'case-studies/mcp-server': lazy(
    () => import('@/app/pages/case-studies/mcp-server/page')
  ),
  'case-studies/guardrails': lazy(
    () => import('@/app/pages/case-studies/guardrails/page')
  ),
  'case-studies/ai-coding-agents': lazy(
    () => import('@/app/pages/case-studies/ai-coding-agents/page')
  ),
  'case-studies/multi-tenancy': lazy(
    () => import('@/app/pages/case-studies/multi-tenancy/page')
  ),
  'case-studies/deploy': lazy(() => import('@/app/pages/case-studies/deploy/page')),
  'case-studies/api-contract': lazy(
    () => import('@/app/pages/case-studies/api-contract/page')
  ),
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
