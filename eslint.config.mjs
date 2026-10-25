import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";

// Next 15 utiliza configuración legacy; FlatCompat la adapta a ESLint 9.
const compat = new FlatCompat({ baseDirectory: fileURLToPath(new URL(".", import.meta.url)) });

const config = [
  { ignores: [".next/**", "node_modules/**", ".playwright/**", "coverage/**", "out/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
