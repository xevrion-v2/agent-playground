function normalizeUrl(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return new URL(trimmed);
  } catch {
    return null;
  }
}

function isHttpUrl(url) {
  return url.protocol === "http:" || url.protocol === "https:";
}

function isValidUrl(value) {
  const url = normalizeUrl(value);
  return Boolean(url && url.hostname && isHttpUrl(url));
}

function extractDomain(value) {
  const url = normalizeUrl(value);
  if (!url || !url.hostname) {
    return null;
  }

  return url.hostname.toLowerCase().replace(/\.$/, "");
}

function isHttps(value) {
  const url = normalizeUrl(value);
  return Boolean(url && url.protocol === "https:");
}

module.exports = {
  isValidUrl,
  extractDomain,
  isHttps,
};
