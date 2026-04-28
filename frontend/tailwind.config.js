/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          light: "#EEF0FF",
          dark: "#5148E8",
          50: "#F5F4FF",
          100: "#EEF0FF",
          200: "#D9D6FF",
          600: "#6C63FF",
          700: "#5148E8",
        },
        accent: {
          DEFAULT: "#FF6B6B",
          light: "#FFF0F0",
          dark: "#E55555",
        },
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FFFBEB",
        },
        ink: {
          DEFAULT: "#0F0F1A",
          soft: "#1A1A2E",
          muted: "#2D2D44",
        },
        surface: {
          DEFAULT: "#FAFAFA",
          card: "#FFFFFF",
          elevated: "#F4F3FF",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        success: { DEFAULT: "#22C55E", light: "#F0FDF4", dark: "#16A34A" },
        warning: { DEFAULT: "#F59E0B", light: "#FFFBEB" },
        info: { DEFAULT: "#3B82F6", light: "#EFF6FF" },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        rent: "1rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(108,99,255,0.08)",
        "card-hover": "0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(108,99,255,0.16)",
        glow: "0 0 40px rgba(108,99,255,0.25)",
        "glow-accent": "0 0 40px rgba(255,107,107,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.95)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(108,99,255,0.15) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(108,99,255,0.04) 0%, rgba(255,107,107,0.04) 100%)",
      },
    },
  },
  plugins: [],
};
