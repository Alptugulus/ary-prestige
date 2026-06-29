import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0E0E0E",
        secondary: "#141414",
        bronze: "#C5A059",
        "bronze-dark": "#B88A5A",
        silver: "#C9CDD1",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      letterSpacing: {
        luxury: "0.22em",
        nav: "0.18em",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E8C872 0%, #C5A059 45%, #A67C3D 100%)",
        "gold-gradient-h":
          "linear-gradient(90deg, #D4AF6A 0%, #C5A059 50%, #B88A5A 100%)",
      },
      boxShadow: {
        gold: "0 4px 24px rgba(197, 160, 89, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
