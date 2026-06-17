import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    sourcemap: false,
    rollupOptions: isSsrBuild ? {} : {
      input: {
        main: resolve(__dirname, 'index.html'),
        security: resolve(__dirname, 'security.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
}))
