import { Link } from 'react-router-dom'
import qrCode from '@/assets/images/ai/code-qr.png'
import AuthHeader from '@/components/AuthHeader'
import ThirdPartyLogin from '@/components/ThirdPartyLogin'
import AuthLayout from '@/components/AuthLayout'
import PageMetaData from '@/components/PageMetaData'
const QrLogin = () => {
  return (
    <>
      <PageMetaData title="Login With Qr" />
        <AuthHeader />
      <AuthLayout>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-default-950/40 backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="hidden py-4 ps-4 lg:block">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-default-950/40">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex h-44 w-44 items-center justify-center rounded-md bg-white/30 backdrop-blur-3xl">
                        <img
                          src={qrCode}
                          width={160}
                          height={160}
                          className="mx-auto h-40 rounded-xl"
                          alt="qr-code"
                        />
                      </div>
                      <h5 className="mb-3 mt-5 text-xl font-bold text-white">
                        Login with QR code.
                      </h5>
                      <p className="text-base font-medium text-default-200">
                        Scan this with the mobile app to login instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col p-10 lg:ps-0">
              <div className="pb6 my-auto">
                <h4 className="mb-4 text-2xl font-bold text-white">Login</h4>
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
                      <Link
                        to="/password-reset"
                        className="border-b border-dashed text-default-200"
                      >
                        <small>Forgot your password?</small>
                      </Link>
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                      type="submit"
                    >
                      <span className="fw-bold">Sign In</span>
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
            Don&apos;t have an account?
            <Link to="/register" className="ms-1 font-semibold text-primary">
              Register
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  )
}
export default QrLogin
