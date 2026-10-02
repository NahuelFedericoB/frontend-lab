import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    clearMocks: true,
    restoreMocks: true,
    // Keep source-viewer imports as text instead of Vitest's CSS Module proxy.
    css: {
      include: [/\.css\?raw$/],
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/*.types.ts',
        'src/tests/**',
      ],
      reporter: ['text', 'html', 'text-summary'],
    },
  },
});
