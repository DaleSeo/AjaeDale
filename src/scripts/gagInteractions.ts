// 전역 개그 인터랙션 관리 스크립트
// localStorage 키
const STORAGE_KEY = "ajae-gag-saved";

// 전역 초기화 플래그
declare global {
  interface Window {
    gagInteractionsInitialized?: boolean;
  }
}

// 저장된 개그 가져오기
export function getSavedGags(): any[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// 개그 저장/제거
export function toggleSaveGag(gag: any): boolean {
  const saved = getSavedGags();
  const index = saved.findIndex((item: any) => item.slug === gag.slug);

  if (index > -1) {
    saved.splice(index, 1);
  } else {
    saved.push(gag);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  return index === -1;
}

// 개그가 저장되었는지 확인
export function isGagSaved(gagSlug: string): boolean {
  const saved = getSavedGags();
  return saved.some((gag: any) => gag.slug === gagSlug);
}

// UI 업데이트
export function updateSaveButtons(): void {
  document.querySelectorAll(".save-btn").forEach((btn: Element) => {
    const htmlBtn = btn as HTMLElement;
    const gag = JSON.parse(htmlBtn.dataset.gag || "{}");
    const bookmarkIcon = btn.querySelector(".bookmark-icon");
    const bookmarkCheckIcon = btn.querySelector(".bookmark-check-icon");

    if (isGagSaved(gag.slug)) {
      bookmarkIcon?.classList.add("hidden");
      bookmarkCheckIcon?.classList.remove("hidden");
    } else {
      bookmarkIcon?.classList.remove("hidden");
      bookmarkCheckIcon?.classList.add("hidden");
    }
  });
}

// 저장 버튼 이벤트 설정
export function setupSaveButtons(): void {
  document.querySelectorAll(".save-btn").forEach((btn: Element) => {
    // 이미 이벤트가 연결되어 있는지 확인
    if ((btn as any)._saveListenerAttached) return;
    (btn as any)._saveListenerAttached = true;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const htmlBtn = btn as HTMLElement;
      const gag = JSON.parse(htmlBtn.dataset.gag || "{}");
      toggleSaveGag(gag);
      updateSaveButtons();
    });
  });
}

// 공유 버튼 이벤트 설정
export function setupShareButtons(): void {
  document.querySelectorAll(".share-btn").forEach((btn: Element) => {
    // 이미 이벤트가 연결되어 있는지 확인
    if ((btn as any)._shareListenerAttached) return;
    (btn as any)._shareListenerAttached = true;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const htmlBtn = btn as HTMLElement;
      const content = htmlBtn.dataset.content || "";
      const slug = htmlBtn.dataset.slug || "";

      // Detect language from current URL
      const currentPath = window.location.pathname;
      const isEnglish = currentPath.startsWith("/en/");
      const urlPath = isEnglish ? `/en/gags/${slug}` : `/gags/${slug}`;
      const url = `${window.location.origin}${urlPath}`;

      if (navigator.share) {
        navigator.share({
          title: "아재개그",
          text: content,
          url: url,
        });
      } else {
        navigator.clipboard.writeText(`${content}\n${url}`).then(() => {
          const originalHtml = htmlBtn.innerHTML;
          htmlBtn.innerHTML = "✓";
          setTimeout(() => {
            htmlBtn.innerHTML = originalHtml;
          }, 1000);
        });
      }
    });
  });
}

// 스포일러 버튼 설정
export function setupSpoilers(): void {
  // Get current language from URL
  const currentPath = window.location.pathname;
  const currentLang = currentPath.startsWith("/en/") ? "en" : "ko";
  const showText = currentLang === "ko" ? "답변 보기 👀" : "Show Answer 👀";
  const hideText = currentLang === "ko" ? "답변 숨기기 🙈" : "Hide Answer 🙈";

  document.querySelectorAll(".spoiler-btn").forEach((btn) => {
    // 이미 이벤트가 연결되어 있는지 확인
    if ((btn as any)._spoilerListenerAttached) return;
    (btn as any)._spoilerListenerAttached = true;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const spoilerId = (btn as HTMLElement).dataset.spoilerId;
      const content = document.getElementById(`${spoilerId}-content`);

      if (content) {
        content.classList.toggle("hidden");
        btn.textContent = content.classList.contains("hidden")
          ? showText
          : hideText;
      }
    });
  });
}

// 전체 초기화 함수
export function initGagInteractions(): void {
  updateSaveButtons();
  setupSaveButtons();
  setupShareButtons();
  setupSpoilers();
}

// 전역 storage 이벤트 리스너 (한 번만 등록)
if (typeof window !== "undefined" && !window.gagInteractionsInitialized) {
  window.gagInteractionsInitialized = true;

  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      updateSaveButtons();
    }
  });

  // astro:page-load 이벤트에 전역 초기화 연결
  document.addEventListener("astro:page-load", initGagInteractions);
}
