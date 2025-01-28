/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        1: ["Quicksand", "sans-serif"],
      },
      width: {
        primary: "1440px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        text: {
          1: "#94a3b8",
          2: "#334155",
        },
        bg: {
          1: "#0f172a",
        },
        border: {
          1: "#f8fafc0f",
          2: "#e5e7eb",
        },
      },
      backgroundImage: {
        pattern: `url('./assets/background/pattern.svg')`,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
