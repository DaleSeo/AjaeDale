import { defineCollection, z } from "astro:content";

// 단순화된 개그 스키마
const gagSchema = z
  .object({
    slug: z.string(), // 영어 slug (SEO 친화적), 필수

    // 핵심 필드
    title: z.string(), // joke: 제목, pun: 질문
    body: z.string().optional(), // joke: 본문(선택), pun: 답변(필수)
    category: z.enum(["joke", "pun"]).default("joke"),

    // 태그
    tags: z.array(z.string()).default([]),

    // 메타데이터
    featured: z.boolean().default(false),
    published: z.boolean().default(true),

    // 시간 정보
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      // category별 필수 필드 검증
      // joke: body는 선택 (제목만 있는 짧은 개그 가능)
      // pun: body 필수 (답변)
      if (data.category === "pun" && !data.body) {
        return false;
      }
      return true;
    },
    {
      message: "Pun category requires body field for the answer",
    },
  );

const gags = defineCollection({
  type: "data",
  schema: gagSchema,
});

export const collections = {
  gags,
};

export type Gag = z.infer<typeof gagSchema>;
