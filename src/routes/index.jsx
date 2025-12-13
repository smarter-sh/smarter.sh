import { lazy } from 'react'

//pages
const Home = lazy(() => import('@/app/pages/home/page'))
const Cli = lazy(() => import('@/app/pages/cli/page'))
const About = lazy(() => import('@/app/pages/about/page'))

//auth pages
const Login = lazy(() => import('@/app/auth/login/page'))
const LoginWithQr = lazy(() => import('@/app/auth/qr-login/page'))
const LockScreen = lazy(() => import('@/app/auth/lock-screen/page'))
const Register = lazy(() => import('@/app/auth/register/page'))
const ForgotPassword = lazy(() => import('@/app/auth/password-reset/page'))
const Logout = lazy(() => import('@/app/auth/logout/page'))
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
    path: '/lock-screen',
    name: 'LockScreen',
    element: <LockScreen />,
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
