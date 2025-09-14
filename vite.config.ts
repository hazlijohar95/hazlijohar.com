import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

// Fix __dirname for ESM mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  return {
    server: {
      host: true, // Fix: use true instead of "::" for better compatibility
      port: 8080,
      // Security headers for development
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        // Removed obsolete X-XSS-Protection header
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },

    plugins: [
      react(),
      isDevelopment && componentTagger(), // Fix: use isDevelopment instead of mode comparison

      // Bundle analyzer (only in production)
      isProduction && visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),

      // Simplified compression - just gzip for debugging
      isProduction && compression({
        algorithm: 'gzip',
        ext: '.gz'
      }),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      // Security optimizations
      sourcemap: isDevelopment,
      minify: isProduction ? 'esbuild' : false, // Fix: switch from terser to esbuild

      // Bundle optimization
      rollupOptions: {
        output: {
          // Fix: Remove manual chunking that was causing export conflicts
          // Let Rollup auto-chunk for now

          // Add content hash for cache busting
          entryFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name].[hash][extname]' : 'assets/[name][extname]', // Fix: [extname] instead of [ext]
        },
      },

      // Remove terser options since we're using esbuild

      // Performance optimizations
      target: 'es2017', // Better modern baseline
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
    },

    // Environment variable validation
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __ENVIRONMENT__: JSON.stringify(mode),
    },

    // Simplified optimizeDeps - remove over-specification
    optimizeDeps: {
      exclude: ['@vite/client', '@vite/env'],
    },

    // CSS optimization
    css: {
      devSourcemap: isDevelopment,
    },

    // Preview server (for testing production build)
    preview: {
      port: 4173,
      host: true,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        // Removed obsolete X-XSS-Protection header
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
  };
});