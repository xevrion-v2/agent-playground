/**
 * Returns whether `value` contains the percent-sign symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isPercentSignSymbolPresent(value: string): boolean {
  return value.includes("%");
}
