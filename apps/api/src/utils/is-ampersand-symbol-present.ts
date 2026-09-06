/**
 * Returns whether `value` contains the ampersand symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isAmpersandSymbolPresent(value: string): boolean {
  return value.includes("&");
}
