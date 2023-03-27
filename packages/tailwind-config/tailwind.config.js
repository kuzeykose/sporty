// const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    // app content
    "src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
};