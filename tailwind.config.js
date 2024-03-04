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
          /** Material palette colors generated with https://www.materialpalette.com/amber/amber */
          darkPrimary: '#FFA000',
          lightPrimary: '#FFECB3',
          primary: '#FFC107',
          primaryText: '#212121', // This is also for icons, could be different icons
          secondaryText: '#757575',
          divider: '#BDBDBD',
          accent: '#448AFF',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
