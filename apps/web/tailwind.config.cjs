/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  presets: [require('@jn/tailwind-config/tailwind.config.cjs')],
};
