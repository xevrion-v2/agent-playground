/**
 * Checks if a string contains an underscore character.
 * @param value - The string to check.
 * @returns true if the string contains at least one '_' character.
 */
export function hasUnderscore(value: string): boolean {
  return value.includes('_');
}
