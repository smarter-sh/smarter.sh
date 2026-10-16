import { cn } from '@/helpers/cn'
import { accent as accentOf } from '@/helpers/accent'

// A soft glow in a topic's color, behind a section or a hero.
export const Glow = ({ accent, className }) => (
  <div
    aria-hidden="true"
    className={cn(
      'pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[56rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl',
      accentOf(accent).glow,
      className
    )}
  />
)

// A page section with an optional eyebrow, title and introduction above its content, in the
// color of its topic (see helpers/accent.js). `glow` adds a soft glow of that color behind it.
const Section = ({
  id,
  eyebrow,
  title,
  intro,
  accent,
  glow = false,
  className,
  children,
}) => {
  return (
    <section
      id={id}
      className={cn('relative isolate py-16 lg:py-20', className)}
      data-aos="fade-up"
      data-aos-easing="ease"
      data-aos-duration={800}
    >
      {glow && <Glow accent={accent} />}
      <div className="container">
        {(eyebrow || title || intro) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && (
              <p
                className={cn(
                  'mb-3 text-sm font-semibold uppercase tracking-widest',
                  accentOf(accent).text
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mb-4 text-3xl font-medium text-white lg:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="text-lg text-default-200">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
export default Section
