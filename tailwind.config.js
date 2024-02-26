/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'permanent-marker': [ 'Permanent Marker', 'monospace'],
        'bree': ['Bree Serif', 'serif']

      },
      boxShadow: {
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      screens: {
        'xl': '1440px'
      },
      colors: {
        charcoal: '#1c1c1e',
        softwhite: '#f5f5f5',
        highlight: '#fcd116',
        inactive: '#a1a1a1',
        hover: '#29292b',
        lightneutral: '#f0f0f0',
        contentbg: '#ffffff',
        primarytext: '#333333',
        secondarytext: '#8c8c8c',

        button: '#e34036',
        brandRed: '#db2b39',
        softgrey: '#f7f7f7',
        e34036: '#e34036',
        f05454: '#f05454',
      }
    },
  },
  plugins: [],
}
