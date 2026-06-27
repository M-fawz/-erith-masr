import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Root-relative asset URLs (required for Vercel).
  base: "/",
  // Preferred dev/preview port 5111; strictPort:false → auto-jump to the next
  // free port instead of crashing. usePolling: the project path contains
  // spaces + Arabic, which the default chokidar watcher misses on Windows.
  server: {
    port: 5111,
    host: true,
    strictPort: false,
    watch: { usePolling: true, interval: 250 },
  },
  preview: { port: 5111, host: true, strictPort: false },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the heavy animation lib in its own chunk for better caching.
        manualChunks: {
          motion: ["framer-motion"],
          i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector"],
        },
      },
    },
  },
});
