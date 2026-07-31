/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        burgundy: {
          900: '#1A0407',
          800: '#2D080E',
          700: '#4A0E17',
          600: '#6B1422',
          500: '#8C1B2D',
        },
        gold: {
          100: '#FDF8EA',
          200: '#F3E5AB',
          300: '#E6C687',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A38140',
        },
        obsidian: {
          950: '#070709',
          900: '#0B0B0E',
          850: '#121218',
          800: '#1A1A24',
          700: '#262636',
        },
        silk: {
          100: '#FFFFFF',
          200: '#FAFAFC',
          300: '#F3F3F7',
          400: '#E5E5ED',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.3)',
        'burgundy-glow': '0 0 40px rgba(74, 14, 23, 0.4)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #C5A059 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #4A0E17 0%, #1A0407 100%)',
        'obsidian-glass': 'linear-gradient(135deg, rgba(18, 18, 24, 0.7) 0%, rgba(11, 11, 14, 0.9) 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
