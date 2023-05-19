import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../',
    // watch: {
    //   include: ['src/**','index.html'],
    // },
    // rollupOptions: {
    //   output: {
    //     assetFileNames: 'assets/[name][extname]',
    //     chunkFileNames:'[name].js'
    //   }
    // }
  }
})
