import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#141414",
          light: "#1F1F1E",
          soft: "#2A2A28"
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C765",
          dark: "#9C7D1D"
        },
        cream: "#F5F1E8"
      },
      fontFamily: {
        display: ["Bebas Neue", "Oswald", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.25em"
      }
    }
  },
  plugins: []
};

export default config;
