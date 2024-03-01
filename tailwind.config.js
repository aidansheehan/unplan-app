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
        buttonBg: '#4338CA',
        buttonHover: '#4F46E5',

        // Sidebar / Top Nav colors
        sidebarHover: '#29292b',
        sidebarHighlight: '#fcd116',
        sidebarBg: '#1c1c1e',
        sidebarInactiveText: '#f5f5f5',
        brand: '#db2b39',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
