/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B4FFF",
          light: "#E8EEFF",
          dark: "#0035D3",
        },
        secondary: {
          DEFAULT: "#FF6B2C",
          light: "#FFF0EA",
          dark: "#E55A1F",
        },
        rent: {
          bg: "#F8F9FA",
          card: "#FFFFFF",
          border: "#E9ECEF",
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      borderRadius: {
        'rent': '1rem',
      }
    },
  },
  plugins: [],
}
