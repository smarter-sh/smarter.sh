import marketingImage from '@/assets/images/auth/marketing-image.svg'
const AuthImage = () => {
  return (
    <div className="hidden py-4 ps-4 lg:block">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <img src={marketingImage} alt="auth" className="h-full w-full" />
        <div className="absolute inset-0 bg-default-950/40">
          <div className="flex h-full items-end justify-center">
            <div className="p-6 text-start">
              <h5 className="mb-3 text-xl font-bold text-white">
                Tag line messaging, <br /> so scooby so dooby so do!
              </h5>
              <p className="text-base font-normal text-white">
                Try yadda yadda for free. Register and create your first
                AI resource, it's simple and fast.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AuthImage
