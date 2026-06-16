/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDFCFB',
          100: '#FAF5F2',
          200: '#F5E9E5',
          300: '#F0D6D0',
          400: '#EBA5A4',
          500: '#D4A853',
          600: '#C29746',
          700: '#A37B34',
          800: '#836125',
          900: '#624616',
        },
        background: {
          DEFAULT: '#0A0B0D',
          secondary: '#12141A',
          surface: '#1A1D24',
        },
        text: {
          primary: '#F5F5F7',
          secondary: '#A1A5AF',
          muted: '#6B7080',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'IBM Plex Sans Arabic', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '16px',
        button: '12px',
        input: '10px',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'elevation-2': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'elevation-3': '0 12px 40px rgba(0, 0, 0, 0.5)',
        'elevation-4': '0 24px 80px rgba(0, 0, 0, 0.6)',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-rtl'),
    function ({ addUtilities }) {
      addUtilities({
        '.rtl': {
          direction: 'rtl',
          unicodeBidi: 'bidi-override',
        },
        '.ltr': {
          direction: 'ltr',
          unicodeBidi: 'bidi-override',
        },
      });
    },
  ],
  corePlugins: {
    preflight: false,
  },
};
