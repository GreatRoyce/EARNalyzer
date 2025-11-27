/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Techy Color Palette
        electricBlue: "#0066FF",
        cyberGreen: "#00FF88",
        neonPurple: "#8B5CF6",
        laserPink: "#EC4899",
        matrixGreen: "#00FF41",
        synthOrange: "#FF6B35",
        quantumBlue: "#00D4FF",
        plasmaPurple: "#A855F7",
        terminalAmber: "#FFB300",
        cyberTeal: "#00F5D4",
        darkSlate: "#0F172A",
        carbon: "#1E293B"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor' },
        }
      }
    },
  },
  plugins: [],
}