import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const prerender = true;

export async function getStaticPaths() {
  const gags = await getCollection(
    "gags",
    ({ data }: CollectionEntry<"gags">) => data.published,
  );

  return gags.map((gag: CollectionEntry<"gags">) => ({
    params: { slug: gag.data.slug },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const gags = await getCollection(
    "gags",
    ({ data }: CollectionEntry<"gags">) => data.published,
  );
  const gag = gags.find((g: CollectionEntry<"gags">) => g.data.slug === slug);

  if (!gag) {
    return new Response(JSON.stringify({ error: "Gag not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = {
    slug: gag.data.slug,
    lang: gag.data.lang,
    title: gag.data.title,
    description: gag.data.description,
    tags: gag.data.tags,
    featured: gag.data.featured,
    createdAt: gag.data.createdAt.toISOString(),
    updatedAt: gag.data.updatedAt?.toISOString(),
  };

  return new Response(JSON.stringify(response, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
