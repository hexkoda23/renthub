/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B4FFF",
          dark: "#0036CC",
          light: "#E8EEFF",
        },
        secondary: {
          DEFAULT: "#FF6B2C",
          dark: "#E55A1A",
          light: "#FFF0EA",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
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
