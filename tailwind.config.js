/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
};
