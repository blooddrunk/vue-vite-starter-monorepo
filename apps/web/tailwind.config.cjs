/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@jn/tailwind-config/tailwind.config.cjs')],

  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
