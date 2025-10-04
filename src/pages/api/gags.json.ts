import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async () => {
  const allGags = await getCollection(
    "gags",
    ({ data }: CollectionEntry<"gags">) => data.published,
  );

  const gags = allGags
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

  return new Response(JSON.stringify(gags, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
