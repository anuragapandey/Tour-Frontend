import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = path.resolve("public/destinations");
const maxWidth = 1200;
const quality = 68;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const files = await walk(rootDir);
let beforeTotal = 0;
let afterTotal = 0;
let changed = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  beforeTotal += before;

  const source = await readFile(file);
  const input = sharp(source).rotate();
  const metadata = await input.metadata();
  const targetWidth = metadata.width && metadata.width > maxWidth ? maxWidth : metadata.width;

  const compressed = await input
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();

  if (compressed.length < before) {
    await writeFile(file, compressed);
    changed += 1;
    afterTotal += compressed.length;
  } else {
    afterTotal += before;
  }
}

console.log(`Images scanned: ${files.length}`);
console.log(`Images changed: ${changed}`);
console.log(`Before: ${formatBytes(beforeTotal)}`);
console.log(`After: ${formatBytes(afterTotal)}`);
console.log(`Saved: ${formatBytes(beforeTotal - afterTotal)}`);
