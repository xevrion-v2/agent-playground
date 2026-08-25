/**
 * Checks if the given string contains the '[' symbol.
 * @param value - The string to check.
 * @returns true if the string contains '[', false otherwise.
 */
export function isOpenBracketSymbolPresent(value: string): boolean {
  return value.includes('[');
}
