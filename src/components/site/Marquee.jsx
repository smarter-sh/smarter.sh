import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'

// An endless horizontal scroll of its items, with the theme's marquee animation. The items
// are drawn twice, the second copy hidden from screen readers, so that the loop is seamless.
const MarqueeRow = ({ items, render, reverse = false, className }) => (
  <div
    className={cn(
      'relative m-auto flex gap-8 overflow-hidden',
      reverse && 'marquee--reverse',
      className
    )}
  >
    {[false, true].map((hidden) => (
      <div
        key={String(hidden)}
        aria-hidden={hidden || undefined}
        className="marquee__group flex min-w-full flex-shrink-0 items-center justify-around gap-8"
      >
        {items.map((item, idx) => (
          <div key={idx}>{render(item)}</div>
        ))}
      </div>
    ))}
  </div>
)

// The logos of the vendors and platforms that Smarter works with.
export const LogoMarquee = ({ title, logos }) => (
  <section
    className="py-12"
    data-aos="fade-up"
    data-aos-easing="ease"
    data-aos-duration={800}
  >
    <div className="container">
      {title && (
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-default-400">
          {title}
        </p>
      )}
    </div>
    <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <MarqueeRow
        items={logos}
        render={(logo) => (
          <span className="flex items-center gap-3 px-4 text-default-300 transition-colors hover:text-white">
            <IconifyIcon icon={logo.icon} className="h-8 w-8" />
            <span className="whitespace-nowrap text-xl font-medium">{logo.label}</span>
          </span>
        )}
      />
    </div>
  </section>
)

// Two rows of large words, scrolling in opposite directions.
export const WordMarquee = ({ rows }) => (
  <section className="overflow-hidden py-14" aria-hidden="true">
    {rows.map((row, idx) => (
      <MarqueeRow
        key={idx}
        items={row}
        reverse={idx % 2 === 1}
        className={idx ? 'mt-6' : undefined}
        render={(word) => (
          <span
            className={cn(
              'whitespace-nowrap text-4xl font-medium lg:text-5xl',
              idx % 2
                ? 'text-transparent [-webkit-text-stroke:1px_rgb(234_88_12)]'
                : 'text-white'
            )}
          >
            {word}
          </span>
        )}
      />
    ))}
  </section>
)
