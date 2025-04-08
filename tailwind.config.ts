import type { Config } from 'tailwindcss';
const colors = require('./util/colors');

const withMT = require('@material-tailwind/react/utils/withMT');
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        desire: ['DesirePro', 'sans-serif'], // Benenne die Schriftart für einfacheren Zugriff
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        cream: colors.cream,
        rose: colors.rose,
        lavender: colors.lavender,
        lilac: colors.lilac,
        goldBrown: colors.goldBrown,
      },
    },
  },
};

export default withMT(config);
