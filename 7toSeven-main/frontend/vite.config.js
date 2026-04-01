import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      ...process.env,
      REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL || process.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000',
      REACT_APP_RAZORPAY_KEY_ID: process.env.REACT_APP_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
