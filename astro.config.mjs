import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  integrations: [pagefind()],
  output: "static",
  site: "https://www.ajaedale.com",
});
