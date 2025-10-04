export const languages = {
  ko: "한국어",
  en: "English",
};

export const defaultLang = "ko";
export const showDefaultLang = false;

export const ui = {
  ko: {
    // 네비게이션
    "nav.home": "홈",
    "nav.latest": "최신",
    "nav.popular": "인기",
    "nav.random": "랜덤",
    "nav.tags": "분류",
    "nav.search": "검색",
    "nav.saved": "개그 저장",
    "nav.submit": "제보",
    "nav.toggleTheme": "테마 전환",
    "nav.toggleLanguage": "언어 전환",

    // 홈페이지
    "home.title": "홈",
    "home.hero.title": "아재달레",
    "home.hero.subtitle": "아재개그 웃어달레",
    "home.hero.description":
      "매일 새로운 아재개그를 만나보세요. 재미있는 개그부터 황당한 개그까지!",
    "home.today.title": "오늘의 개그",
    "home.today.subtitle": "매일 바뀌는 특별한 개그를 만나보세요",
    "home.today.badge": "TODAY",
    "home.today.viewMore": "자세히 보기",
    "home.popular.title": "인기 아재개그",
    "home.popular.subtitle": "가장 많은 사랑을 받고 있는 개그들이에요",
    "home.popular.viewMore": "인기 개그 더보기",
    "home.stats.total": "총 {count}개의 재미있는 개그가 기다리고 있어요!",
    "home.stats.randomBtn": "🎲 랜덤 개그 보기",
    "home.stats.searchBtn": "🔍 개그 검색하기",

    // 개그 상세
    "gag.question": "Q.",
    "gag.answer": "A.",
    "gag.share": "공유",
    "gag.save": "저장",
    "gag.related": "관련 개그",
    "gag.noRelated": "관련 개그가 없습니다",
    "gag.backToList": "목록으로",

    // 태그
    "tags.title": "태그",
    "tags.subtitle": "태그별로 개그를 찾아보세요",
    "tags.gagCount": "{count}개",
    "tags.filterByTag": "#{tag} 개그 모음",
    "tags.totalGags": "총 {count}개의 개그",

    // 검색
    "search.title": "검색",
    "search.description": "찾고 싶은 아재 개그를 검색해보세요",
    "search.placeholder": "개그 검색...",
    "search.hint": "개그 제목이나 내용으로 검색할 수 있습니다",
    "search.clearButton": "검색어 지우기",
    "search.noResults": "검색 결과가 없습니다",
    "search.tryAgain": "다른 키워드로 다시 검색해보세요",
    "search.searching": "검색 중...",

    // 인기 개그
    "popular.title": "인기 개그",
    "popular.subtitle": "가장 많은 사랑을 받고 있는 개그들",

    // 최신 개그
    "latest.title": "최신 개그",
    "latest.subtitle": "최근에 추가된 신선한 개그들",

    // 랜덤 개그
    "random.title": "랜덤 개그",
    "random.subtitle": "행운의 개그를 만나보세요",
    "random.nextBtn": "🎲 다음 개그",
    "random.viewDetail": "자세히 보기",

    // 저장된 개그
    "saved.title": "저장한 개그",
    "saved.subtitle": "나중에 다시 보고 싶은 개그들",
    "saved.empty": "저장된 개그가 없습니다",
    "saved.emptyDesc": "마음에 드는 개그를 저장해보세요!",

    // 개그 제보
    "submit.title": "개그 제보",
    "submit.description": "재미있는 아재개그를 알고 계신가요?",
    "submit.cta": "GitHub에서 제보하기",

    // API 문서
    "api.title": "개그 API",
    "api.description": "아재달레 개그 데이터를 자유롭게 사용하세요",
    "api.overview.title": "개요",
    "api.overview.description":
      "아재달레는 무료 REST API를 제공합니다. 모든 엔드포인트는 읽기 전용이며, 빌드 시점에 정적 JSON 파일로 생성됩니다.",
    "api.overview.feature1": "✅ 완전 무료 - 인증 불필요",
    "api.overview.feature2": "✅ CORS 지원 - 모든 도메인에서 접근 가능",
    "api.overview.feature3": "✅ 정적 파일 - 빠른 응답 속도",
    "api.overview.feature4": "✅ 읽기 전용 - GET 요청만 지원",
    "api.endpoints.gags.title": "개그 엔드포인트",
    "api.endpoints.gags.all.title": "모든 개그 조회",
    "api.endpoints.gags.all.description":
      "게시된 모든 개그를 최신순으로 반환합니다.",
    "api.endpoints.gags.single.title": "특정 개그 조회",
    "api.endpoints.gags.single.description":
      "slug로 특정 개그의 상세 정보를 조회합니다.",
    "api.endpoints.gags.featured.title": "인기 개그 조회",
    "api.endpoints.gags.featured.description":
      "featured로 표시된 인기 개그만 반환합니다.",
    "api.endpoints.gags.latest.title": "최신 개그 조회",
    "api.endpoints.gags.latest.description": "최신 20개의 개그를 반환합니다.",
    "api.endpoints.tags.title": "태그 엔드포인트",
    "api.endpoints.tags.all.title": "모든 태그 조회",
    "api.endpoints.tags.all.description":
      "모든 태그와 각 태그의 개그 수를 반환합니다.",
    "api.endpoints.tags.single.title": "태그별 개그 조회",
    "api.endpoints.tags.single.description":
      "특정 태그가 포함된 모든 개그를 반환합니다.",
    "api.cors.title": "CORS",
    "api.cors.description":
      "모든 API 엔드포인트는 CORS가 활성화되어 있어 어떤 도메인에서든 접근할 수 있습니다.",
    "api.usage.title": "사용 예시",
    "api.usage.description":
      "JavaScript에서 fetch API로 쉽게 사용할 수 있습니다:",
    "api.example": "예시 응답 보기",

    // 푸터
    "footer.copyright": "© 2025 아재달레. All rights reserved.",
    "footer.madeWith": "Made with ❤️ for 아재",
    "footer.description":
      "한국 아저씨들의 아재개그를 사랑하는 모든 분들을 위한 공간입니다. 매일 새로운 웃음을 선사해드립니다.",
    "footer.quickLinks": "바로가기",
    "footer.community": "커뮤니티",
    "footer.nav.latest": "최신 개그",
    "footer.nav.popular": "인기 개그",
    "footer.nav.random": "랜덤 개그",
    "footer.nav.tags": "개그 분류",
    "footer.nav.search": "개그 검색",
    "footer.nav.saved": "개그 저장",
    "footer.nav.submit": "개그 제보",
    "footer.nav.api": "개그 API",

    // 공통
    "common.loading": "로딩 중...",
    "common.error": "오류가 발생했습니다",
    "common.notFound": "페이지를 찾을 수 없습니다",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.latest": "Latest",
    "nav.popular": "Popular",
    "nav.random": "Random",
    "nav.tags": "Tags",
    "nav.search": "Search",
    "nav.saved": "Saved",
    "nav.submit": "Submit",
    "nav.toggleTheme": "Toggle theme",
    "nav.toggleLanguage": "Switch language",

    // Homepage
    "home.title": "Home",
    "home.hero.title": "AjaeDale",
    "home.hero.subtitle": "Korean Puns Collection",
    "home.hero.description":
      "Discover new Korean puns every day. From hilarious to absurd!",
    "home.today.title": "Today's Pun",
    "home.today.subtitle": "Discover a special pun that changes daily",
    "home.today.badge": "TODAY",
    "home.today.viewMore": "View More",
    "home.popular.title": "Popular Puns",
    "home.popular.subtitle": "The most loved puns by our community",
    "home.popular.viewMore": "View More Popular Puns",
    "home.stats.total": "{count} funny puns waiting for you!",
    "home.stats.randomBtn": "🎲 Random Pun",
    "home.stats.searchBtn": "🔍 Search Puns",

    // Gag Detail
    "gag.question": "Q.",
    "gag.answer": "A.",
    "gag.share": "Share",
    "gag.save": "Save",
    "gag.related": "Related Puns",
    "gag.noRelated": "No related puns",
    "gag.backToList": "Back to List",

    // Tags
    "tags.title": "Tags",
    "tags.subtitle": "Find puns by tags",
    "tags.gagCount": "{count} puns",
    "tags.filterByTag": "#{tag} Puns",
    "tags.totalGags": "{count} puns in total",

    // Search
    "search.title": "Search",
    "search.description": "Search for your favorite Korean puns",
    "search.placeholder": "Search puns...",
    "search.hint": "You can search by pun title or content",
    "search.clearButton": "Clear search",
    "search.noResults": "No results found",
    "search.tryAgain": "Try searching with different keywords",
    "search.searching": "Searching...",

    // Popular
    "popular.title": "Popular Puns",
    "popular.subtitle": "The most loved puns",

    // Latest
    "latest.title": "Latest Puns",
    "latest.subtitle": "Recently added fresh puns",

    // Random
    "random.title": "Random Pun",
    "random.subtitle": "Discover your lucky pun",
    "random.nextBtn": "🎲 Next Pun",
    "random.viewDetail": "View Detail",

    // Saved
    "saved.title": "Saved Puns",
    "saved.subtitle": "Puns you want to revisit",
    "saved.empty": "No saved puns",
    "saved.emptyDesc": "Save your favorite puns!",

    // Submit
    "submit.title": "Submit a Pun",
    "submit.description": "Know a funny Korean pun?",
    "submit.cta": "Submit on GitHub",

    // API Documentation
    "api.title": "Pun API",
    "api.description": "Use AjaeDale pun data freely",
    "api.overview.title": "Overview",
    "api.overview.description":
      "AjaeDale provides a free REST API. All endpoints are read-only and generated as static JSON files at build time.",
    "api.overview.feature1": "✅ Completely Free - No authentication required",
    "api.overview.feature2": "✅ CORS Enabled - Accessible from any domain",
    "api.overview.feature3": "✅ Static Files - Fast response times",
    "api.overview.feature4": "✅ Read-only - GET requests only",
    "api.endpoints.gags.title": "Pun Endpoints",
    "api.endpoints.gags.all.title": "Get All Puns",
    "api.endpoints.gags.all.description":
      "Returns all published puns sorted by creation date.",
    "api.endpoints.gags.single.title": "Get Single Pun",
    "api.endpoints.gags.single.description":
      "Get detailed information for a specific pun by slug.",
    "api.endpoints.gags.featured.title": "Get Featured Puns",
    "api.endpoints.gags.featured.description":
      "Returns only puns marked as featured.",
    "api.endpoints.gags.latest.title": "Get Latest Puns",
    "api.endpoints.gags.latest.description": "Returns the 20 most recent puns.",
    "api.endpoints.tags.title": "Tag Endpoints",
    "api.endpoints.tags.all.title": "Get All Tags",
    "api.endpoints.tags.all.description":
      "Returns all tags with pun counts for each tag.",
    "api.endpoints.tags.single.title": "Get Puns by Tag",
    "api.endpoints.tags.single.description":
      "Returns all puns containing a specific tag.",
    "api.cors.title": "CORS",
    "api.cors.description":
      "All API endpoints have CORS enabled and can be accessed from any domain.",
    "api.usage.title": "Usage Example",
    "api.usage.description": "Easy to use with the fetch API in JavaScript:",
    "api.example": "View Example Response",

    // Footer
    "footer.copyright": "© 2025 AjaeDale. All rights reserved.",
    "footer.madeWith": "Made with ❤️ for Dads",
    "footer.description":
      "A space for everyone who loves Korean puns. We bring you new laughs every day.",
    "footer.quickLinks": "Quick Links",
    "footer.community": "Community",
    "footer.nav.latest": "Latest",
    "footer.nav.popular": "Popular",
    "footer.nav.random": "Random",
    "footer.nav.tags": "Tags",
    "footer.nav.search": "Search",
    "footer.nav.saved": "Saved",
    "footer.nav.submit": "Submit",
    "footer.nav.api": "Pun API",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.notFound": "Page not found",
  },
} as const;
