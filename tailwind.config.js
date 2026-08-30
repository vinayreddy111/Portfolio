/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080a0f',
          dark: '#0d1117',
          card: '#121824',
          border: '#1f293d',
          cyan: '#00f0ff',
          cyanGlow: '#00f0ff33',
          amber: '#f59e0b',
          hazard: '#eab308',
          olive: '#84cc16',
          tactical: '#10b981',
          matrix: '#00ff66',
          steel: '#94a3b8',
          crimson: '#f43f5e',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'ui-monospace', 'monospace'],
        display: ['"Orbitron"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar': 'radar 3s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
        'hazard-stripes': 'repeating-linear-gradient(45deg, #eab308, #eab308 10px, #000 10px, #000 20px)',
      }
    },
  },
  plugins: [],
}
