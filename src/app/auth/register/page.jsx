import AuthImage from '@/components/AuthImage'
import ThirdPartyLogin from '@/components/ThirdPartyLogin'
import { Link } from 'react-router-dom'
import AuthHeader from '@/components/AuthHeader'
import AuthLayout from '@/components/AuthLayout'
import PageMetaData from '@/components/PageMetaData'
const Register = () => {
  return (
    <>
      <PageMetaData title="Register" />
      <AuthHeader />
      <AuthLayout>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-default-200/60 backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <AuthImage />
            <div className="flex h-full flex-col p-10 lg:ps-0">
              <div className="pb6 my-auto">
                <h4 className="mb-4 text-2xl text-white">CREATE YOUR ACCOUNT</h4>
                <p className="text-white">Create your Smarter account today - it's quick and easy. A Smarter account gives you access to:</p>
                <ul className="mb-6 mt-3 list-inside list-disc text-white">
                  <li>Marketing benefit #1</li>
                  <li>Marketing benefit #2</li>
                  <li>Marketing benefit #3</li>
                </ul>
                <form action="#" className="text-start">
                  <div className="mb-4">
                    <input
                      className="block w-full rounded border-default-200 border-white/10 bg-white px-3 py-1.5 text-default-900 focus:border-white/25 focus:ring-transparent"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      className="block w-full rounded border-default-200 border-white/10 bg-white px-3 py-1.5 text-default-900 focus:border-white/25 focus:ring-transparent"
                      type="password"
                      required
                      id="password"
                      placeholder="Password"
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
                        href="/password-reset"
                        className="border-b border-dashed text-default-200"
                      >
                        <small>Forgot your password?</small>
                      </a>
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="bg-orange-500 hover:bg-orange-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                      type="submit"
                    >
                      <span className="fw-bold">Sign Up</span>
                    </button>
                  </div>
                </form>
              </div>
              <ThirdPartyLogin label="Or Continue with" />
            </div>
          </div>
        </div>
        <div className="mt-5 w-full text-center">
          <p className="text-base font-medium leading-6 text-default-300">
            Already have an account?
            <Link to="/login" className="ms-1 font-semibold text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  )
}
export default Register
