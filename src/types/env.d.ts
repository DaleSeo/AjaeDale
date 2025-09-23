/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN?: string;
  readonly OPENAI_API_KEY?: string;
  readonly PUBLIC_REPO_OWNER: string;
  readonly PUBLIC_REPO_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
