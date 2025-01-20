import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        pomodoro: {
          "work-bg": "#F2FCE2",
          "break-bg": "#D3E4FD",
          "work-accent": "#2D3F1F",
          "break-accent": "#1F2D3F",
        },
      },
      keyframes: {
        "timer-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.01)" },
        },
      },
      animation: {
        "timer-pulse": "timer-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
