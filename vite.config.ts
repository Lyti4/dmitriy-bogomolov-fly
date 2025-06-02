import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dmitriy-bogomolov-fly/',
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'public/images')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    global: 'globalThis',
    Buffer: 'Buffer',
  },
  optimizeDeps: {
    include: ['buffer']
  },
  assetsInclude: ['**/*.svg'],
  server: {
    host: '0.0.0.0',
    cors: { origin: '*', methods: ['GET', 'POST'], credentials: false }
  },
  publicDir: 'public', // Убедиться, что используется правильная директория для публичных файлов
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          splide: ['@splidejs/react-splide', '@splidejs/splide']
        }
      }
    },
  },
});
