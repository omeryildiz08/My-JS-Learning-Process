import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Tüm "/api" ile başlayan istekleri .NET Core API'nize yönlendir
      '/api': {
        target: 'https://localhost:7090', // .NET Core adresiniz
        changeOrigin: true,
        secure: false // SSL sertifikası kullanmıyorsanız
      }
    }
}})
