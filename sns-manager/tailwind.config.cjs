/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  theme: {
    extend: {},
    height: {
      '15v': '15vw',
      '25v': '25vw',
      '50v': '50vw',
      '75v': '75vw',
    },
  },
  content: ["./index.html", './src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
}
