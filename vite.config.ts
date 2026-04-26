import { defineConfig} from 'vite'
import type { Plugin } from 'vite'
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function katexStringInspectorPlugin(): Plugin {
  return {
    name: 'katex-string-inspector',
    transform(code, id) {
      if (id.includes('.tsx') || id.includes('.ts')) {
        if (code.includes('quad') || code.includes('lvert') || code.includes('InlineMath')) {
          console.log('\n[katex-inspector] found math in:', id)
          
          const matches = code.match(/["'`][^"'`]*\\[^"'`]*["'`]/g)
          if (matches) {
            matches.forEach(m => {
              console.log('  raw string in source :', m)
              console.log('  backslash count      :', (m.match(/\\/g) || []).length)
              console.log('  JSON repr            :', JSON.stringify(m))
            })
          } else {
            console.log('  WARNING: no backslash strings found — already stripped!')
          }
        }
      }
      return null
    },
    renderChunk(code) {
      if (code.includes('InlineMath') || code.includes('quad')) {
        console.log('\n[katex-inspector] renderChunk — checking final bundle...')
        const hasQuad = code.includes('\\\\quad') || code.includes('\\quad')
        const hasTmspace = code.includes('tmspace')
        console.log('  \\quad present in bundle :', hasQuad)
        console.log('  tmspace leaked into bundle:', hasTmspace)
        if (hasTmspace) {
          console.log('  !! KaTeX is pre-rendering at BUILD TIME — this is the bug')
        }
      }
      return null
    }
  }
}


export default defineConfig({
  plugins: [react(), tailwindcss(), katexStringInspectorPlugin()],
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
