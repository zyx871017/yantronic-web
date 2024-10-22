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
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#06f",
        "main-light": "rgba(0, 87, 255, 0.06)",
        "left-bg": "#F3F4F6",
        border: "rgba(0, 0, 0, 0.08)",
        "border-main": "rgba(0, 102, 255, .15)",
      },
      width: {
        "left-width": "clamp(160px, 25vw, 280px)",
      },
      padding: {
        "left-width": "clamp(160px, 25vw, 280px)",
      },
    },
  },
  plugins: [],
};
export default config;
