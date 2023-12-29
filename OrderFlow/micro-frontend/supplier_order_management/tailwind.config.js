/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans serif"],
        lexend: ["Lexend", "sans serif"],
        mulish: ["Mulish", "sans serif"],
        inter: ["Inter", "sans serif"],
      },
    },
  },
  plugins: [],
};
