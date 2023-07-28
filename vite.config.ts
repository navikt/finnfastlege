import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    svgr(),
    react({
      include: "**/*.{jsx,tsx}",
      babel: {
        plugins: ["babel-plugin-styled-components"],
      },
    }),
  ],

  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },

  build: {
    manifest: "asset-manifest.json", // Se https://github.com/navikt/navspa pga internflatedecorator
  },
});
