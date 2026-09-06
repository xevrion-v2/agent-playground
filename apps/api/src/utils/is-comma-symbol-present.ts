/**
 * Returns whether `value` contains the comma symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isCommaSymbolPresent(value: string): boolean {
  return value.includes(",");
}
