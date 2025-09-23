import { currency } from '@/common/constants'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { pricingPlans } from '../data'
const PricingCard = ({ plan }) => {
  const { description, features, name, price } = plan
  return (
    <div className="rounded-lg border border-white/10 bg-default-950/40 backdrop-blur-3xl">
      <div className="p-6">
        <h1 className="text-xl font-medium capitalize text-default-100 lg:text-2xl">
          {name}
        </h1>
        <p className="mt-4 text-default-300">{description}</p>
        <h2 className="mt-4 text-2xl font-semibold text-default-200 sm:text-3xl">
          {currency}
          {price} <span className="text-base font-medium">/Month</span>
        </h2>
        <p className="mt-1 text-default-300">Monthly payment</p>
        <button className="mt-6 w-full transform rounded-md bg-primary/20 px-4 py-2 capitalize tracking-wide text-primary transition-colors duration-300 hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none">
          Start Now
        </button>
      </div>
      <hr className="border-white/10" />
      <div className="p-6">
        <h1 className="text-lg font-medium capitalize text-white lg:text-xl">
          What’s included:
        </h1>
        <div className="mt-8 space-y-4">
          {features.map((feature, idx) => (
            <div className="flex items-center gap-4" key={idx}>
              <IconifyIcon
                icon={feature.icon}
                className={cn('h-5 w-5', feature.variant)}
              />
              <span className="text-default-300">{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const Pricing = () => {
  return (
    <section id="price" className="py-20">
      <div className="container">
        <div className="gap-10 lg:flex">
          <div
            className="mb-10 flex flex-col items-center lg:ms-0 xl:items-start"
            data-aos="fade-right"
            data-aos-easing="ease"
            data-aos-duration={1000}
          >
            <h1 className="text-2xl font-medium capitalize text-white lg:text-3xl">
              Our Pricing Plan
            </h1>
            <div className="mt-2">
              <span className="inline-block h-1 w-40 rounded-full bg-primary" />
              <span className="mx-1 inline-block h-1 w-3 rounded-full bg-primary" />
              <span className="inline-block h-1 w-1 rounded-full bg-primary" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className="text-base text-white">Monthly</span>
              <label
                htmlFor="pricing-input"
                className="relative inline-flex cursor-pointer items-center"
              >
                <input type="checkbox" id="pricing-input" className="peer sr-only" />
                <span className="h-4 w-11 rounded-full bg-default-700 after:absolute after:left-[2px] after:top-1/2 after:h-5 after:w-5 after:-translate-y-1/2 after:rounded-full after:border after:border-default-950 after:bg-primary after:ring-2 after:ring-primary after:ring-offset-2 after:ring-offset-default-950 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-default-950" />
              </label>
              <span className="text-base text-white">Yearly</span>
            </div>
            <p className="mb-6 mt-4 font-medium text-default-200">
              You can get All Access by selecting your plan!
            </p>
            <a
              href="#"
              className="group relative inline-flex items-center gap-2 text-primary"
            >
              <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w-full" />
              Select &amp; try{' '}
              <IconifyIcon icon="lucide:move-right" className="h-4 w-4" />
            </a>
          </div>
          <div
            className="flex-1"
            data-aos="fade-left"
            data-aos-easing="ease"
            data-aos-duration={1000}
          >
            <div className="flex flex-col items-center justify-center gap-x-4 gap-y-8 md:flex-row">
              {pricingPlans.map((plan, idx) => (
                <PricingCard plan={plan} key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Pricing
