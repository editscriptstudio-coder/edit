// Compresses the videos that exceed Cloudinary's 100MB free-tier upload cap
// down to a target size, using two-pass H.264 encoding for accurate size
// control. Originals in public/ are left untouched.
//
// Usage: node scripts/compress-large-videos.mjs

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve(import.meta.dirname, "..", "public");
const outDir = path.resolve(publicDir, "_compressed");

const FFMPEG =
  "C:/Users/vahit/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffmpeg.exe";
const FFPROBE =
  "C:/Users/vahit/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffprobe.exe";

const TARGET_MB = 90; // headroom under Cloudinary's 100MB cap
const AUDIO_BITRATE_BPS = 128_000;

// files that came back oversized from the Cloudinary upload, plus an
// optional max dimension for the rare portrait-4K source.
const jobs = [
  { relPath: "for website.mp4" },
  { relPath: "before-after/roohid head talking b-and-f.mp4" },
  { relPath: "before-after/science promo b-and-f.mp4" },
  { relPath: "before-after/srinu sir b-and-f.mp4" },
  { relPath: "event promos/promo1 by roohid.mp4" },
  { relPath: "head talking videos/roohid head talking.mp4" },
  { relPath: "head talking videos/roohid reel op5.mp4" },
  { relPath: "head talking videos/anudha about sonum.mp4", maxDim: 1920 },
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (d) => (stderr += d));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${path.basename(cmd)} exited ${code}\n${stderr.slice(-2000)}`));
    });
  });
}

async function probeDuration(absPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(FFPROBE, [
      "-v", "error",
      "-show_entries", "format=duration",
      "-of", "csv=p=0",
      absPath,
    ]);
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.on("close", (code) => {
      if (code === 0) resolve(parseFloat(out.trim()));
      else reject(new Error("ffprobe failed"));
    });
  });
}

async function compressOne(job, index) {
  const absIn = path.join(publicDir, job.relPath);
  const absOut = path.join(outDir, job.relPath);
  await mkdir(path.dirname(absOut), { recursive: true });

  const duration = await probeDuration(absIn);
  const totalBits = TARGET_MB * 8 * 1024 * 1024;
  const videoBitrateBps = Math.max(
    500_000,
    Math.floor(totalBits / duration) - AUDIO_BITRATE_BPS
  );
  const vb = `${Math.floor(videoBitrateBps / 1000)}k`;

  console.log(`Compressing ${job.relPath} (${duration.toFixed(1)}s, target ${vb} video)...`);

  const passLogPrefix = path.join(outDir, `ffmpeg2pass-${index}`);
  const scaleArgs = job.maxDim
    ? ["-vf", `scale='min(${job.maxDim},iw)':'min(${job.maxDim},ih)':force_original_aspect_ratio=decrease`]
    : [];

  await run(FFMPEG, [
    "-y", "-i", absIn,
    "-c:v", "libx264", "-b:v", vb,
    ...scaleArgs,
    "-pass", "1", "-passlogfile", passLogPrefix,
    "-an", "-f", "mp4", "NUL",
  ]);

  await run(FFMPEG, [
    "-y", "-i", absIn,
    "-c:v", "libx264", "-b:v", vb,
    ...scaleArgs,
    "-pass", "2", "-passlogfile", passLogPrefix,
    "-c:a", "aac", "-b:a", "128k",
    absOut,
  ]);

  console.log(`  -> ${absOut}`);
}

for (const [i, job] of jobs.entries()) {
  await compressOne(job, i);
}

console.log("\nDone. Compressed files are in public/_compressed/");
