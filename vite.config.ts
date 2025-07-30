import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  return {
    server: {
      host: "::",
      port: 8080,
      // Security headers for development
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
    
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      
      // Bundle analyzer (only in production)
      isProduction && visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      
      // Compression
      isProduction && compression({
        algorithm: 'gzip',
        ext: '.gz'
      }),
      isProduction && compression({
        algorithm: 'brotliCompress',
        ext: '.br'
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
      minify: isProduction ? 'terser' : false,
      
      // Bundle optimization
      rollupOptions: {
        output: {
          // Code splitting for better performance
          manualChunks: isProduction ? {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
            supabase: ['@supabase/supabase-js'],
            query: ['@tanstack/react-query'],
          } : undefined,
          
          // Add content hash for cache busting
          entryFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]',
        },
      },
      
      // Security headers for production
      ...(isProduction && {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.debug'],
          },
          mangle: {
            safari10: true,
          },
        },
      }),
      
      // Performance optimizations
      target: 'es2015',
      cssTarget: 'chrome80',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
    },
    
    // Environment variable validation
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __ENVIRONMENT__: JSON.stringify(mode),
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        '@tanstack/react-query',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
      ],
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
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
  };
});
