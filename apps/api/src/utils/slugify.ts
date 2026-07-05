/**
 * Converts a string into a URL-friendly slug.
 * Replaces spaces and underscores with hyphens, removes special characters,
 * converts to lowercase, and handles empty or non-string inputs gracefully.
 *
 * @param {any} text - The input text to slugify.
 * @returns {string} The URL-friendly slug.
 */
export function slugify(text: any): string {
  if (text === null || text === undefined) {
    return "";
  }

  // Convert non-string inputs to string
  const str = typeof text === "string" ? text : String(text);

  return str
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, "-")
    // Remove all characters except alphanumeric and hyphens
    .replace(/[^a-z0-9-]/g, "")
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/-+/g, "-")
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, "");
}
