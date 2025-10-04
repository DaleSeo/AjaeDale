import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import og from "astro-og";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), og(), pagefind()],
  output: "static",
  site: "https://www.ajaedale.com",
  i18n: {
    locales: ["ko", "en"],
    defaultLocale: "ko",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
