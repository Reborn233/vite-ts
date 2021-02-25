import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {},
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://1270.0.0.1:9090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: ['es2015'],
    outDir: 'build',
  },
});
