import type { Config } from "tailwindcss";

const config: Config = {
  // Las maquetas no usan clases Tailwind; el sistema bt-* vive en CSS global.
  // Tailwind se usa solo para utilidades puntuales en el portal/admin.
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta base (espejo de tokens.css). Ver docs/diseno/tokens.css.
        navy: "#002E84",
        cobalto: "#0058B0",
        sky: "#8FCCF0",
        aqua: "#A1D9D4",
        yellow: "#FFD806",
        orange: "#FE6301",
        cream: "#F7F4EC",
        ink: "#0B0B0B",
      },
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        body: ["Karla", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
