import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        roboto: ['Roboto Slab', 'serif'],
      },
      colors: {
        primary: "#e5e7eb",
        "primary-hover": "#374151",
        secondary: "#6b7280",
        accent: "#9ca3af",
        "dark-bg": "#0a0a0a",
      }
    },
  },
  plugins: [
    typography,
  ],
}
