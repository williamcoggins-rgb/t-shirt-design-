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
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36adf6",
          500: "#0c93e7",
          600: "#0074c5",
          700: "#015da0",
          800: "#064f84",
          900: "#0b426e",
          950: "#072a49",
        },
        dark: {
          50: "#f6f6f7",
          100: "#e2e3e5",
          200: "#c4c5ca",
          300: "#9fa1a8",
          400: "#7b7d86",
          500: "#61636b",
          600: "#4c4e55",
          700: "#3e4046",
          800: "#35363b",
          900: "#2b2c30",
          950: "#1a1b1e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
