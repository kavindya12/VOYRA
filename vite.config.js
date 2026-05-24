import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Vercel / custom domain: base '/'
// GitHub Project Pages (user.github.io/VOYRA/): set GITHUB_PAGES=true in CI
const base = process.env.GITHUB_PAGES === 'true' ? '/VOYRA/' : '/'

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
