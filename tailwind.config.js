/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'romantic-pink': '#FFD1DC',
        'romantic-red': '#FF6B6B',
        'romantic-lavender': '#E6E6FA',
        'romantic-gold': '#FFD700',
      },
      animation: {
        'float-hearts': 'float 6s linear infinite',
        'fall-petals': 'fall 10s linear infinite',
        'fadeIn': 'fadeIn 2s ease-in-out',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(100vh) scale(0.5)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) scale(1.2)', opacity: '0' },
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
