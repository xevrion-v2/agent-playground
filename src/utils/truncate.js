// String truncation utility - Truncates strings to specified max length with ellipsis
// Bounty issue: #3151 from xevrion-v2/agent-playground

/**
 * Truncates a string to the specified maximum length.
 * When truncation occurs, an ellipsis (or custom suffix) is appended.
 *
 * @param {string} str - The string to truncate
 * @param {number} [maxLength=100] - Maximum length before truncation
 * @param {object} [options] - Optional settings
 * @param {string} [options.ellipsis='...'] - Suffix to append when truncated
 * @returns {string} The truncated string
 *
 * @example
 * truncate('Hello world', 5)           // => 'He...'
 * truncate('Hello world', 20)          // => 'Hello world'
 * truncate('Hello', 5)                  // => 'Hello'
 * truncate('Hello world', 8, '...')     // => 'Hello...'
 * truncate(null)                        // => ''
 * truncate(undefined)                   // => ''
 * truncate('', 10)                      // => ''
 */
function truncate(str, maxLength = 100, options = {}) {
  // Handle null/undefined/non-string
  if (str == null || typeof str !== 'string') {
    return '';
  }

  // Validate maxLength
  if (typeof maxLength !== 'number' || maxLength < 0 || !Number.isFinite(maxLength)) {
    throw new Error('truncate(): maxLength must be a non-negative finite number');
  }

  // Handle empty string or zero maxLength
  if (str === '' || maxLength === 0) {
    return '';
  }

  // Normalize options
  const ellipsis = (options && options.ellipsis != null) ? String(options.ellipsis) : '...';

  // If maxLength is shorter than or equal to the ellipsis, truncation doesn't make sense
  // Just return the ellipsis (or truncated version)
  if (maxLength <= ellipsis.length) {
    return ellipsis.slice(0, maxLength);
  }

  // If the string fits within maxLength, return as-is
  if (str.length <= maxLength) {
    return str;
  }

  // Truncate: keep (maxLength - ellipsis.length) characters, then append ellipsis
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

module.exports = { truncate };
