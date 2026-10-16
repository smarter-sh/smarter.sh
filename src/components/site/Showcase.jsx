import { cn } from '@/helpers/cn'
import { accent as accentOf } from '@/helpers/accent'
import { Glow } from './Section'

// A pill that floats over the edge of a showcase image.
const Callout = ({ children, className, colors }) => (
  <div
    className={cn(
      'absolute hidden rounded-full border bg-default-950/80 px-5 py-3 text-sm font-medium text-default-100 shadow-xl backdrop-blur-lg lg:block',
      colors.borderSoft,
      className
    )}
  >
    {children}
  </div>
)

// An image beside its text, from the theme's alternating feature rows, with callouts that
// float over the image's edges. `reverse` puts the image on the right.
const Showcase = ({
  eyebrow,
  title,
  image,
  alt,
  callouts = [],
  reverse = false,
  children,
  id,
  accent,
}) => {
  const colors = accentOf(accent)
  const positions = reverse
    ? ['-start-10 top-10', '-end-8 bottom-16']
    : ['-end-10 top-10', '-start-8 bottom-16']
  return (
    <section id={id} className="relative isolate py-16 lg:py-20">
      <Glow accent={accent} className="top-1/4 opacity-70" />
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div
            className={cn('relative', reverse && 'lg:order-2')}
            data-aos={reverse ? 'fade-left' : 'fade-right'}
            data-aos-easing="ease"
            data-aos-duration={900}
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <img src={image} alt={alt} className="w-full" loading="lazy" />
            </div>
            {callouts.map((text, idx) => (
              <Callout
                key={text}
                colors={colors}
                className={positions[idx % positions.length]}
              >
                {text}
              </Callout>
            ))}
          </div>
          <div
            data-aos={reverse ? 'fade-right' : 'fade-left'}
            data-aos-easing="ease"
            data-aos-duration={900}
          >
            {eyebrow && (
              <span
                className={cn(
                  'rounded-md px-3 py-1 text-sm font-medium uppercase tracking-wider',
                  colors.soft
                )}
              >
                {eyebrow}
              </span>
            )}
            <h2 className="mb-5 mt-5 text-3xl/snug font-medium text-white lg:text-4xl/snug">
              {title}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Showcase
