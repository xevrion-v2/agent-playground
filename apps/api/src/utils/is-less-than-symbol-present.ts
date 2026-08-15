/**
 * Returns whether `value` contains the less-than symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isLessThanSymbolPresent(value: string): boolean {
  return value.includes("<");
}
