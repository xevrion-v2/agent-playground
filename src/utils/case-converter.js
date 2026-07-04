// String case conversion utility
// Bounty issue: self-created from xevrion-v2/agent-playground #33

/**
 * Converts a string to camelCase.
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
  if (typeof str !== 'string' || str.trim() === '') return '';
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (c) => c.toLowerCase());
}

/**
 * Converts a string to snake_case.
 * @param {string} str
 * @returns {string}
 */
function toSnakeCase(str) {
  if (typeof str !== 'string' || str.trim() === '') return '';
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/[-_\s]+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Converts a string to kebab-case.
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
  if (typeof str !== 'string' || str.trim() === '') return '';
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Converts a string to PascalCase.
 * @param {string} str
 * @returns {string}
 */
function toPascalCase(str) {
  if (typeof str !== 'string' || str.trim() === '') return '';
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

module.exports = { toCamelCase, toSnakeCase, toKebabCase, toPascalCase };
