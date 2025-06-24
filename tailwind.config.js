/** @type {import('tailwindcss').Config} */
const colors = require('./src/lib/colors'); // Make sure this path is still correct!
const withMT = require('@material-tailwind/react/utils/withMT'); // Import withMT

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    // Add any new paths if your project structure changed significantly
    // For example, if you moved things into a 'src' folder:
    // './src/pages/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
    // './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        desire: ['DesirePro', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        cream: colors.cream,
        rose: colors.rose,
        lavender: colors.lavender,
        lilac: colors.lilac,
        goldBrown: colors.goldBrown,
        'purple-700': '#9f718c',
        'purple-800': '#6c4a6c',
      },
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [], // Keep this if you don't have any custom plugins yet.
};

module.exports = withMT(config); // Use withMT
