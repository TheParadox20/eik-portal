import {  addDynamicIconSelectors } from "@iconify/tailwind"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "certificate": "url('/certificates/cert.jpeg')",
        "training": "url('/certificates/training.jpg')",
      },
      colors:{
        primary:'#74A942',
        secondary:'#1083AC',
        layer:'#FBFBFB',
        warning:'#C64130',
        tertiary:'#D9D9D9',
        surface:'#C8EAA7',
      }
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
};
