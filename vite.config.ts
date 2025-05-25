import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This will listen on all network interfaces
    port: 3000, // Set a specific port
    strictPort: true, // Don't try other ports if 3000 is taken
  },
})
