import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { URL } from './src/utilities/url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/protected': URL,
      '/account': URL,
      '/checkout': URL,
      '/review': URL
    },
  },
})
