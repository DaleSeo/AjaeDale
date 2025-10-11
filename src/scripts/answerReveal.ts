/**
 * 정답 공개 기능을 위한 공통 유틸리티
 */

interface AnswerRevealOptions {
  /** 타이핑 속도 (밀리초, 기본값: 50) */
  typingSpeed?: number;
  /** 커서 효과 표시 여부 (기본값: false) */
  showCursor?: boolean;
  /** 완료 애니메이션 표시 여부 (기본값: false) */
  completionAnimation?: boolean;
}

/**
 * 정답 공개 기능 초기화
 * @param container 검색 범위 (기본값: document)
 * @param options 커스터마이징 옵션
 */
export function initAnswerReveal(
  container: Element | Document = document,
  options: AnswerRevealOptions = {},
): void {
  const {
    typingSpeed = 50,
    showCursor = false,
    completionAnimation = false,
  } = options;

  const elements =
    container instanceof Document
      ? container.querySelectorAll("[data-gag-slug]")
      : [container];

  elements.forEach((card) => {
    const answerText = card.querySelector(
      ".answer-text",
    ) as HTMLParagraphElement;
    const answerContent = card.querySelector(
      ".answer-content",
    ) as HTMLSpanElement;
    const questionIcon = card.querySelector(
      ".question-icon",
    ) as HTMLImageElement;
    const answerIcon = card.querySelector(".answer-icon") as HTMLImageElement;

    if (!answerText || !answerContent) {
      return;
    }

    // 이미 공개된 답변은 재초기화하지 않음
    if (answerText.style.pointerEvents === "none") {
      return;
    }

    // 기존 이벤트 리스너 제거를 위해 클론 생성
    const newAnswerText = answerText.cloneNode(true) as HTMLParagraphElement;
    answerText.parentNode?.replaceChild(newAnswerText, answerText);

    // 새로운 요소에 이벤트 리스너 추가
    newAnswerText.addEventListener("click", async () => {
      const fullAnswer = newAnswerText.getAttribute("data-answer");
      if (!fullAnswer) {
        return;
      }

      // 클릭 이벤트 제거 (한 번만 실행)
      newAnswerText.style.cursor = "default";
      newAnswerText.style.pointerEvents = "none";

      // 아이콘 전환: question → answer
      if (questionIcon && answerIcon) {
        questionIcon.style.opacity = "0";
        answerIcon.style.opacity = "1";
      }

      // 타이핑 효과 준비
      const newAnswerContent = newAnswerText.querySelector(
        ".answer-content",
      ) as HTMLSpanElement;
      if (!newAnswerContent) return;

      newAnswerContent.textContent = "";
      newAnswerContent.classList.remove("text-muted-foreground");
      newAnswerContent.classList.add("text-primary");

      // 커서 효과 (옵션)
      let cursor: HTMLSpanElement | null = null;
      if (showCursor) {
        cursor = document.createElement("span");
        cursor.className = "typing-cursor";
        cursor.textContent = "|";
        cursor.style.animation = "blink 0.7s infinite";
        newAnswerContent.appendChild(cursor);
      }

      // 타이핑 효과로 답변 표시
      for (let i = 0; i < fullAnswer.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        if (cursor) {
          cursor.before(fullAnswer[i]);
        } else {
          newAnswerContent.textContent = fullAnswer.substring(0, i + 1);
        }
      }

      // 커서 제거
      if (cursor) {
        cursor.remove();
      }

      // 완료 애니메이션 (옵션)
      if (completionAnimation) {
        newAnswerText.style.transform = "scale(1.02)";
        setTimeout(() => {
          newAnswerText.style.transform = "scale(1)";
        }, 200);
      }
    });
  });
}
