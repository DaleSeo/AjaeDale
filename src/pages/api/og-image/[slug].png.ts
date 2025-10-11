import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import sharp from "sharp";
import { readFile } from "fs/promises";
import { join } from "path";

type GagEntry = CollectionEntry<"gags">;

export async function getStaticPaths() {
  const gags = await getCollection(
    "gags",
    ({ data }: GagEntry) => data.published,
  );

  return gags.map((gag: GagEntry) => ({
    params: { slug: gag.data.slug },
    props: { gag },
  }));
}

export const GET: APIRoute = async () => {
  try {
    // 랜덤 Q/A 이미지 선택 (1-10)
    const questionNum = Math.floor(Math.random() * 10) + 1;
    const answerNum = Math.floor(Math.random() * 12) + 1;

    const questionPath = join(
      process.cwd(),
      "src/assets",
      `Q${String(questionNum).padStart(2, "0")}.png`,
    );
    const answerPath = join(
      process.cwd(),
      "src/assets",
      `A${String(answerNum).padStart(2, "0")}.png`,
    );

    // 이미지 로드
    const [questionBuffer, answerBuffer] = await Promise.all([
      readFile(questionPath),
      readFile(answerPath),
    ]);

    // 이미지 리사이즈 (각각 600x630으로)
    const [questionImage, answerImage] = await Promise.all([
      sharp(questionBuffer).resize(600, 630, { fit: "contain" }).toBuffer(),
      sharp(answerBuffer).resize(600, 630, { fit: "contain" }).toBuffer(),
    ]);

    // 배경 생성 및 이미지 합치기
    const ogImage = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite([
        { input: questionImage, left: 0, top: 0 },
        { input: answerImage, left: 600, top: 0 },
      ])
      .png()
      .toBuffer();

    return new Response(ogImage as BodyInit, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating og-image:", error);

    // 에러 시 기본 이미지 반환
    try {
      const logoPath = join(process.cwd(), "src/assets", "logo.png");
      const logoBuffer = await readFile(logoPath);
      const fallbackImage = await sharp(logoBuffer)
        .resize(1200, 630, { fit: "contain", background: "#ffffff" })
        .png()
        .toBuffer();

      return new Response(fallbackImage as BodyInit, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000",
        },
      });
    } catch {
      return new Response("Error generating image", { status: 500 });
    }
  }
};
