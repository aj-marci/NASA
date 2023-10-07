/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'lightblueText': '#BDDFFF',
        'background': '#474747',
        'white': '#FFFFFF',
        'formError': '#DB2B2B',
      },
      fontFamily: {
      'master': ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}