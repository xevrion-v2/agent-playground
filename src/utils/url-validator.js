// URL validation utility
// Bounty issue: self-created from xevrion-v2/agent-playground #33

/**
 * Validates whether a string is a valid URL.
 *
 * @param {string} str - The string to validate
 * @returns {boolean} Whether the string is a valid URL
 *
 * @example
 * isValidUrl('https://example.com')     // => true
 * isValidUrl('not-a-url')                // => false
 * isValidUrl('')                          // => false
 * isValidUrl(null)                        // => false
 */
function isValidUrl(str) {
  if (typeof str !== 'string' || str.trim() === '') return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts the domain from a URL string.
 *
 * @param {string} str - The URL string
 * @returns {string|null} The domain, or null if invalid
 *
 * @example
 * extractDomain('https://www.example.com/path')  // => 'www.example.com'
 * extractDomain('not-a-url')                       // => null
 */
function extractDomain(str) {
  if (typeof str !== 'string' || str.trim() === '') return null;
  try {
    const url = new URL(str);
    return url.hostname;
  } catch {
    return null;
  }
}

/**
 * Checks if a URL uses HTTPS.
 *
 * @param {string} str - The URL string
 * @returns {boolean|null} Whether URL uses HTTPS, or null if invalid
 *
 * @example
 * isHttps('https://example.com')   // => true
 * isHttps('http://example.com')    // => false
 * isHttps('not-a-url')             // => null
 */
function isHttps(str) {
  if (typeof str !== 'string' || str.trim() === '') return null;
  try {
    const url = new URL(str);
    return url.protocol === 'https:';
  } catch {
    return null;
  }
}

module.exports = { isValidUrl, extractDomain, isHttps };
