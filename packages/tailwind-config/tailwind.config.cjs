const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },

      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
        },

        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },

        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
        },

        lighter: 'var(--color-lighter)',
        light: 'var(--color-light)',
        medium: 'var(--color-medium)',
        dark: 'var(--color-dark)',
        darker: 'var(--color-darker)',
      },

      spacing: {
        88: '22rem',
      },

      minWidth: ({ theme }) => theme('spacing'),

      maxWidth: ({ theme }) => ({
        ...theme('spacing'),
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      }),

      minHeight: ({ theme }) => theme('spacing'),

      backgroundColor: ({ theme }) => ({
        main: theme('colors.slate.100'),
      }),

      fontFamily: {
        sans: ['"Microsoft YaHei"', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
