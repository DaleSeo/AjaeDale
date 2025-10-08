import type { CollectionEntry } from "astro:content";

type GagEntry = CollectionEntry<"gags">;

interface GagWithScore extends GagEntry {
  score: number;
}

/**
 * 현재 개그와 관련된 개그들을 추천합니다.
 *
 * @param currentGag 현재 개그
 * @param allGags 전체 개그 목록
 * @param count 추천할 개그 개수 (기본값: 6)
 * @returns 추천 개그 목록
 */
export function getRecommendedGags(
  currentGag: GagEntry,
  allGags: GagEntry[],
  count: number = 6,
): GagEntry[] {
  // 현재 개그를 제외한 나머지 개그들
  const otherGags = allGags.filter(
    (gag) => gag.data.slug !== currentGag.data.slug,
  );

  // 태그 기반으로 점수 계산
  const gagsWithScore: GagWithScore[] = otherGags.map((gag) => {
    const commonTags = gag.data.tags.filter((tag: string) =>
      currentGag.data.tags.includes(tag),
    );
    return {
      ...gag,
      score: commonTags.length,
    };
  });

  // 점수가 높은 순으로 정렬
  const sortedGags = gagsWithScore.sort((a, b) => b.score - a.score);

  // 태그가 겹치는 개그들만 선택
  const tagBasedGags = sortedGags.filter((gag) => gag.score > 0);

  // 추천할 개그 목록
  let recommendedGags: GagEntry[] = [];

  // 태그 기반 추천이 있으면 먼저 추가
  if (tagBasedGags.length > 0) {
    recommendedGags = tagBasedGags.slice(0, count);
  }

  // 부족한 개수만큼 랜덤으로 채우기
  if (recommendedGags.length < Math.min(count, 3)) {
    // 이미 선택된 개그를 제외한 나머지
    const selectedSlugs = new Set(recommendedGags.map((gag) => gag.data.slug));
    const remainingGags = otherGags.filter(
      (gag) => !selectedSlugs.has(gag.data.slug),
    );

    // 랜덤으로 섞기
    const shuffled = remainingGags.sort(() => Math.random() - 0.5);

    // 부족한 개수만큼 추가 (최소 3개는 보장)
    const neededCount = Math.min(count, 3) - recommendedGags.length;
    recommendedGags = [...recommendedGags, ...shuffled.slice(0, neededCount)];
  }

  return recommendedGags.slice(0, count);
}
