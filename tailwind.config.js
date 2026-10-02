/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        lab: {
          white: 'var(--lab-white)',
          sky: 'var(--lab-sky)',
          'sky-soft': 'var(--lab-sky-soft)',
          sun: 'var(--lab-sun)',
          ink: 'var(--lab-ink)',
          muted: 'var(--lab-muted)',
          link: 'var(--lab-link)',
          border: 'var(--lab-border)',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
