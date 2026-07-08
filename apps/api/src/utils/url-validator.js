function parseUrl(value) {
  if (value == null) {
    return null;
  }

  const text = String(value).trim();
  if (!text) {
    return null;
  }

  try {
    return new URL(text);
  } catch {
    return null;
  }
}

export function isValidUrl(value) {
  return parseUrl(value) !== null;
}

export function extractDomain(value) {
  const url = parseUrl(value);
  return url ? url.hostname : "";
}

export function isHttps(value) {
  const url = parseUrl(value);
  return url ? url.protocol === "https:" : false;
}

export default {
  isValidUrl,
  extractDomain,
  isHttps,
};
