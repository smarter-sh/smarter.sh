import GlightBox from '@/components/GlightBox'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
const Hero = () => {
  return (
    <section
      id="about-hero"
      className="relative overflow-hidden pb-20 pt-40"
      data-aos="zoom-out"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="-z-1 absolute start-80 top-1/2 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none bg-primary/10" />
      <div className="-z-1 absolute end-80 top-1/2 h-14 w-14 animate-ping rounded-full bg-primary/20" />
      <div className="container">
        <div className="text-center">
          <div className="mt-6 flex justify-center">
            <div className="max-w-2xl">
              <h1 className="mb-6 text-5xl/tight font-medium text-default-100">
                About Smarter
              </h1>
              <p className="text-lg text-gray-400">
                The story, inspiration, and goals behind the Smarter project—making AI and LLM tools accessible for everyone, from classrooms to the cloud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
