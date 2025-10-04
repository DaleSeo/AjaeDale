// Google Analytics 초기화
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// 현재 스크립트 태그에서 GA ID 가져오기
const script = document.currentScript;
const gaId = script.getAttribute("data-ga-id");

if (gaId) {
  gtag("js", new Date());
  gtag("config", gaId);

  // View Transitions 지원
  document.addEventListener("astro:after-swap", () => {
    gtag("config", gaId, {
      page_path: window.location.pathname + window.location.search,
    });
  });
}
