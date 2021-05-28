module.exports = {
  mode: 'JIT',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        page: {
          light: "#f15946",
          DEFAULT: "#131921"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
