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
        "bg-primary": "#ffffff",
        "bg-secondary": "#fafafa",
        "text-primary": "#171717",
        "text-secondary": "#525252",
        "text-tertiary": "#737373",
        "border-primary": "#e5e5e5",
      },
    },
  },
  plugins: [],
};

export default config;
