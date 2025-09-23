import authImg from '@/assets/images/ai/auth-img.jpg'
const AuthImage = () => {
  return (
    <div className="hidden py-4 ps-4 lg:block">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <img src={authImg} alt="auth" className="h-full w-full -scale-x-100 transform" />
        <div className="absolute inset-0 bg-default-950/40">
          <div className="flex h-full items-end justify-center">
            <div className="p-6 text-start">
              <h5 className="mb-3 text-xl font-bold text-white">
                Is the best way, <br /> to build your marketing strategy!
              </h5>
              <p className="text-base font-medium text-default-400">
                Try all paid functions for free. just register and create your first
                widget, it simple and fast.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AuthImage
