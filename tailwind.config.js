/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,json}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#050b1d',
        ocean: '#0a1a46',
        electric: '#22d3ee',
        flare: '#60a5fa'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 10px 30px rgba(34, 211, 238, 0.22)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 10% 20%, rgba(34, 211, 238, 0.2), transparent 30%), radial-gradient(circle at 85% 30%, rgba(96, 165, 250, 0.2), transparent 28%), radial-gradient(circle at 35% 80%, rgba(59, 130, 246, 0.18), transparent 34%)'
      }
    }
  },
  plugins: []
};
