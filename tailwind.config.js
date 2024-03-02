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
sidebarBg: '#FFB300', // A vibrant amber that balances brightness with depth.
sidebarHover: '#FFA000', // A golden poppy that maintains energy during interaction.
sidebarHighlight: '#262626', // A charcoal grey for strong contrast and emphasis.
sidebarInactiveText: '#404040',
sidebarHoverText: '#363636',
sidebarActiveText: '#202020',

// Brand color
brand: '#262626', // Charcoal grey to create a grounded and authoritative look.

// Button colors
buttonBg: '#262626',//'#E64A19', // A bold vermilion that stands out and invites user engagement.
buttonHover: '#D84315', // A slightly deeper shade for a subtle yet noticeable hover effect.

// Additional UI colors
textColor: '#565656', // A grey that reduces glare and increases legibility.
highlightText: '#FFB300', // The vibrant amber for key highlights and to draw attention.
cardBg: '#FFFFFF', // Pure white to keep the focus on the content and action elements.
cardShadow: 'rgba(0, 0, 0, 0.2)', // A darker shadow for pronounced depth, accentuating the cards.

      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
