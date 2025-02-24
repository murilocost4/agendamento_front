import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy todas as requisições para /api para o backend que está rodando no localhost:5000
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
