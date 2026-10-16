import { COMMUNITY, QUICK_START } from '@/common/constants'
import Button from './Button'

// The closing call to action of a page.
const CtaBand = ({
  title = 'Start with a pilot, decide with your own data',
  text = 'Install Smarter yourself and run it for one quarter with a small cohort of your own staff. Leadership reviews real costs, usage and the audit trail before deciding how far to scale.',
  children,
}) => {
  return (
    <section
      className="py-16"
      data-aos="fade-up"
      data-aos-easing="ease"
      data-aos-duration={800}
    >
      <div className="container">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-primary/30 via-default-950/60 to-amber-500/20 p-8 text-center backdrop-blur-3xl md:p-14">
          <h2 className="mb-4 text-3xl font-medium text-white">{title}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-default-200">{text}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {children ?? (
              <>
                <Button href={QUICK_START} icon="lucide:rocket">
                  Get started
                </Button>
                <Button href={COMMUNITY} variant="secondary" icon="lucide:users">
                  Join the community
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default CtaBand
