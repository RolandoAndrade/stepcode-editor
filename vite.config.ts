import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/stepcode-editor/',
  plugins: [react()],
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    include: [
      './src/stepcode.worker',
    ]
  }
})
