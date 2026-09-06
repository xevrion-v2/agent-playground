/**
 * Returns whether `value` contains the underscore symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isUnderscoreSymbolPresent(value: string): boolean {
  return value.includes("_");
}
