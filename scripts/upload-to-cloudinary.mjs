// Uploads every video referenced by the portfolio site to Cloudinary and
// writes the resulting URLs to scripts/video-urls.json.
//
// Usage:
//   node --env-file=.env scripts/upload-to-cloudinary.mjs
//
// Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// in .env (see .env.example).
//
// Uploads in 20MB chunks via Cloudinary's large-file upload API, since
// single-request uploads get rejected (as an HTML error page, not JSON)
// once a file is too big for one request.

import { createHash, randomUUID } from "node:crypto";
import { open } from "node:fs/promises";
import { statSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary credentials. Fill in .env (see .env.example).");
  process.exit(1);
}

const publicDir = path.resolve(import.meta.dirname, "..", "public");
const CHUNK_SIZE = 20 * 1024 * 1024;

// Relative-to-public-dir paths for every video actually used by the site.
const videoPaths = [
  "for website.mp4",
  "ai videos/coffe ad.mp4",
  "before-after/roohid head talking b-and-f.mp4",
  "before-after/anusha 1st b-and-f.mp4",
  "before-after/raju before and after.mp4",
  "before-after/science promo b-and-f.mp4",
  "before-after/srinu sir b-and-f.mp4",
  "event promos/op6 anivversery promo.mp4",
  "event promos/promo1 by roohid.mp4",
  "event promos/event announcement.mp4",
  "event promos/iste event.mp4",
  "event promos/signature day 1.mp4",
  "event promos/dance video.mp4",
  "event promos/Podcast coming soon✨#podcastshow #contentcreator #videoediting #hyderabad #mbu.mp4",
  "head talking videos/reel for N2.mp4",
  "head talking videos/roohid head talking.mp4",
  "head talking videos/roohid reel op5.mp4",
  "head talking videos/starting promo for insta.mp4",
  "head talking videos/anusha maay day promo.mp4",
  "head talking videos/anusha maadam qurey.mp4",
  "head talking videos/anudha about sonum.mp4",
];

function publicIdFor(relPath) {
  // Stable, URL-safe public_id derived from the file path so re-runs overwrite
  // instead of duplicating, and Cloudinary doesn't choke on spaces/emoji.
  return createHash("sha1").update(relPath).digest("hex").slice(0, 16);
}

function sign(params) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(toSign + CLOUDINARY_API_SECRET).digest("hex");
}

async function readRange(fh, start, length) {
  const buffer = Buffer.alloc(length);
  const { bytesRead } = await fh.read(buffer, 0, length, start);
  return buffer.subarray(0, bytesRead);
}

async function uploadOne(relPath) {
  const absPath = path.join(publicDir, relPath);
  const totalSize = statSync(absPath).size;
  const timestamp = Math.floor(Date.now() / 1000);
  const public_id = publicIdFor(relPath);
  const signature = sign({ public_id, timestamp });
  const uploadId = randomUUID();
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`;

  const sizeMB = (totalSize / 1024 / 1024).toFixed(1);
  console.log(`Uploading ${relPath} (${sizeMB} MB)...`);

  const fh = await open(absPath, "r");
  try {
    let start = 0;
    let lastJson = null;
    let chunkNum = 0;
    const totalChunks = Math.ceil(totalSize / CHUNK_SIZE);

    while (start < totalSize) {
      const end = Math.min(start + CHUNK_SIZE, totalSize);
      chunkNum += 1;
      const buf = await readRange(fh, start, end - start);

      const form = new FormData();
      form.append("file", new Blob([buf]), path.basename(absPath));
      form.append("api_key", CLOUDINARY_API_KEY);
      form.append("timestamp", String(timestamp));
      form.append("public_id", public_id);
      form.append("signature", signature);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "X-Unique-Upload-Id": uploadId,
          "Content-Range": `bytes ${start}-${end - 1}/${totalSize}`,
        },
        body: form,
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(`Non-JSON response (status ${res.status}): ${text.slice(0, 300)}`);
      }
      if (!res.ok) {
        throw new Error(json.error?.message ?? JSON.stringify(json));
      }

      process.stdout.write(`  chunk ${chunkNum}/${totalChunks}\r`);
      lastJson = json;
      start = end;
    }

    console.log(`  done: ${lastJson.secure_url}`);
    return { relPath, url: lastJson.secure_url };
  } catch (err) {
    console.log(`  FAILED: ${err.message}`);
    return { relPath, error: err.message };
  } finally {
    await fh.close();
  }
}

const results = [];
for (const relPath of videoPaths) {
  results.push(await uploadOne(relPath));
}

const map = {};
for (const r of results) {
  if (r.url) map[r.relPath] = r.url;
}

const outPath = path.resolve(import.meta.dirname, "video-urls.json");
await writeFile(outPath, JSON.stringify(map, null, 2));

const failed = results.filter((r) => r.error);
console.log(`\n${results.length - failed.length}/${results.length} uploaded.`);
console.log(`URLs written to ${outPath}`);
if (failed.length) {
  console.log(
    "Failed:",
    failed.map((f) => `${f.relPath}: ${f.error}`)
  );
}
