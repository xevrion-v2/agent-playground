/**
 * Capitalizes word starts in a string.
 * @param str - The string to title case.
 * @returns String with each word capitalized.
 */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}