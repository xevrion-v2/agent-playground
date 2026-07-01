/**
 * Escapes special characters in a string for use in RegExp
 * @param input - The string to escape
 * @returns A string with all RegExp special characters escaped
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}