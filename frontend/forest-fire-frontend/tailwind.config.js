/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f1f8f3',
          100: '#dcedE0',
          200: '#b9dbc2',
          300: '#8ec39d',
          400: '#5fa476',
          500: '#3d8757',
          600: '#2c6b43',
          700: '#245638',
          800: '#1f452f',
          900: '#1a3a29',
          950: '#0c2016',
        },
        alert: {
          50: '#fff4ed',
          100: '#ffe6d5',
          400: '#ff8a4c',
          500: '#f9622a',
          600: '#ea4419',
          700: '#c23112',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(16, 44, 30, 0.08), 0 1px 2px -1px rgba(16, 44, 30, 0.08)',
      },
    },
  },
  plugins: [],
}
