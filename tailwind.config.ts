import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@maggioli-design-system/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@maggioli-design-system/styles"),
  ],
  plugins: [],
} satisfies Config;
