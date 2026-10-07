import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    clearMocks: true,
    restoreMocks: true,
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
