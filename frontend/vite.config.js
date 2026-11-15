import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const sourceDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "src"
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(sourceDirectory, "components"),
      context: path.resolve(sourceDirectory, "context"),
      helpers: path.resolve(sourceDirectory, "helpers"),
      hooks: path.resolve(sourceDirectory, "hooks"),
      main: path.resolve(sourceDirectory, "main"),
      pages: path.resolve(sourceDirectory, "pages"),
      theme: path.resolve(sourceDirectory, "theme"),
    },
  },
  build: {
    outDir: "dist/public/js",
    lib: {
      entry: "src/indexAppOS.jsx",
      name: "AppOS",
      formats: ["iife"],
      fileName: () => "appOSV4.js",
    },
  },
});
