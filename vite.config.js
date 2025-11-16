import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Dit à Vite que la racine est ici
  build: {
    outDir: 'dist',
  }
})
