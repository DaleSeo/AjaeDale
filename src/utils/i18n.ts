// 언어 설정
export const languages = {
  ko: "한국어",
  en: "English",
};

export const defaultLang = "ko";
export const showDefaultLang = false;

export type Lang = keyof typeof languages;

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
  if (lang in languages) return lang as Lang;
  return defaultLang as Lang;
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

// Translation helper
export function useTranslations(lang: Lang) {
  return (ko: string, en: string) => (lang === "en" ? en : ko);
}
