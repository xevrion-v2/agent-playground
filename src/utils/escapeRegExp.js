/**
 * Escapes the RegExp special characters in a string.
 *
 * @param {string} text - The input text to escape.
 * @returns {string} The escaped string.
 */
function escapeRegExp(text) {
  if (text === null || text === undefined) {
    return "";
  }

  const str = typeof text === "string" ? text : String(text);

  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = { escapeRegExp };
