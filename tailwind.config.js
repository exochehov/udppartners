/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'scroll-left': 'scrollLeft 40s linear infinite',
        'scroll-right': 'scrollRight 40s linear infinite',
      },
      backgroundImage: {
        'grid-white': 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      },
      colors: {
        primary: {
          DEFAULT: '#f97316', // orange-500
          dark: '#c2410c', // orange-700
          light: '#fb923c', // orange-400
        },
        secondary: {
          DEFAULT: '#f59e0b', // amber-500
          dark: '#b45309', // amber-700
          light: '#fbbf24', // amber-400
        }
      }
    },
  },
  plugins: [],
};