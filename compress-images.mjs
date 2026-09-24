/**
 * compress-images.mjs
 * Converts large images in public/images/ to optimised WebP using sharp.
 * Run: node compress-images.mjs
 */
import sharp from 'sharp';
import { existsSync, statSync, renameSync } from 'fs';
import { join, basename } from 'path';

const IMG_DIR = './public/images';

// ── Images to compress (sorted by current size, largest first) ──────────────
const targets = [
  // Huge PNGs/JPGs → WebP at 80% quality, max 1400px wide
  { src: 'news_7.png',  quality: 80, maxW: 1400 },
  { src: 'news_9.png',  quality: 80, maxW: 1400 },
  { src: 'help.jpg',   quality: 80, maxW: 1400 },
  { src: 'brave.png',  quality: 82, maxW: 1400 },
  { src: 'news_8.png', quality: 80, maxW: 1400 },
  // Medium images
  { src: 'laws1.png',  quality: 82, maxW: 1200 },
  { src: 'laws4.png',  quality: 82, maxW: 1200 },
  { src: 'news_6.png', quality: 80, maxW: 1200 },
  { src: 'news_10.webp',quality: 82, maxW: 1200 },
  { src: 'ratio.jpg',  quality: 82, maxW: 1200 },
  { src: 'BraveSpeak111.png', quality: 85, maxW: 800 },
  { src: 'BraveSpeakLogoo.png', quality: 85, maxW: 400 },
  { src: 'laws3.webp', quality: 82, maxW: 1000 },
  { src: 'Rape-victims.jpg', quality: 80, maxW: 1200 },
  { src: 'section_376.webp', quality: 82, maxW: 1000 },
];

function fmtSize(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

let totalSavedBytes = 0;

for (const { src, quality, maxW } of targets) {
  const inputPath  = join(IMG_DIR, src);
  const outputPath = join(IMG_DIR, src.replace(/\.(png|jpg|jpeg|webp)$/i, '.webp'));
  const isSameFile = inputPath.toLowerCase() === outputPath.toLowerCase();

  if (!existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${src} — file not found`);
    continue;
  }

  const beforeBytes = statSync(inputPath).size;

  // Write to a temp file first, then rename to avoid clobbering the input
  const tempPath = outputPath + '.tmp';

  try {
    await sharp(inputPath)
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality })
      .toFile(tempPath);

    const afterBytes = statSync(tempPath).size;
    const saved = beforeBytes - afterBytes;
    totalSavedBytes += saved;

    // If input != output (different extension), keep original as backup
    if (!isSameFile && existsSync(outputPath)) {
      // overwrite existing webp
    }
    // Move temp → final output
    if (existsSync(outputPath)) {
      // remove old first on Windows
      import('fs').then(({ rmSync }) => { try { rmSync(outputPath); } catch {} });
    }
    renameSync(tempPath, outputPath);

    console.log(
      `✅ ${basename(outputPath).padEnd(28)} ${fmtSize(beforeBytes).padStart(9)} → ${fmtSize(afterBytes).padStart(9)}  (saved ${fmtSize(saved)})`
    );
  } catch (err) {
    console.error(`❌ Failed ${src}: ${err.message}`);
    if (existsSync(tempPath)) {
      try { renameSync(tempPath, outputPath); } catch {}
    }
  }
}

console.log(`\n🎉 Total space saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
