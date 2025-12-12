/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#f0e4d7",
        },
        brown: {
          600: "#7c4a2e",
          700: "#6b3f26",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};