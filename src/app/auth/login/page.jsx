import AuthImage from '@/components/AuthImage'
import ThirdPartyLogin from '@/components/ThirdPartyLogin'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import AuthLayout from '@/components/AuthLayout'
import PageMetaData from '@/components/PageMetaData'
const Login = () => {
  return (
    <>
      <PageMetaData title="Login" />
      <AuthLayout>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-default-950/40 backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <AuthImage />
            <div className="flex h-full flex-col p-10 lg:ps-0">
              <div className="pb-10">
                <Link to="/" className="flex">
                  <img
                    src={logo}
                    width={124}
                    height={40}
                    alt="dark logo"
                    className="h-10"
                  />
                </Link>
              </div>
              <div className="pb6 my-auto">
                <h4 className="mb-4 text-2xl font-bold text-white">Get Started Now</h4>
                <p className="mb-8 max-w-sm text-default-300">
                  Enter your email address and password to access account.
                </p>
                <form action="#" className="text-start">
                  <div className="mb-4">
                    <label
                      htmlFor="emailaddress"
                      className="mb-2 block text-base/normal font-semibold text-default-200"
                    >
                      Email address
                    </label>
                    <input
                      className="block w-full rounded border-default-200 border-white/10 bg-transparent px-3 py-1.5 text-white/80 focus:border-white/25 focus:ring-transparent"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-base/normal font-semibold text-default-200"
                    >
                      Password
                    </label>
                    <input
                      className="block w-full rounded border-default-200 border-white/10 bg-transparent px-3 py-1.5 text-white/80 focus:border-white/25 focus:ring-transparent"
                      type="password"
                      required
                      id="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-y-1">
                      <div>
                        <input
                          type="checkbox"
                          className="text-primary-600 focus:border-primary-300 h-4 w-4 rounded border-white/20 bg-white/20 text-primary shadow-sm focus:ring focus:ring-primary/60 focus:ring-offset-0"
                          id="checkbox-signin"
                        />
                        <label
                          className="ms-2 align-middle text-default-200"
                          htmlFor="checkbox-signin"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="auth-forgotpw.html"
                        className="border-b border-dashed text-default-200"
                      >
                        <small>Forgot your password?</small>
                      </a>
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                      type="submit"
                    >
                      <span className="fw-bold">Sign In</span>{' '}
                    </button>
                  </div>
                </form>
              </div>
              <ThirdPartyLogin />
            </div>
          </div>
        </div>
        <div className="mt-5 w-full text-center">
          <p className="text-base font-medium leading-6 text-default-300">
            Don&apos;t have an account?{' '}
            <Link to="/auth/register" className="ms-1 font-semibold text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  )
}
export default Login
