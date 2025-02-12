/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'arvo': ['Arvo', 'serif'],
        // Optional: Set as default sans font
        'sans': ['Poppins', 'sans-serif'],
      },
      gridAutoRows: {
        '200': '200px',
      },
    },
    variants: {
      extend: {
        scale: ['group-hover'],
        opacity: ['group-hover'],
        translate: ['group-hover'],
      },
    },
  },
  plugins: [],
}