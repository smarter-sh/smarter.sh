/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue,html}'],
  theme: {
    // A 16px gutter on phones and tablets, so that no page's content touches the screen's edges.
    container: {
      padding: { DEFAULT: '1rem', lg: '0rem' },
    },
    extend: {
      fontFamily: {
        // The site's font, the web console's (the Keen theme's), loaded in index.html.
        inter: ['Inter', 'sans-serif'],
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        primary: '#ea580c',
        default: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // The web console's light theme: the Keen theme's grays (public/keen/style.scoped.css).
        // 100 is the console's page color, 200 its hairlines, 300 its borders, 600 muted text,
        // 700 body text and 900 headings.
        keen: {
          100: '#F9F9F9',
          200: '#F1F1F4',
          300: '#DBDFE9',
          400: '#C4CADA',
          500: '#99A1B7',
          600: '#78829D',
          700: '#4B5675',
          800: '#252F4A',
          900: '#071437',
        },
        // the console's dark code panels (the CLI and manifest snippets of its widgets)
        code: {
          bg: '#1e1e2e',
          text: '#cdd6f4',
        },
      },
      boxShadow: {
        // the console's cards and its header
        card: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)',
        header: '0px 10px 30px 0px rgba(82, 63, 105, 0.05)',
      },
    },
  },
  plugins: [],
}
