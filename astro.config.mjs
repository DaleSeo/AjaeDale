import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import og from "astro-og";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), og()],
  output: "static",
  site: "https://www.ajaedale.com",
});
