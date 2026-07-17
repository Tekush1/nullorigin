import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // In local dev, forward API calls to the Node/SQLite backend (server.js)
      // running on :3000, so the app works the same as it does in production
      // once that backend is deployed behind the same domain.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
