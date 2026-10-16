import { cn } from '@/helpers/cn'
import { accent as accentOf } from '@/helpers/accent'
import { Glow } from './Section'

// The opening of a page: an eyebrow, a title, a lead paragraph and calls to action, in the
// color of the page's topic. `highlight` is a part of the title drawn in the brand gradient.
const PageHero = ({ eyebrow, title, highlight, lead, accent, children }) => {
  return (
    <section
      className="relative isolate overflow-hidden pb-12 pt-36 lg:pb-16 lg:pt-44"
      data-aos="fade-up"
      data-aos-easing="ease"
      data-aos-duration={800}
    >
      <Glow accent={accent} className="top-16 h-96" />
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <span
              className={cn(
                'inline-block rounded-full border px-4 py-1 text-sm font-semibold uppercase tracking-widest',
                accentOf(accent).chip,
                accentOf(accent).text
              )}
            >
              {eyebrow}
            </span>
          )}
          <h1 className="mb-6 mt-6 text-4xl/tight font-medium text-default-100 lg:text-5xl/tight">
            {title}
            {highlight && (
              <>
                {' '}
                <span className="text-gradient">{highlight}</span>
              </>
            )}
          </h1>
          {lead && (
            <p className="mx-auto text-lg text-default-200 lg:max-w-3xl lg:text-xl">
              {lead}
            </p>
          )}
          {children && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default PageHero
