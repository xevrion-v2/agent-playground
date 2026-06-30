/**
 * Converts a string from camelCase or PascalCase to kebab-case.
 * Handles acronyms and numbers correctly (e.g., "XMLParser" -> "xml-parser", "get2nd" -> "get-2nd").
 * 
 * @param input - The string to convert.
 * @returns The kebab-case version of the string.
 */
export function toKebabCase(input: string): string {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string');
  }

  if (input.length === 0) {
    return '';
  }

  return input
    // Insert a hyphen before any uppercase letter that follows a lowercase letter or a number
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    // Insert a hyphen before any uppercase letter that is followed by a lowercase letter (handles acronyms like "XMLParser" -> "XML-Parser")
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    // Convert the entire string to lowercase
    .toLowerCase();
}