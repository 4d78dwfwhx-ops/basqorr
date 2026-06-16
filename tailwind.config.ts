import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef9e7",
          100: "#fdf2c3",
          200: "#fce79f",
          300: "#fbdc7b",
          400: "#fad157",
          500: "#f9c633",
          600: "#c79e29",
          700: "#95771f",
          800: "#634f14",
          900: "#31280a",
        },
        dark: {
          50: "#f5f5f7",
          100: "#e8e8ed",
          200: "#d1d1d6",
          300: "#a1a5af",
          400: "#6b7080",
          500: "#484b5a",
          600: "#323541",
          700: "#22262f",
          800: "#1a1d24",
          900: "#12141a",
          950: "#0a0b0d",
        },
        accent: {
          gold: "#D4A853",
          emerald: "#10B981",
          crimson: "#EF4444",
          azure: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["Tajawal", "system-ui", "sans-serif"],
        arabic: ["Tajawal", "IBM Plex Sans Arabic", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
