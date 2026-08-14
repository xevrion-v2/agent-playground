// Slugify utility - Converts strings to URL-friendly slugs
// Bounty issue: self-created from xevrion-v2/agent-playground #33

/**
 * Converts a string into a URL-friendly slug.
 *
 * Features:
 * - Converts to lowercase
 * - Replaces spaces and underscores with hyphens
 * - Removes non-alphanumeric characters (except hyphens)
 * - Trims leading/trailing hyphens
 * - Collapses multiple hyphens into one
 *
 * @param {string} str - The string to slugify
 * @returns {string} The URL-friendly slug
 *
 * @example
 * slugify('Hello World')           // => 'hello-world'
 * slugify('  Hello   World  ')     // => 'hello-world'
 * slugify('Hello_World')           // => 'hello-world'
 * slugify('Hello - World')         // => 'hello-world'
 * slugify('Hello! World?')         // => 'hello-world'
 * slugify('浣犲ソ World')             // => 'world'
 * slugify('')                       // => ''
 * slugify(null)                     // => ''
 */
function slugify(str) {
  if (str == null || typeof str !== 'string') {
    return '';
  }

  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')     // Replace spaces/underscores with hyphens
    .replace(/[^a-z0-9-]/g, '')  // Remove non-alphanumeric chars (except hyphens)
    .replace(/-+/g, '-')         // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '');    // Trim leading/trailing hyphens
}

module.exports = { slugify };
