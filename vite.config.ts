import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 3000,
    headers: {
      "Service-Worker-Allowed": "/",
    },
  },
  build: {
    outDir: "./dist",
    sourcemap: true,
  },
  base: "/fastlege/",
  plugins: [react(), svgr({ include: "**/*.svg" })],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
