/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const apiTarget = process.env.API_URL || 'http://localhost:3001'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    allowedHosts: true,
    proxy: {
      '/api': apiTarget,
      '/health': apiTarget,
    },
  },
  preview: {
    allowedHosts: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}', 'server/**/*.test.{ts,tsx}'],
  },
})
