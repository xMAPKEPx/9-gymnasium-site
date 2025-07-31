module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'bg-primary', 'bg-accent', 'text-accent', 'hover:bg-primary', 'hover:bg-accent',
    // и т.д.
  ],
}; 