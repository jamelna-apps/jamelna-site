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
        // Canvas system (warm near-black backgrounds)
        canvas: {
          DEFAULT: '#1A1816',    // warm near-black (replaces deep/#1C1C1E)
          deep: '#12110F',       // deepest background (replaces deep.darker)
          raised: '#242220',     // card/raised surfaces (replaces deep.card)
          border: '#3A3633',     // borders (replaces deep.border)
          cream: '#F5F0E8',      // warm off-white for light sections (NEW)
        },
        // Primary accent — terra/burnt sienna (replaces electric blue)
        terra: {
          DEFAULT: '#C4703F',
          light: '#D4896A',
          dark: '#A85A2A',
        },
        // Secondary accent — ink/desaturated teal-blue
        ink: {
          DEFAULT: '#3D5A6E',
          light: '#5A7A8E',
          dark: '#2A4050',
        },
        // Secret room accent — keep purple
        secret: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
        },
        // Text system (warm, not pure white)
        text: {
          primary: '#EDE8E0',
          secondary: '#B5AFA5',
          muted: '#6E6860',
          heading: '#F5F0E8',
        },
        // Legacy compatibility (keep these so existing zinc-* references don't break immediately)
        // These will be removed in Phase 4 when we search-replace across all pages
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-hero': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-section': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'clip-reveal': 'clip-reveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'grow-line': 'grow-line 1.5s ease-out forwards',
        'filmstrip': 'filmstrip 60s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'clip-reveal': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        'grow-line': {
          '0%': { height: '0' },
          '100%': { height: '40px' },
        },
        'filmstrip': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
