/**
 * Returns whether `value` contains the at-sign symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isAtSignSymbolPresent(value: string): boolean {
  return value.includes("@");
}
