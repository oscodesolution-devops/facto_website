/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#253483",  // Define primary color
        secondary: "#3AB54A",  // Define secondary color
      },
      fontFamily: {
        erode: ['"Erode Variable"', 'sans-serif'],  // Custom font for Erode Variable
      },
      spacing: {
        10: '10px',        // Custom spacing
        115: '115px',      // Custom spacing for padding
        151: '151px',      // Custom spacing for bottom padding
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
