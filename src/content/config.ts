import { defineCollection, z } from "astro:content";

// 단순화된 개그 스키마
const gagSchema = z.object({
  slug: z.string().refine((slug) => {
    const reservedPaths = [
      "random",
      "search",
      "tags",
      "index",
      "about",
      "gags",
    ];
    return !reservedPaths.includes(slug);
  }, "Slug cannot be a reserved path"), // 영어 slug (SEO 친화적), 필수

  // 핵심 필드
  title: z.string(), // 개그 제목/질문
  description: z.string().optional(), // 본문/답변 (선택)

  // 태그
  tags: z.array(z.string()).default([]),

  // 메타데이터
  featured: z.boolean().default(false),
  published: z.boolean().default(true),

  // 시간 정보
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

const gags = defineCollection({
  type: "data",
  schema: gagSchema,
});

export const collections = {
  gags,
};

export type Gag = z.infer<typeof gagSchema>;
