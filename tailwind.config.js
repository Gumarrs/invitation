/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: '#F8F2E6', 50: '#FDFAF3', 100: '#F8F2E6', 200: '#F0E6D1' },
        champagne: { DEFAULT: '#E6D3AE', 300: '#EFE0C2', 400: '#E6D3AE', 500: '#D4BC8A' },
        gold: { DEFAULT: '#B8893C', 300: '#D9B56E', 400: '#C79B4C', 500: '#B8893C', 600: '#9A7030' },
        cocoa: { DEFAULT: '#2A1B12', 700: '#3D2A1D', 800: '#2A1B12', 900: '#1B110B' },
        clay: '#8A6A55',
        sage: '#7E8B6C',
        rose: { dust: '#C98F86' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: { wider2: '0.22em' },
      transitionTimingFunction: { silk: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
