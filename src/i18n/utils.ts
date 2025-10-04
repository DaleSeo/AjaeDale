import { ui, defaultLang, showDefaultLang, languages } from "../i18n/ui";

export type Lang = keyof typeof ui;

// Export for use in other modules
export { showDefaultLang, defaultLang, languages };

// Helper to get all locales for getStaticPaths
export function getStaticPathsLocales() {
  return Object.keys(languages).map((lang) =>
    !showDefaultLang && lang === defaultLang ? undefined : lang,
  );
}

// Helper to normalize lang param (undefined -> defaultLang)
export function normalizeLang(lang: string | undefined): Lang {
  return (lang || defaultLang) as Lang;
}

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

// URL 생성 헬퍼
export function getLocalizedUrl(path: string, lang: Lang): string {
  if (!showDefaultLang && lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

// 현재 경로의 다른 언어 버전 URL 생성
export function getAlternateUrl(currentUrl: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(currentUrl);
  let path = currentUrl.pathname;

  // 현재 언어 prefix 제거
  if (!showDefaultLang && currentLang === defaultLang) {
    // 기본 언어는 prefix 없음 - path 그대로 유지
  } else if (currentLang !== defaultLang) {
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
