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
    const answerTrigger = card.querySelector(
      ".answer-trigger",
    ) as HTMLDivElement;
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

    // 정답 공개 여부 상태
    let isRevealed = false;
    let isAnimating = false;

    // 정답 공개/숨김 토글 함수
    const toggleAnswer = async () => {
      // 애니메이션 중이면 무시
      if (isAnimating) {
        return;
      }

      const fullAnswer = answerText.getAttribute("data-answer");
      if (!fullAnswer) {
        return;
      }

      if (isRevealed) {
        // 정답 숨기기
        isAnimating = true;

        // 아이콘 전환: answer → question
        if (questionIcon && answerIcon) {
          answerIcon.style.opacity = "0";
          questionIcon.style.opacity = "1";
        }

        // 마스킹된 텍스트로 복원
        answerContent.classList.remove("text-primary");
        answerContent.classList.add("text-muted-foreground");
        answerContent.textContent = fullAnswer.replace(
          /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g,
          "●",
        );

        isRevealed = false;
        isAnimating = false;
      } else {
        // 정답 공개
        isAnimating = true;

        // 아이콘 전환: question → answer
        if (questionIcon && answerIcon) {
          questionIcon.style.opacity = "0";
          answerIcon.style.opacity = "1";
        }

        // 타이핑 효과 준비
        answerContent.textContent = "";
        answerContent.classList.remove("text-muted-foreground");
        answerContent.classList.add("text-primary");

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

        isRevealed = true;
        isAnimating = false;
      }
    };

    // 정답 텍스트 클릭 시 정답 토글
    answerText.addEventListener("click", toggleAnswer);

    // 이미지 클릭 시 정답 토글
    if (answerTrigger) {
      answerTrigger.addEventListener("click", toggleAnswer);
    }
  });
}
