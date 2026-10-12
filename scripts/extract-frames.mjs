#!/usr/bin/env node
/**
 * Utility script to convert the 12 generated 8-second background clips
 * (01.mp4 .. 12.mp4) into scroll-driven frame sequences in `public/frames/scene-XX/YYY.webp`.
 *
 * Usage:
 *   node scripts/extract-frames.mjs ./my-videos
 *
 * Requires `ffmpeg` installed on your system PATH.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const inputDir = process.argv[2] || './videos';
const outputBaseDir = path.resolve(process.cwd(), 'public', 'frames');
const framesPerClip = 60; // 60 frames per 8s clip = 7.5 fps (720 total frames across 12 clips)
const clipDurationSeconds = 8;
const fps = framesPerClip / clipDurationSeconds;

if (!fs.existsSync(inputDir)) {
  console.log(`[Info] Input directory "${inputDir}" not found.`);
  console.log(
    'Place your 12 8-second clips named 01.mp4 .. 12.mp4 inside a folder and run:'
  );
  console.log('  node scripts/extract-frames.mjs ./videos');
  process.exit(0);
}

for (let i = 1; i <= 12; i++) {
  const paddedScene = String(i).padStart(2, '0');
  const candidates = [
    path.join(inputDir, `${paddedScene}.mp4`),
    path.join(inputDir, `scene-${paddedScene}.mp4`),
    path.join(inputDir, `video-${paddedScene}.mp4`),
  ];

  const videoPath = candidates.find((p) => fs.existsSync(p));
  if (!videoPath) {
    console.warn(`[Skip] No video found for Scene ${paddedScene}`);
    continue;
  }

  const sceneOutDir = path.join(outputBaseDir, `scene-${paddedScene}`);
  fs.mkdirSync(sceneOutDir, { recursive: true });

  const outPattern = path.join(sceneOutDir, '%03d.webp');
  const cmd = `ffmpeg -y -i "${videoPath}" -vf "fps=${fps},scale=1920:-1:flags=lanczos" -vframes ${framesPerClip} -q:v 80 "${outPattern}"`;

  console.log(`[Extracting] Scene ${paddedScene} -> ${sceneOutDir}`);
  execSync(cmd, { stdio: 'inherit' });
}

console.log('\n[Done] All available scenes extracted to public/frames/!');
