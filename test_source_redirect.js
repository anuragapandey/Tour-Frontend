async function testSource() {
  const url = "https://source.unsplash.com/featured/1200x800/?kerala";
  try {
    const res = await fetch(url, { redirect: "follow" });
    console.log("Status:", res.status);
    console.log("Final URL:", res.url);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
testSource();
