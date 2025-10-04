import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { slugToTag, getAllTagSlugs } from "../../../utils/tagUtils";

export const prerender = true;

export async function getStaticPaths() {
  const allGags = await getCollection(
    "gags",
    ({ data }: CollectionEntry<"gags">) => data.published,
  );

  // 모든 태그 수집
  const tagsSet = new Set<string>();
  allGags.forEach((gag: CollectionEntry<"gags">) => {
    gag.data.tags.forEach((tag: string) => tagsSet.add(tag));
  });

  // 각 태그에 대한 경로 생성
  return Array.from(tagsSet).map((tag) => {
    const allTagSlugs = getAllTagSlugs();
    const tagSlug = allTagSlugs.find(
      (slug) => slugToTag(slug)?.toLowerCase() === tag.toLowerCase(),
    );

    return {
      params: { slug: tagSlug || tag.toLowerCase() },
    };
  });
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 슬러그를 한글 태그로 변환
  const tagName = slugToTag(slug);

  if (!tagName) {
    return new Response(JSON.stringify({ error: "Tag not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 해당 태그를 가진 모든 개그 가져오기
  const allGags = await getCollection(
    "gags",
    ({ data }: CollectionEntry<"gags">) => data.published,
  );

  const filteredGags = allGags.filter((gag: CollectionEntry<"gags">) =>
    gag.data.tags.some(
      (tag: string) =>
        tag.toLowerCase() === tagName.toLowerCase() || tag === tagName,
    ),
  );

  const gags = filteredGags
    .sort(
      (a: CollectionEntry<"gags">, b: CollectionEntry<"gags">) =>
        b.data.createdAt.getTime() - a.data.createdAt.getTime(),
    )
    .map((gag: CollectionEntry<"gags">) => ({
      slug: gag.data.slug,
      lang: gag.data.lang,
      title: gag.data.title,
      description: gag.data.description,
      tags: gag.data.tags,
      featured: gag.data.featured,
      createdAt: gag.data.createdAt.toISOString(),
      updatedAt: gag.data.updatedAt?.toISOString(),
    }));

  return new Response(
    JSON.stringify(
      {
        tag: tagName,
        slug,
        count: gags.length,
        gags,
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};
