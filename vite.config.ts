import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['@radix-ui/react-toast', 'sonner', '@radix-ui/react-tooltip'],
  },
});