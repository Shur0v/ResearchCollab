/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        hadfield: '#0e70ff',
        dodgeroll: '#f59b14',
        cerebral: '#cccccc',
        morning: '#e5e5e5',
        silk: '#f2f2f2',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        h1: ['48.828px', { lineHeight: '1.1' }],
        h2: ['39.063px', { lineHeight: '1.2' }],
        body: ['16px', { lineHeight: '1.5' }],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
