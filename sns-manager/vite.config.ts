import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import postcss from "./postcss.config.cjs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/social-media-manager/",
  plugins: [svelte()],
  css: {
    postcss,
  },
});
