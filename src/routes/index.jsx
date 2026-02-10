import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

//pages
const Home = lazy(() => import('@/app/pages/home/page'))
const Cli = lazy(() => import('@/app/pages/cli/page'))
const About = lazy(() => import('@/app/pages/about/page'))
const TOS = lazy(() => import('@/app/pages/tos/page'))
const Privacy = lazy(() => import('@/app/pages/privacy/page'))
const Legal = lazy(() => import('@/app/pages/legal/page'))

//auth pages
const Login = lazy(() => import('@/app/auth/login/page'))
const LoginWithQr = lazy(() => import('@/app/auth/qr-login/page'))
const Register = lazy(() => import('@/app/auth/register/page'))
const ForgotPassword = lazy(() => import('@/app/auth/password-reset/page'))
const Logout = lazy(() => import('@/app/auth/logout/page'))
const Plans = lazy(() => import('@/app/pages/plans/page'))
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
    path: '/plans',
    name: 'Plans',
    element: <Plans />,
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
    name: 'Legal Information',
    element: <Legal />,
  }
]

const AuthPages = [
  {
    path: '/login',
    name: 'Login',
    element: <Login />,
  },
  {
    path: '/qr-login',
    name: 'Login with Qr',
    element: <LoginWithQr />,
  },
  {
    path: '/register',
    name: 'Register',
    element: <Register />,
  },
  {
    path: '/password-reset',
    name: 'ForgotPassword',
    element: <ForgotPassword />,
  },
  {
    path: '/logout',
    name: 'Logout',
    element: <Logout />,
  },
]
export const appRoutes = [...LandingPages, ...StaticPages, ...AuthPages]
