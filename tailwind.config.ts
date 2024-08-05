import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '450mq': '450px',
        '600mq': '600px',
        '800mq': '800px',
        '900mq': '900px',
        '1250mq': '1250px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      padding: {
        '1vw': '1vw',
        '2vw': '2vw',
        '4vw': '4vw',
        '6vw': '6vw',
        '8vw': '8vw'
      },      
    },
  },
  plugins: [],
};

export default config;
