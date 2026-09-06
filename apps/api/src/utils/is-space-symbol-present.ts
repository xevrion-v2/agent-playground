/**
 * Returns whether `value` contains the space symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isSpaceSymbolPresent(value: string): boolean {
  return value.includes(" ");
}
