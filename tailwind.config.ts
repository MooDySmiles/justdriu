/* eslint-disable @typescript-eslint/no-var-requires */
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
  theme: {
    extend: {
      colors: {
        // add custom justdriu colors
        'justdriu-01': 'rgb(var(--justdriu-01))',
        'justdriu-02': 'rgb(var(--justdriu-02))',
        'justdriu-03': 'rgb(var(--justdriu-03))',
        'justdriu-04': 'rgb(var(--justdriu-04))',
        'justdriu-05': 'rgb(var(--justdriu-05))',
        'justdriu-06': 'rgb(var(--justdriu-06))',
        'justdriu-07': 'rgb(var(--justdriu-07))',
        'justdriu-08': 'rgb(var(--justdriu-08))',
        'justdriu-09': 'rgb(var(--justdriu-09))',
        'justdriu-10': 'rgb(var(--justdriu-10))',
        'justdriu': 'rgb(var(--justdriu))',  
      }
    }
  },
  plugins: [],
} satisfies Config;
