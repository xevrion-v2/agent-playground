/**
 * Escapes the RegExp special characters in a string.
 *
 * @param {any} text - The input text to escape.
 * @returns {string} The escaped string.
 */
export function escapeRegExp(text: any): string {
  if (text === null || text === undefined) {
    return "";
  }

  const str = typeof text === "string" ? text : String(text);

  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
