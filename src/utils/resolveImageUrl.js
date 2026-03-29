const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const invalidHosts = new Set(["localhost", "127.0.0.1", "your-render-backend-url.com"]);

export const resolveImageUrl = (url) => {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const parsedUrl = new URL(url);

      if (invalidHosts.has(parsedUrl.hostname)) {
        return `${apiBaseUrl}${parsedUrl.pathname}`;
      }
    } catch {
      return url;
    }

    return url;
  }

  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${apiBaseUrl}${normalizedPath}`;
};
