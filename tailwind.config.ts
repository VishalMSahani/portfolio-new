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
        "bg-secondary": "#f9fafb",
        "text-primary": "#0a0a0a",
        "text-secondary": "#6b7280",
        "text-tertiary": "#9ca3af",
        "border-primary": "#e5e7eb",
      },
    },
  },
  plugins: [],
};

export default config;
