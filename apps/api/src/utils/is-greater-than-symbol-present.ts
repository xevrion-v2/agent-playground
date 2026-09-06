/**
 * Returns whether `value` contains the greater-than symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isGreaterThanSymbolPresent(value: string): boolean {
  return value.includes(">");
}
