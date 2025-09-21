import { defineCollection, z } from 'astro:content';

// 단순화된 개그 스키마
const gagSchema = z.object({
  // 핵심 필드
  title: z.string(),  // joke: 제목, pun: 질문
  body: z.string().optional(),  // joke: 본문(선택), pun: 답변(필수)
  type: z.enum(['joke', 'pun']).default('joke'),

  // 이미지 (모든 format에서 optional)
  imageUrl: z.string().optional(),  // 이미지 경로
  imageAlt: z.string().optional(),   // 접근성을 위한 alt 텍스트
  imageCaption: z.string().optional(), // 이미지 설명

  // 카테고리 & 태그
  category: z.enum([
    'developer-humor',
    'si-hell',
    'job-hunting',
    'code-review',
    'debugging',
    'overtime',
    'tech-interview',
    'ajae-gag',
    'seasonal',
    'economic',
    'trending'
  ]),
  tags: z.array(z.string()).default([]),

  // 메타데이터
  author: z.string().default('아재달레'),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  discussionNumber: z.number().optional(),
  featured: z.boolean().default(false),
  publishStatus: z.enum(['draft', 'published', 'archived']).default('published')
}).refine((data) => {
  // type별 필수 필드 검증
  // joke: body는 선택 (제목만 있는 짧은 개그 가능)
  // pun: body 필수 (답변)
  if (data.type === 'pun' && !data.body) {
    return false;
  }
  return true;
}, {
  message: "Pun type requires body field for the answer"
});

const gags = defineCollection({
  type: 'data',
  schema: gagSchema
});

export const collections = {
  gags
};

export type Gag = z.infer<typeof gagSchema>;