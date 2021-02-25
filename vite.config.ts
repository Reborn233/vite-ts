import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {},
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://blog.csdn.net/weixin_45292658',
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
