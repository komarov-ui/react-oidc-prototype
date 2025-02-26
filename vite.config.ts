import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    https: {
      key: fs.readFileSync('./ssl/server.key'),
      cert: fs.readFileSync('./ssl/server.crt'),
    },

  }
})
