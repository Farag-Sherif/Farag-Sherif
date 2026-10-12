import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  'public/images/profile',
  'public/images/projects',
  'src/assets',
];

async function run() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
    for (const file of files) {
      const inPath = path.join(dir, file);
      const outPath = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      const beforeSize = fs.statSync(inPath).size;
      await sharp(inPath)
        .webp({
          quality: 98,
          alphaQuality: 100,
          nearLossless: true,
          smartSubsample: true,
          effort: 6,
        })
        .toFile(outPath);
      const afterSize = fs.statSync(outPath).size;
      fs.unlinkSync(inPath);
      console.log(
        `Converted ${inPath} (${(beforeSize / 1024).toFixed(1)} KB) -> ${outPath} (${(afterSize / 1024).toFixed(1)} KB)`
      );
    }
  }
}

run();
