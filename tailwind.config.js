/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        tiny: "13px",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
