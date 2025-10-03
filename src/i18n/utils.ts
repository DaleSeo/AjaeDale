import { ui, defaultLang } from "../i18n/ui";
import type { CollectionEntry } from "astro:content";

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang as Lang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedGag(
  gag: CollectionEntry<"gags">,
  lang: Lang,
): {
  title: string;
  description?: string;
  tags: string[];
} {
  return {
    title: gag.data.title[lang] || gag.data.title.ko,
    description: gag.data.description?.[lang] || gag.data.description?.ko,
    tags: gag.data.tags[lang] || gag.data.tags.ko,
  };
}

// URL 생성 헬퍼
export function getLocalizedUrl(path: string, lang: Lang): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

// 현재 경로의 다른 언어 버전 URL 생성
export function getAlternateUrl(currentUrl: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(currentUrl);
  let path = currentUrl.pathname;

  // 현재 언어 prefix 제거
  if (currentLang !== defaultLang) {
    path = path.replace(new RegExp(`^/${currentLang}`), "");
  }

  // 대상 언어 prefix 추가
  return getLocalizedUrl(path || "/", targetLang);
}

// 번역 헬퍼 (변수 치환 지원)
export function translate(
  lang: Lang,
  key: keyof (typeof ui)[typeof defaultLang],
  vars?: Record<string, string | number>,
): string {
  let text: string = ui[lang][key] || ui[defaultLang][key];

  if (vars) {
    Object.entries(vars).forEach(([varKey, value]) => {
      text = text.replace(`{${varKey}}`, String(value));
    });
  }

  return text;
}
