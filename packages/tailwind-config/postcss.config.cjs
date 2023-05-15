/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./tailwind.config.cjs');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: {
    'tailwindcss/nesting': {},

    // https://github.com/tailwindcss/tailwindcss
    tailwindcss: { config },

    // https://github.com/csstools/postcss-preset-env
    // defaults to stage 2
    'postcss-preset-env': {
      stage: 2,
      features: { 'nesting-rules': false },
    },

    // https://github.com/cssnano/cssnano
    cssnano: isDev ? false : { preset: 'default' },
  },
};
