import { destinations } from "./src/data/destinations_orig.js";

async function checkUrls() {
  console.log("Checking original image URLs...");
  let validUrls = [];
  let invalidCount = 0;
  for (const dest of destinations) {
    for (let i = 0; i < dest.images.length; i++) {
      const url = dest.images[i];
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.status === 200) {
          validUrls.push(url);
        } else {
          invalidCount++;
        }
      } catch (err) {
        invalidCount++;
      }
    }
  }
  console.log(`Original: Valid: ${validUrls.length}, Invalid: ${invalidCount}`);
  console.log("Valid Original URLs sample:", validUrls.slice(0, 15));
}

checkUrls();
