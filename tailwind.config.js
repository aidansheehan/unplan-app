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
// Sidebar / Top Nav colors
sidebarBg: '#F9D835', // A softened yellow, less bright, but still warm and inviting
sidebarHover: '#E6C200', // A slightly darker yellow for hover effects
sidebarHighlight: '#202020', // A very dark grey, almost black for contrast and emphasis
sidebarInactiveText: '#4A4A4A', // A medium grey for inactive text, for better readability

// Brand color
brand: '#000',//'#F9D835', // Softened yellow to maintain brand consistency but less bright

// Button colors
buttonBg: '#3273DC', // Warm blue for primary action buttons
buttonHover: '#2767B1', // A slightly darker shade of blue for button hover state

// Additional UI colors
textColor: '#4A4A4A', // Medium grey for main text, softer than black
highlightText: '#F9D835', // Softened yellow for highlighted text or important UI elements
cardBg: '#FFFFFF', // White for cards to keep the interface clean and modern
cardShadow: '#000000', // Black for subtle shadows to give depth, at low opacity






      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
