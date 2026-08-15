/**
 * Returns whether `value` contains the equals symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isEqualsSymbolPresent(value: string): boolean {
  return value.includes("=");
}
