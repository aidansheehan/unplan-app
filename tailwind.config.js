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
        'custom-background': "url('/background_image-98.jpg')"
      },
      fontFamily: {
        heading: ['"Changa One"', 'cursive', 'sans-serif'],
        nav: ['Roboto', 'sans-serif'],
        body: ['Roboto Slab', 'serif']

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
