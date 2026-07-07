/**
 * String case converter utilities.
 * 
 * Exports: toCamelCase, toSnakeCase, toKebabCase, toPascalCase
 * Handles edge cases (null, empty strings, non-string inputs)
 */

/**
 * Split a string into words, handling camelCase as well.
 */
function splitWords(str) {
  // First split on non-alphanumeric separators
  let segments = str.trim().split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (segments.length === 0) return [];
  
  // Then split each segment on case boundaries: "helloWorld" -> ["hello", "World"]
  // Also handle sequences of uppercase like "HELLO" -> ["HELLO"]
  const result = [];
  for (const seg of segments) {
    // Split on transitions from lowercase/digit to uppercase
    const parts = seg.split(/(?<=[a-z0-9])(?=[A-Z])/);
    for (const part of parts) {
      // Also split transitions from uppercase to uppercase+lowercase
      // e.g., "HTMLParser" -> ["HTML", "Parser"]
      const subparts = part.split(/(?<=[A-Z])(?=[A-Z][a-z])/);
      for (const sp of subparts) {
        if (sp) result.push(sp);
      }
    }
  }
  return result;
}

/**
 * Convert a string to camelCase.
 * @param {string} str - Input string
 * @returns {string} camelCase string
 */
function toCamelCase(str) {
  if (str == null || typeof str !== 'string') return '';
  if (str.trim().length === 0) return '';
  
  const words = splitWords(str);
  if (words.length === 0) return '';
  
  return words[0].toLowerCase() + words.slice(1).map(
    word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('');
}

/**
 * Convert a string to snake_case.
 * @param {string} str - Input string
 * @returns {string} snake_case string
 */
function toSnakeCase(str) {
  if (str == null || typeof str !== 'string') return '';
  if (str.trim().length === 0) return '';
  
  const words = splitWords(str);
  return words.map(w => w.toLowerCase()).join('_');
}

/**
 * Convert a string to kebab-case.
 * @param {string} str - Input string
 * @returns {string} kebab-case string
 */
function toKebabCase(str) {
  if (str == null || typeof str !== 'string') return '';
  if (str.trim().length === 0) return '';
  
  const words = splitWords(str);
  return words.map(w => w.toLowerCase()).join('-');
}

/**
 * Convert a string to PascalCase.
 * @param {string} str - Input string
 * @returns {string} PascalCase string
 */
function toPascalCase(str) {
  if (str == null || typeof str !== 'string') return '';
  if (str.trim().length === 0) return '';
  
  const words = splitWords(str);
  return words.map(
    word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('');
}

module.exports = { toCamelCase, toSnakeCase, toKebabCase, toPascalCase };
