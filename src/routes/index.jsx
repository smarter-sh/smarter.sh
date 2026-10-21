import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

//pages
const Home = lazy(() => import('@/app/pages/home/page'))
const Cli = lazy(() => import('@/app/pages/cli/page'))
const About = lazy(() => import('@/app/pages/about/page'))
const DeveloperResources = lazy(() => import('@/app/pages/developers/page'))
const TOS = lazy(() => import('@/app/pages/tos/page'))
const Privacy = lazy(() => import('@/app/pages/privacy/page'))
const Legal = lazy(() => import('@/app/pages/legal/page'))
const Partners = lazy(() => import('@/app/pages/partners/page'))
const Platform = lazy(() => import('@/app/pages/platform/page'))
const Education = lazy(() => import('@/app/pages/education/page'))
const Extensions = lazy(() => import('@/app/pages/extensions/page'))
const Integrations = lazy(() => import('@/app/pages/integrations/page'))
const Sdks = lazy(() => import('@/app/pages/sdks/page'))
const StackademyCaseStudy = lazy(() => import('@/app/pages/case-studies/stackademy/page'))

const LandingPages = [
  {
    path: '/',
    name: 'root',
    element: <Home />,
  },
  {
    path: '/home',
    name: 'Home',
    element: <Home />,
  },
]
const StaticPages = [
  {
    path: '/platform',
    name: 'Platform',
    element: <Platform />,
  },
  {
    path: '/education',
    name: 'Education',
    element: <Education />,
  },
  {
    path: '/extensions',
    name: 'Extensions',
    element: <Extensions />,
  },
  {
    path: '/integrations',
    name: 'Integrations',
    element: <Integrations />,
  },
  {
    path: '/sdks',
    name: 'SDKs',
    element: <Sdks />,
  },
  {
    path: '/case-studies/stackademy',
    name: 'Case Study: Stackademy',
    element: <StackademyCaseStudy />,
  },
  {
    path: '/cli',
    name: 'CLI',
    element: <Cli />,
  },
  {
    path: '/about',
    name: 'About',
    element: <About />,
  },
  {
    path: '/developers',
    name: 'Developers',
    element: <DeveloperResources />,
  },
  {
    path: '/tos',
    name: 'Terms of Service',
    element: <TOS />,
  },
  {
    path: '/terms-of-service/',
    element: <Navigate to="/tos" replace />,
  },
  {
    path: '/terms-of-service',
    element: <Navigate to="/tos" replace />,
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    element: <Privacy />,
  },
  {
    path: '/privacy-policy/',
    element: <Navigate to="/privacy" replace />,
  },
  {
    path: '/privacy-policy',
    element: <Navigate to="/privacy" replace />,
  },
  {
    path: '/legal',
    name: 'Legal',
    element: <Legal />,
  },
  {
    path: '/partners',
    name: 'Partners',
    element: <Partners />,
  },
]

export const appRoutes = [...LandingPages, ...StaticPages]
