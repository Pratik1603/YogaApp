import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Change to Render URL in production
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(),tailwindcss()],
})
