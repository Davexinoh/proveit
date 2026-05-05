/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#F5FF40',
        black: '#0A0A0A',
        surface: '#111111',
        surface2: '#1A1A1A',
        surface3: '#242424',
        muted: '#666666',
        success: '#39FF14',
        error: '#FF3B3B',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}