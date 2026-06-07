async function testDdg() {
  const query = "site:unsplash.com munnar";
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", response.status);
    const html = await response.text();
    // Regex to find unsplash.com/photos/ links
    const regex = /unsplash\.com\/photos\/([a-zA-Z0-9-]+)/g;
    let match;
    const ids = new Set();
    while ((match = regex.exec(html)) !== null) {
      ids.add(match[1]);
    }
    console.log(`Found ${ids.size} photo IDs on DDG for Munnar:`, [...ids]);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
testDdg();
