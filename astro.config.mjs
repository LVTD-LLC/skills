import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  outDir: "./site-dist",
  publicDir: "./assets",
  site: "https://skills.lvtd.dev",
});
