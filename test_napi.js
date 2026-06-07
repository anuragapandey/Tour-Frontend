// Use global fetch

async function testNapi() {
  const query = "munnar";
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", response.status);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      console.log(`Found ${data.results.length} photos for ${query}:`);
      data.results.forEach((photo, idx) => {
        console.log(`  [${idx}] ID: ${photo.id} - URL: ${photo.urls.regular}`);
      });
    } else {
      console.log("No results found in data:", data);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testNapi();
