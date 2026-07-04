/**
 * URL validation and parsing utilities.
 * 
 * Exports: isValidUrl, extractDomain, isHttps
 * Handles edge cases (null, empty, invalid inputs)
 */

/**
 * Check if a string is a valid URL.
 * @param {string} str - Input string to validate
 * @returns {boolean} true if valid URL
 */
function isValidUrl(str) {
  if (str == null || typeof str !== 'string') return false;
  if (str.trim().length === 0) return false;
  
  try {
    const url = new URL(str.trim());
    return url.protocol === 'http:' || url.protocol === 'https:' || 
           url.protocol === 'ftp:' || url.protocol === 'ftps:';
  } catch {
    return false;
  }
}

/**
 * Extract the domain from a URL string.
 * @param {string} str - Input URL string
 * @returns {string} Domain name or empty string
 */
function extractDomain(str) {
  if (str == null || typeof str !== 'string') return '';
  if (str.trim().length === 0) return '';
  
  try {
    const url = new URL(str.trim());
    return url.hostname;
  } catch {
    return '';
  }
}

/**
 * Check if a URL uses HTTPS protocol.
 * @param {string} str - Input URL string
 * @returns {boolean} true if HTTPS
 */
function isHttps(str) {
  if (str == null || typeof str !== 'string') return false;
  if (str.trim().length === 0) return false;
  
  try {
    const url = new URL(str.trim());
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

module.exports = { isValidUrl, extractDomain, isHttps };
