/**
 * Converts a string to a URL-friendly slug.
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters (keeps alphanumeric, hyphens, underscores)
 * - Handles null, undefined, and empty input gracefully
 *
 * @param {string|null|undefined} str - The input string to slugify
 * @returns {string} - The slugified string
 */
function slugify(str) {
  if (str == null || str === '') {
    return '';
  }

  return String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^a-z0-9\-_]/g, '') // Remove special characters
    .replace(/-+/g, '-')          // Collapse multiple hyphens
    .replace(/^-|-$/g, '');       // Trim leading/trailing hyphens
}

module.exports = { slugify };
