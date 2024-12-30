import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      // REMOVE any problematic externalizations here
      external: ['react-router-dom'],
    },
  },
})
