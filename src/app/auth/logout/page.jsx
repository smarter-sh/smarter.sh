import AuthImage from '@/components/AuthImage'
import { Link } from 'react-router-dom'
import AuthHeader from '@/components/AuthHeader'
import logo from '@/assets/images/logo.png'
import logoSvg from '@/assets/images/logout.svg'
import AuthLayout from '@/components/AuthLayout'
import PageMetaData from '@/components/PageMetaData'
const Logout = () => {
  return (
    <>
      <PageMetaData title="Logout" />
      <AuthHeader />
      <AuthLayout>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-default-950/40 backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex h-full flex-col p-10 lg:ps-0">
              <div className="pb-10">
              </div>
              <div className="my-auto pb-6 text-center">
                <h4 className="mb-4 text-2xl font-bold text-white">See you Again!</h4>
                <p className="mx-auto mb-5 max-w-sm text-default-300">
                  You are now successfully sign out.
                </p>
                <div className="flex items-start justify-center">
                  <img src={logoSvg} alt="lo" className="h-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full text-center">
          <p className="text-base font-medium leading-6 text-default-300">
            Back to
            <Link to="/login" className="ms-1 font-semibold text-primary">
              Log In
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  )
}
export default Logout
