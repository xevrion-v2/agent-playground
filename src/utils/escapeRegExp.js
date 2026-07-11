/**
 * Escapes special characters in a string so it can be safely used
 * as a literal pattern in a RegExp.
 *
 * Example:
 *   const pattern = escapeRegExp('hello.world[1]');
 *   // Returns: 'hello\\.world\\[1\\]'
 *
 * @param {string} str - The string to escape
 * @returns {string} The escaped string safe for use in RegExp
 */
function escapeRegExp(str) {
  if (typeof str !== 'string') {
    throw new TypeError('str must be a string');
  }

  // Escape all special regex characters: . * + ? ^ $ { } ( ) [ ] \ |
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { escapeRegExp };
