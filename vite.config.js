import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.jsx'),
      name: 'ChatPopupWidget',
      fileName: 'chat-popup',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
  define: {
    'process.env': {}, // <--- ключевая строка
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    'process.env.NODE_ENV': '"production"'
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
