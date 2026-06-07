async function testScrape() {
  const query = "munnar";
  const url = `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", response.status);
    const html = await response.text();
    const regex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9-]+)/g;
    let match;
    const ids = new Set();
    while ((match = regex.exec(html)) !== null) {
      ids.add(match[1]);
    }
    console.log(`Found ${ids.size} photo IDs for ${query}:`, [...ids].slice(0, 10));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testScrape();
