// The site's topic colors. Each topic keeps its color everywhere it appears, so that a reader
// can follow it from the landing page to its own page:
//   primary  the brand, Smarter itself          emerald  education and learning
//   sky      governance, safety and control     violet   extensibility and integrations
//   amber    developers and code                teal     operations and records
// Tailwind only generates the classes it finds written out, so every class is spelled in full.
export const accents = {
  primary: {
    text: 'text-primary',
    soft: 'bg-primary/15 text-primary',
    solid: 'bg-primary text-white',
    border: 'border-primary',
    borderSoft: 'border-primary/40',
    hoverBorder: 'hover:border-primary',
    glow: 'from-primary/25',
    ring: 'ring-primary/50',
    chip: 'border-primary/40 bg-primary/10',
  },
  emerald: {
    text: 'text-emerald-400',
    soft: 'bg-emerald-500/15 text-emerald-400',
    solid: 'bg-emerald-500 text-white',
    border: 'border-emerald-400',
    borderSoft: 'border-emerald-400/40',
    hoverBorder: 'hover:border-emerald-400',
    glow: 'from-emerald-500/25',
    ring: 'ring-emerald-400/50',
    chip: 'border-emerald-400/40 bg-emerald-500/10',
  },
  sky: {
    text: 'text-sky-400',
    soft: 'bg-sky-500/15 text-sky-400',
    solid: 'bg-sky-500 text-white',
    border: 'border-sky-400',
    borderSoft: 'border-sky-400/40',
    hoverBorder: 'hover:border-sky-400',
    glow: 'from-sky-500/25',
    ring: 'ring-sky-400/50',
    chip: 'border-sky-400/40 bg-sky-500/10',
  },
  violet: {
    text: 'text-violet-400',
    soft: 'bg-violet-500/15 text-violet-400',
    solid: 'bg-violet-500 text-white',
    border: 'border-violet-400',
    borderSoft: 'border-violet-400/40',
    hoverBorder: 'hover:border-violet-400',
    glow: 'from-violet-500/25',
    ring: 'ring-violet-400/50',
    chip: 'border-violet-400/40 bg-violet-500/10',
  },
  amber: {
    text: 'text-amber-400',
    soft: 'bg-amber-500/15 text-amber-400',
    solid: 'bg-amber-500 text-default-950',
    border: 'border-amber-400',
    borderSoft: 'border-amber-400/40',
    hoverBorder: 'hover:border-amber-400',
    glow: 'from-amber-500/25',
    ring: 'ring-amber-400/50',
    chip: 'border-amber-400/40 bg-amber-500/10',
  },
  teal: {
    text: 'text-teal-400',
    soft: 'bg-teal-500/15 text-teal-400',
    solid: 'bg-teal-500 text-white',
    border: 'border-teal-400',
    borderSoft: 'border-teal-400/40',
    hoverBorder: 'hover:border-teal-400',
    glow: 'from-teal-500/25',
    ring: 'ring-teal-400/50',
    chip: 'border-teal-400/40 bg-teal-500/10',
  },
}

// The classes of an accent, or the brand's for an unknown one.
export const accent = (name) => accents[name] ?? accents.primary

// The order in which lists of things take colors, e.g. the chips of the AI resources.
export const accentCycle = ['primary', 'emerald', 'sky', 'violet', 'amber', 'teal']
