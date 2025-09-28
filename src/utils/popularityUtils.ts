import type { GagWithLikes } from "./discussionsApi";

/**
 * 인기 개그 정렬
 * likes 수가 높은 순으로 정렬
 */
export function sortGagsByPopularity(gags: GagWithLikes[]): GagWithLikes[] {
  return [...gags].sort((a, b) => {
    // likes가 같으면 최신순으로 정렬
    if (b.likes === a.likes) {
      return (
        new Date(b.data.createdAt).getTime() -
        new Date(a.data.createdAt).getTime()
      );
    }
    return b.likes - a.likes;
  });
}

/**
 * 상위 N개의 인기 개그 가져오기
 */
export function getTopGags(
  gags: GagWithLikes[],
  limit: number,
): GagWithLikes[] {
  return sortGagsByPopularity(gags).slice(0, limit);
}

/**
 * 최소 likes 수 이상인 개그만 필터링
 */
export function filterGagsByMinLikes(
  gags: GagWithLikes[],
  minLikes: number,
): GagWithLikes[] {
  return gags.filter((gag) => gag.likes >= minLikes);
}

/**
 * 개그 인기도 레벨 계산
 */
export function getPopularityLevel(
  likes: number,
): "hot" | "popular" | "normal" {
  if (likes >= 10) return "hot"; // 10개 이상: 매우 인기
  if (likes >= 5) return "popular"; // 5개 이상: 인기
  return "normal"; // 그 외: 일반
}

/**
 * 인기도 표시 텍스트
 */
export function getPopularityDisplay(likes: number): string {
  if (likes === 0) return "";
  if (likes >= 10) return `🔥 ${likes}`;
  if (likes >= 5) return `⭐ ${likes}`;
  return `👍 ${likes}`;
}
