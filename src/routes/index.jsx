import { lazy } from 'react'

//pages
const Home = lazy(() => import('@/app/pages/home/page'))

//auth pages
const Login = lazy(() => import('@/app/auth/login/page'))
const LoginWithQr = lazy(() => import('@/app/auth/qr-login/page'))
const LockScreen = lazy(() => import('@/app/auth/lock-screen/page'))
const Register = lazy(() => import('@/app/auth/register/page'))
const ForgotPassword = lazy(() => import('@/app/auth/forgot-pw/page'))
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
const AuthPages = [
  {
    path: '/auth/login',
    name: 'Login',
    element: <Login />,
  },
  {
    path: '/auth/qr-login',
    name: 'Login with Qr',
    element: <LoginWithQr />,
  },
  {
    path: '/auth/lock-screen',
    name: 'LockScreen',
    element: <LockScreen />,
  },
  {
    path: '/auth/register',
    name: 'Register',
    element: <Register />,
  },
  {
    path: '/auth/forgot-pw',
    name: 'ForgotPassword',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    element: <Logout />,
  },
]
export const appRoutes = [...LandingPages, ...AuthPages]
