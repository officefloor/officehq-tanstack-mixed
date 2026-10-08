import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// Build the SPA into Spring's static resources so the one jar serves it.
// emptyOutDir:false because outDir is outside the vite project root (avoids deleting sibling files).
export default defineConfig({
  plugins: [
    // Generates routeTree.gen.ts from routes/. The central route table is derived output; the
    // generated file is gitignored (a build artifact, never committed).
    tanstackRouter({
      target: 'react',
      routesDirectory: './routes',
      generatedRouteTree: './routeTree.gen.ts',
    }),
    react(), // must come AFTER the router plugin
  ],
  build: {
    outDir: '../resources/static',
    emptyOutDir: false,
  },
});
