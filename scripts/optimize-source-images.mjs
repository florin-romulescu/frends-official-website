/**
 * Downscale the source photos in src/assets/img to the largest size the site
 * actually renders them at.
 *
 * Assets exported from Figma come out at their original capture resolution —
 * the hero photo arrived as a 4096px, 13 MB JPEG. `astro:assets` generates
 * correct responsive variants from that, but the `src` fallback it emits is the
 * full-size image, and the originals still land in git at ~49 MB.
 *
 * Run this after pulling new assets out of Figma. It rewrites the files in
 * place, so it is idempotent — a second run finds them already small enough and
 * `withoutEnlargement` keeps it from upscaling anything.
 */
import sharp from 'sharp';
import { readdir, stat, rename } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = 'src/assets/img';

/** file -> widest width the layout ever asks for, plus retina headroom. */
const MAX_WIDTH = {
  'hero-group.jpg': 1680,
  'about-group.jpg': 1680,
  'goals-bg.jpg': 1660,
  'events-bg.jpg': 1100,
  'impact-poster.jpg': 1024,
  'impact-event.jpg': 1024,
  'impact-greenup.jpg': 1024,
  'sky.jpg': 1280,
};

let before = 0;
let after = 0;

for (const file of (await readdir(DIR)).sort()) {
  const path = join(DIR, file);
  const target = MAX_WIDTH[file];
  if (!target) {
    console.log(`  skip     ${file} — no width budget declared`);
    continue;
  }

  const start = (await stat(path)).size;
  const { width: sourceWidth } = await sharp(path).metadata();
  const tmp = `${path}.tmp`;

  await sharp(path)
    .resize({ width: Math.min(target, sourceWidth), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(tmp);
  await rename(tmp, path);

  const end = (await stat(path)).size;
  before += start;
  after += end;
  console.log(
    `  ${file.padEnd(20)} ${sourceWidth}px ${(start / 1e6).toFixed(1)} MB  ->  ` +
      `${Math.min(target, sourceWidth)}px ${(end / 1e6).toFixed(2)} MB`,
  );
}

console.log(`\n  total ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
