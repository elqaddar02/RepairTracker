/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fixoo brand palette
        fixoo: {
          primary: '#FF6B35',
          secondary: '#FFB347',
          accent: '#2D2D2D',
          background: '#FFF7F0',
          text: '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
};
