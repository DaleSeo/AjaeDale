/// <reference types="astro/client" />

interface ImportMetaEnv {
  // No environment variables needed for pure static site
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
