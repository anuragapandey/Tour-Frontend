import { destinations } from "./src/data/destinations.js";

async function checkUrls() {
  console.log("Checking image URLs...");
  let invalidCount = 0;
  for (const dest of destinations) {
    console.log(`Checking ${dest.label}...`);
    for (let i = 0; i < dest.images.length; i++) {
      const url = dest.images[i];
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.status !== 200) {
          console.log(`  [INVALID] Index ${i}: Status ${response.status} - ${url}`);
          invalidCount++;
        }
      } catch (err) {
        console.log(`  [ERROR] Index ${i}: ${err.message} - ${url}`);
        invalidCount++;
      }
    }
  }
  console.log(`Done! Total invalid images found: ${invalidCount}`);
}

checkUrls();
