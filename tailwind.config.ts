import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds
        deep: '#0a0a0f',
        'deep-alt': '#0d1117',
        'deep-card': '#1a1a2e',
        'deep-border': '#16161a',
        'deep-footer': '#050508',
        // Accent colors
        accent: {
          DEFAULT: '#00a8ff',
          cyan: '#00d4ff',
          glow: 'rgba(0, 168, 255, 0.4)',
        },
        // Secret room accent
        secret: {
          DEFAULT: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.4)',
        },
        // Text colors
        'text-primary': '#e4e4e7',
        'text-heading': '#fafafa',
        'text-muted': '#71717a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
        'letter-glow': 'letter-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 168, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 168, 255, 0.6)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'letter-glow': {
          '0%, 100%': {
            color: '#00a8ff',
            textShadow: '0 0 10px rgba(0, 168, 255, 0.5), 0 0 20px rgba(0, 168, 255, 0.3)',
          },
          '50%': {
            color: '#00d4ff',
            textShadow: '0 0 20px rgba(0, 212, 255, 0.7), 0 0 40px rgba(0, 168, 255, 0.5)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
