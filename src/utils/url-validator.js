function toHttpUrl(value) {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function isValidUrl(value) {
  return toHttpUrl(value) !== null;
}

function extractDomain(value) {
  const url = toHttpUrl(value);
  return url ? url.hostname : "";
}

function isHttps(value) {
  const url = toHttpUrl(value);
  return url ? url.protocol === "https:" : false;
}

module.exports = { extractDomain, isHttps, isValidUrl };
