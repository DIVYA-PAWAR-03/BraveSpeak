import sharp from 'sharp';
import { existsSync, statSync, unlinkSync, renameSync } from 'fs';
import { join } from 'path';

const DIR = './public/images';
const files = [
  { src: 'news_10.webp', quality: 82, maxW: 1200 },
  { src: 'laws3.webp',   quality: 82, maxW: 1000 },
  { src: 'section_376.webp', quality: 82, maxW: 1000 },
];

for (const { src, quality, maxW } of files) {
  const input = join(DIR, src);
  const tmp   = input + '.new';
  if (!existsSync(input)) { console.log('skip', src); continue; }
  const before = statSync(input).size;
  await sharp(input).resize({ width: maxW, withoutEnlargement: true }).webp({ quality }).toFile(tmp);
  const after = statSync(tmp).size;
  unlinkSync(input);
  renameSync(tmp, input);
  console.log(`✅ ${src}: ${(before/1024).toFixed(1)} KB → ${(after/1024).toFixed(1)} KB`);
}
console.log('Done!');
