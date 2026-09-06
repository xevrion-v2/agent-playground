function isValidUrl(value) {
  if (value == null) return false;
  const text = String(value).trim();
  if (!text) return false;
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function extractDomain(value) {
  if (!isValidUrl(value)) return null;
  return new URL(String(value).trim()).hostname.toLowerCase();
}

function isHttps(value) {
  if (!isValidUrl(value)) return false;
  return new URL(String(value).trim()).protocol === "https:";
}

module.exports = { isValidUrl, extractDomain, isHttps };
