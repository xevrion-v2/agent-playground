/**
 * Returns whether `value` contains the backslash symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isBackslashSymbolPresent(value: string): boolean {
  return value.includes("\\");
}
