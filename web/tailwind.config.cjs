module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Poppins"', 'sans-serif']
      },
      colors: {
        carbon: '#121212',
        carbonLight: '#1a1a1a',
        midnight: '#0f172a',
        obsidian: '#111827',
        cobalt: '#6366f1',
        neon: '#22d3ee',
        magenta: '#a855f7',
        lime: '#84cc16',
        slate: {
          950: '#020617'
        }
      },
      boxShadow: {
        glow: '0 25px 60px -15px rgba(99, 102, 241, 0.65)',
        inner: 'inset 0 1px 0 0 rgba(255,255,255,0.05)'
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(99, 102, 241, 0)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
