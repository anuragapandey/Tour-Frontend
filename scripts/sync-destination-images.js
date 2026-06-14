import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const sourceRoot = process.argv[2] || "C:\\Users\\DELL\\Desktop\\pic";
const publicRoot = path.join(projectRoot, "public", "destinations");
const dataFile = path.join(projectRoot, "src", "data", "destinations.js");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const maxWidth = Number(process.env.DESTINATION_IMAGE_WIDTH || 1600);
const quality = Number(process.env.DESTINATION_IMAGE_QUALITY || 80);

const folderToDestinationId = {
  "amritsar": "amritsar",
  "andaman": "andaman",
  "chikmagalur": "chikmagalur",
  "coorg": "coorg",
  "darajling": "darjeeling",
  "darjeeling": "darjeeling",
  "goa": "goa",
  "gokarna beach": "gokarna",
  "gokarna": "gokarna",
  "gujrat": "gujarat",
  "gujarat": "gujarat",
  "hampi": "hampi",
  "kanyakumari": "kanyakumari",
  "kashmir": "kashmir",
  "kerala": "kerala",
  "khajuraho": "khajuraho",
  "kodaikanal": "kodaikanal",
  "leh ladakh": "ladakh",
  "ladakh": "ladakh",
  "manali": "manali",
  "meghalaya": "meghalaya",
  "munnar": "munnar",
  "mysore": "mysore",
  "nanital": "nainital",
  "nainital": "nainital",
  "ooty": "ooty",
  "pondicherry": "pondicherry",
  "rajasthan": "rajasthan",
  "rameswaram": "rameswaram",
  "skkimm": "sikkim",
  "sikkim": "sikkim",
  "taj mahal": "taj-mahal",
  "varanasi": "varanasi",
  "wayanad": "wayanad",
};

const cleanFileName = (value) =>
  value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

const emptyDir = (dir) => {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
};

const syncDestinationImages = async () => {
  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Source image folder not found: ${sourceRoot}`);
  }

  emptyDir(publicRoot);

  const imageMap = new Map();
  const sourceFolders = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const folder of sourceFolders) {
    const destinationId = folderToDestinationId[folder.name.toLowerCase()];
    if (!destinationId) {
      console.warn(`Skipped unknown folder: ${folder.name}`);
      continue;
    }

    const sourceDir = path.join(sourceRoot, folder.name);
    const targetDir = path.join(publicRoot, destinationId);
    fs.mkdirSync(targetDir, { recursive: true });

    const files = fs
      .readdirSync(sourceDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));

    const paths = [];

    for (const [index, file] of files.entries()) {
      const baseName = cleanFileName(file.name) || `image-${index + 1}`;
      const targetName = `${String(index + 1).padStart(2, "0")}-${baseName}.webp`;
      const sourcePath = path.join(sourceDir, file.name);
      const targetPath = path.join(targetDir, targetName);

      await sharp(sourcePath)
        .rotate()
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality })
        .toFile(targetPath);

      paths.push(`/destinations/${destinationId}/${targetName}`);
    }

    imageMap.set(destinationId, paths);
  }

  return imageMap;
};

const updateDestinations = async (imageMap) => {
  const moduleUrl = `${pathToFileURL(dataFile).href}?t=${Date.now()}`;
  const { destinations } = await import(moduleUrl);
  const updatedDestinations = destinations.map((destination) => ({
    ...destination,
    images: imageMap.get(destination.id) || destination.images,
  }));

  fs.writeFileSync(
    dataFile,
    `export const destinations = ${JSON.stringify(updatedDestinations, null, 2)};\n`,
    "utf8",
  );
};

const imageMap = await syncDestinationImages();
await updateDestinations(imageMap);

const totalImages = [...imageMap.values()].reduce((total, images) => total + images.length, 0);
console.log(
  `Synced ${totalImages} optimized WebP images across ${imageMap.size} destinations at ${maxWidth}px/q${quality}.`,
);
