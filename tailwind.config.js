/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-diagonal": "linear-gradient(to top right, #933FFE, #18C8FF)",
      },
    },
  },
  plugins: [],
};
