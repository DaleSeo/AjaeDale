import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import og from "astro-og";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), pagefind(), og()],
  output: "static",
  site: "https://www.ajaedale.com",
});
