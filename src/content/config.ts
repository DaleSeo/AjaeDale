import { defineCollection, z } from "astro:content";

// 다국어 필드 스키마
const localizedString = z.object({
  ko: z.string(),
  en: z.string().default(""),
});

const localizedStringOptional = z.object({
  ko: z.string().optional(),
  en: z.string().optional(),
});

const localizedTags = z.object({
  ko: z.array(z.string()).default([]),
  en: z.array(z.string()).default([]),
});

// 다국어 개그 스키마
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

  // 핵심 필드 (다국어)
  title: localizedString, // 개그 제목/질문
  description: localizedStringOptional.optional(), // 본문/답변 (선택)

  // 태그 (다국어)
  tags: localizedTags.default({ ko: [], en: [] }),

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
