/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{html,ts}",
      "node_modules/flowbite/**/*.js" // flowbite plugin
    ],
    theme: {
      extend: {
        backgroundImage: {
          'custom-gradient': 'linear-gradient(to left, #E9ECF1 98%, #0049D6 2%)',
        },

        
      },
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
  
  
  