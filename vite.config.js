import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr({ include: '**/*.svg' })],

  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: 'dist',
  },
});
