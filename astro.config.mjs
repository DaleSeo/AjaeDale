import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), pagefind()],
  output: "static",
  site: "https://www.ajaedale.com",
});
