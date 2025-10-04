module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      colors: {
        midnight: '#0b1120',
        twilight: '#1e1b4b',
        aurora: '#6366f1',
        blossom: '#a855f7',
        ocean: '#22d3ee'
      },
      boxShadow: {
        glow: '0 25px 50px -12px rgba(79, 70, 229, 0.45)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
