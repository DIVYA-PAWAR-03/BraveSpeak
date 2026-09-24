import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Raise warning threshold (default 500 KB is too low for a rich app)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate cached chunks.
        // Each chunk is downloaded only once and cached by the browser.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React core — loaded first, very stable, long cache
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'vendor-react';
            }
            // Router
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Heavy animation library — separate so pages that don't use it
            // don't pay the cost
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // Charts (only used on StatisticsPage, loaded lazily)
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            // Icon library
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Everything else in node_modules
            return 'vendor-misc';
          }
        },
      },
    },
  },
})