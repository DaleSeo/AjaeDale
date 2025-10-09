import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const INPUT_IMAGE = "public/logo.png";
const OUTPUT_DIR = "public";

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
];

async function generateFavicons() {
  console.log("🎨 Generating favicons from logo.png...\n");

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate PNG favicons
  for (const { name, size } of sizes) {
    const outputPath = join(OUTPUT_DIR, name);

    await sharp(INPUT_IMAGE)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(outputPath);

    console.log(`✅ Generated ${name} (${size}x${size})`);
  }

  // Generate .ico file (16x16, 32x32, 48x48)
  const icoPath = join(OUTPUT_DIR, "favicon.ico");

  await sharp(INPUT_IMAGE)
    .resize(48, 48, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(icoPath);

  console.log(`✅ Generated favicon.ico (48x48)`);

  console.log("\n🎉 All favicons generated successfully!");
}

generateFavicons().catch((error) => {
  console.error("❌ Error generating favicons:", error);
  process.exit(1);
});
