/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/views/*.{html,hbs,js}"],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': "'Open Sans', sans-serif"
      }
    },
  },
  plugins: [require('daisyui')],
}

