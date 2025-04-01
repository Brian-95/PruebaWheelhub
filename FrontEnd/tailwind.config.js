/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'custom-green': '#1ec86c',
        'custom-green-light': '#9cdcb9',
        'custom-green-dark': '#07542a',
        'text': '#313131',          // $text-color
        'secondary': '#788f9c',     // $step-color
        'secondary-hover': '#3b6a86', // $step-hover-color
        'primary': '#1ec86c',       // $green-color
        'primary-light': '#9cdcb9', // $light-green-color
        'primary-dark': '#00632d',  // $dark-green-color
        'danger': 'red',            // $red
        'mid': '#f66d35', 
        'very-strong': '#22f4ea', 
        'white': '#FFFFFF'          // $white
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} 