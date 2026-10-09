/**
 * Static build for GitHub Pages (https://18noamphotos-blip.github.io/varosha/).
 * Separate from vite.config.ts so the Grok/Vercel build is untouched:
 * no Nitro server, no PGlite/auth dev plugins, no Grok PWA head injection.
 * The "/" route is prerendered to static HTML via TanStack Start.
 *
 *   npm run build:pages   ->  dist/client  (deployable static site)
 */
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/varosha/",
  resolve: { tsconfigPaths: true },
  // The client and SSR builds hash styles.css?url differently, so the
  // prerendered HTML would point at a CSS file that doesn't exist. A stable,
  // unhashed name for CSS keeps both builds in agreement.
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (info) =>
          info.names?.some((n) => n.endsWith(".css")) ? "assets/[name].css" : "assets/[name]-[hash][extname]",
      },
    },
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false },
      pages: [{ path: "/" }],
    }),
    viteReact(),
  ],
});
