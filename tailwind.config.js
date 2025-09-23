/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import prelinePlugin from 'preline/plugin'
import formPlugin from '@tailwindcss/forms'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '10rem',
      },
    },

    fontFamily: {
      jost: ['Jost', 'sans-serif'],
    },

    extend: {
      colors: {
        primary: colors.orange['600'],
        'primary-hover': colors.orange['700'],

        default: colors.slate,
      },
    },
  },
  plugins: [prelinePlugin, formPlugin],
}
