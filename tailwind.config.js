// const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: '#ff2e63',
        themeOcpy: '#ff2e6330',
        defalut: '#a9a9a8',
        gory1: '#b2bfc5',
        black1: '#25486e'
      }
    }
  },
  plugins: []
}
