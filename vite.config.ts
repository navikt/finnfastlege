import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, __dirname, "") };
  return {
    root: "src",

    define: {
      "process.env.NODE_ENV": env.NODE_ENV,
    },

    plugins: [
      basicSsl(),
      createHtmlPlugin({}),
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
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },

    build: {
      // Relative to the root
      outDir: "../dist",
      manifest: true,
      rollupOptions: {
        input: "./src/index.tsx",
      },
    },
  };
});
