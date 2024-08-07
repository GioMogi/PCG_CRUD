import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PCG_CRUD/', // Replace with your GitHub repository name
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
});
