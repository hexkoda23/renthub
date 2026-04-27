/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5C00",   // Bold Lagos orange 
          light: "#FFF1EB", 
          dark: "#CC4900", 
        }, 
        ink: { 
          DEFAULT: "#0A0A0A",   // Near-black for dark sections 
          soft: "#1A1A2E", 
        }, 
        sand: { 
          DEFAULT: "#F5F0E8",   // Warm cream/sand for backgrounds 
          dark: "#E8DFD0", 
        }, 
        neutral: { 
          50: "#FAFAF9", 
          100: "#F5F4F1", 
          200: "#E8E6E1", 
          300: "#D1CEC7", 
          400: "#9E9A91", 
          500: "#6B6760", 
          600: "#4A4740", 
          700: "#33302A", 
          800: "#1F1D18", 
          900: "#0A0908", 
        }, 
        success: { DEFAULT: "#00A86B", light: "#E6F7F1" }, 
        warning: { DEFAULT: "#F59E0B", light: "#FEF3C7" }, 
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      backgroundImage: { 
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")", 
      }, 
      animation: { 
        'float': 'float 6s ease-in-out infinite', 
        'shimmer': 'shimmer 2s linear infinite', 
        'fade-up': 'fadeUp 0.6s ease-out forwards', 
      }, 
      keyframes: { 
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } }, 
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } }, 
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }, 
      }, 
      spacing: {
        "4px": "4px",
      },
      borderRadius: {
        "rent": "12px",
      }
    },
  },
  plugins: [],
};
