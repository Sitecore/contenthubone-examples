/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
