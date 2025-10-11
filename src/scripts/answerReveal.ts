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
    const answerLabel = card.querySelector(".answer-label") as HTMLSpanElement;
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

    // 중복 초기화 방지
    if (answerText.hasAttribute("data-initialized")) {
      return;
    }
    answerText.setAttribute("data-initialized", "true");

    // 답변 텍스트 클릭 시 답변 공개
    answerText.addEventListener("click", async () => {
      const fullAnswer = answerText.getAttribute("data-answer");
      if (!fullAnswer) {
        return;
      }

      // 클릭 이벤트 제거 (한 번만 실행)
      answerText.style.cursor = "default";
      answerText.style.pointerEvents = "none";

      // 아이콘 전환: question → answer
      if (questionIcon && answerIcon) {
        questionIcon.style.opacity = "0";
        answerIcon.style.opacity = "1";
      }

      // 타이핑 효과 준비
      answerContent.textContent = "";
      answerContent.classList.remove("text-muted-foreground");
      answerContent.classList.add("text-primary");

      // 레이블 색상도 변경
      if (answerLabel) {
        answerLabel.classList.remove("text-muted-foreground");
        answerLabel.classList.add("text-primary");
      }

      // 커서 효과 (옵션)
      let cursor: HTMLSpanElement | null = null;
      if (showCursor) {
        cursor = document.createElement("span");
        cursor.className = "typing-cursor";
        cursor.textContent = "|";
        cursor.style.animation = "blink 0.7s infinite";
        answerContent.appendChild(cursor);
      }

      // 타이핑 효과로 답변 표시
      for (let i = 0; i < fullAnswer.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        if (cursor) {
          cursor.before(fullAnswer[i]);
        } else {
          answerContent.textContent = fullAnswer.substring(0, i + 1);
        }
      }

      // 커서 제거
      if (cursor) {
        cursor.remove();
      }

      // 완료 애니메이션 (옵션)
      if (completionAnimation) {
        answerText.style.transform = "scale(1.02)";
        setTimeout(() => {
          answerText.style.transform = "scale(1)";
        }, 200);
      }
    });
  });
}
