/**
 * Returns whether `value` contains the hash symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isHashSymbolPresent(value: string): boolean {
  return value.includes("#");
}
