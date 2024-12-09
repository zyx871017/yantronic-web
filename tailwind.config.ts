import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      colors: {
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-error": "var(--text-error)",
        "main-surface-primary": "var(--main-surface-primary)",
        "main-surface-secondary": "var(--main-surface-secondary)",
        "main-surface-tertiary": "var(--main-surface-tertiary)",
        "sidebar-surface-primary": "var(--sidebar-surface-primary)",
        "sidebar-surface-secondary": "var(--sidebar-surface-secondary)",
        "token-border-medium": "var(--border-medium)",
        link: "var(--link)",
        "quota-borders": "var(--prose-quote-borders)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#06f",
        "main-light": "rgba(0, 87, 255, 0.06)",
        border: "rgba(0, 0, 0, 0.08)",
        "border-main": "rgba(0, 102, 255, .15)",
      },
      width: {
        "left-width": "clamp(160px, 25vw, 280px)",
      },
      padding: {
        "left-width": "clamp(160px, 25vw, 280px)",
      },
      left: {
        "left-width": "clamp(160px, 25vw, 280px)",
      },
      transitionProperty: {
        left: "left",
      },
    },
  },
  plugins: [],
};
export default config;
