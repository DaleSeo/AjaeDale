import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { tagToSlug } from "../../utils/tagUtils";

export const prerender = true;

export const GET: APIRoute = async () => {
  const allGags = await getCollection(
    "gags",
    ({ data }: CollectionEntry<"gags">) => data.published,
  );

  // 태그별 개그 수 집계
  const tagCounts = new Map<string, number>();

  allGags.forEach((gag: CollectionEntry<"gags">) => {
    gag.data.tags.forEach((tag: string) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  // 태그 목록 생성 (개그 수가 많은 순으로 정렬)
  const tags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({
      name: tag,
      slug: tagToSlug(tag),
      count,
    }));

  return new Response(JSON.stringify(tags, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
