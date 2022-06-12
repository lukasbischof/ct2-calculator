import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import ViteRsw from 'vite-plugin-rsw';

export default defineConfig({
  plugins: [ViteRsw(), solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
