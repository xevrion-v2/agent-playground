/**
 * Checks if a string contains a zero digit character.
 * @param value - The string to check.
 * @returns true if the string contains '0', false otherwise.
 */
export function hasZeroDigit(value: string): boolean {
  return value.includes('0');
}
