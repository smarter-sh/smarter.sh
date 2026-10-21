// The site's topic colors, in shades that read on the web console's light theme. Each topic keeps its color everywhere it appears, so that a reader
// can follow it from the landing page to its own page:
//   primary  the brand, Smarter itself          emerald  education and learning
//   sky      governance, safety and control     violet   extensibility and integrations
//   amber    developers and code                teal     operations and records
// Tailwind only generates the classes it finds written out, so every class is spelled in full.
export const accents = {
  primary: {
    text: 'text-primary',
    soft: 'bg-orange-50 text-primary',
    solid: 'bg-primary text-white',
    border: 'border-primary',
    borderStart: 'border-s-primary',
    borderSoft: 'border-primary/40',
    hoverBorder: 'hover:border-primary',
    glow: 'from-primary/10',
    ring: 'ring-primary/50',
    chip: 'border-orange-200 bg-orange-50',
  },
  emerald: {
    text: 'text-emerald-600',
    soft: 'bg-emerald-50 text-emerald-600',
    solid: 'bg-emerald-500 text-white',
    border: 'border-emerald-400',
    borderStart: 'border-s-emerald-400',
    borderSoft: 'border-emerald-400/40',
    hoverBorder: 'hover:border-emerald-400',
    glow: 'from-emerald-500/10',
    ring: 'ring-emerald-400/50',
    chip: 'border-emerald-200 bg-emerald-50',
  },
  sky: {
    text: 'text-sky-600',
    soft: 'bg-sky-50 text-sky-600',
    solid: 'bg-sky-500 text-white',
    border: 'border-sky-400',
    borderStart: 'border-s-sky-400',
    borderSoft: 'border-sky-400/40',
    hoverBorder: 'hover:border-sky-400',
    glow: 'from-sky-500/10',
    ring: 'ring-sky-400/50',
    chip: 'border-sky-200 bg-sky-50',
  },
  violet: {
    text: 'text-violet-600',
    soft: 'bg-violet-50 text-violet-600',
    solid: 'bg-violet-500 text-white',
    border: 'border-violet-400',
    borderStart: 'border-s-violet-400',
    borderSoft: 'border-violet-400/40',
    hoverBorder: 'hover:border-violet-400',
    glow: 'from-violet-500/10',
    ring: 'ring-violet-400/50',
    chip: 'border-violet-200 bg-violet-50',
  },
  amber: {
    text: 'text-amber-600',
    soft: 'bg-amber-50 text-amber-600',
    solid: 'bg-amber-500 text-default-950',
    border: 'border-amber-400',
    borderStart: 'border-s-amber-400',
    borderSoft: 'border-amber-400/40',
    hoverBorder: 'hover:border-amber-400',
    glow: 'from-amber-500/10',
    ring: 'ring-amber-400/50',
    chip: 'border-amber-200 bg-amber-50',
  },
  teal: {
    text: 'text-teal-600',
    soft: 'bg-teal-50 text-teal-600',
    solid: 'bg-teal-500 text-white',
    border: 'border-teal-400',
    borderStart: 'border-s-teal-400',
    borderSoft: 'border-teal-400/40',
    hoverBorder: 'hover:border-teal-400',
    glow: 'from-teal-500/10',
    ring: 'ring-teal-400/50',
    chip: 'border-teal-200 bg-teal-50',
  },
}

// The classes of an accent, or the brand's for an unknown one.
export const accent = (name) => accents[name] ?? accents.primary

// The order in which lists of things take colors, e.g. the chips of the AI resources.
export const accentCycle = ['primary', 'emerald', 'sky', 'violet', 'amber', 'teal']
