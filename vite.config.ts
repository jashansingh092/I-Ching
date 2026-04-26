import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    assetsInlineLimit: 0, // Don't inline fonts as base64
    // 1. Disable minification to see raw output
    minify: 'esbuild',

    // 2. Disable source maps compression
    sourcemap: true,

    // 3. Force esbuild instead of rolldown for transforms
    target: 'esnext',
  },
  esbuild: {
    // Prevent any JSX string transforms
    jsxInject: undefined,
    keepNames: true,
  },
});
