import { readdirSync, readFileSync } from "fs";
import { join } from "path";

/**
 * 개그 컬렉션의 중복을 검증하는 스크립트
 * - title 중복 검사
 * - slug 중복 검사
 * - 빌드 전/개발 서버 시작 전 실행
 */

function validateGags() {
  console.log("🔍 Validating gag collection...\n");

  const gagsDir = join(process.cwd(), "src/content/gags");
  const files = readdirSync(gagsDir).filter((f) => f.endsWith(".json"));

  const titles = new Map<string, string>();
  const slugs = new Map<string, string>();

  let hasErrors = false;

  files.forEach((file) => {
    const content = readFileSync(join(gagsDir, file), "utf-8");
    const gag = JSON.parse(content);

    // Title 중복 검사
    const existingTitleFile = titles.get(gag.title);
    if (existingTitleFile) {
      console.error(`❌ Duplicate title found: "${gag.title}"`);
      console.error(`   Conflict between:`);
      console.error(`   - ${existingTitleFile}`);
      console.error(`   - ${file}`);
      console.error("");
      hasErrors = true;
    } else {
      titles.set(gag.title, file);
    }

    // Slug 중복 검사
    const existingSlugFile = slugs.get(gag.slug);
    if (existingSlugFile) {
      console.error(`❌ Duplicate slug found: "${gag.slug}"`);
      console.error(`   Conflict between:`);
      console.error(`   - ${existingSlugFile}`);
      console.error(`   - ${file}`);
      console.error("");
      hasErrors = true;
    } else {
      slugs.set(gag.slug, file);
    }
  });

  if (hasErrors) {
    console.error("💥 Validation failed! Fix duplicates before proceeding.\n");
    process.exit(1);
  } else {
    console.log(`✅ All ${files.length} gags validated successfully!`);
    console.log(`   - ${titles.size} unique titles`);
    console.log(`   - ${slugs.size} unique slugs\n`);
  }
}

try {
  validateGags();
} catch (error) {
  console.error("❌ Validation script failed:", error);
  process.exit(1);
}
