import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@fonts': 'src/assets/fonts', // <- Esto agrega el alias @fonts
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/unitarias/setup.js',
    exclude: ['tests/funcionales/**']
  },
})
