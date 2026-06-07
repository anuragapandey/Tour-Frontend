import { destinations } from "./src/data/destinations.js";

const urls = destinations.flatMap((d) => d.images || []);
const duplicates = urls.filter((item, index) => urls.indexOf(item) !== index);

console.log("Total URLs:", urls.length);
console.log("Unique URLs:", new Set(urls).size);
console.log("Duplicate Count:", duplicates.length);
console.log("Duplicate URLs:", [...new Set(duplicates)]);
