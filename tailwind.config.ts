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
        dark: {
          50: "#f5f5f7", 100: "#e8e8ed", 200: "#d1d1d6",
          300: "#a1a5af", 400: "#6b7080", 500: "#484b5a",
          600: "#323541", 700: "#22262f", 800: "#1a1d24",
          900: "#12141a", 950: "#0a0b0d",
        },
        gold: { DEFAULT: "#D4A853", light: "#F9C633", dark: "#95771f" },
        emerald: { DEFAULT: "#10B981" },
        crimson: { DEFAULT: "#EF4444" },
        azure: { DEFAULT: "#3B82F6" },
      },
      fontFamily: {
        arabic: ["Tajawal", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(30px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
    },
  },
  plugins: [],
};
export default config;
