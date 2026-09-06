/**
 * Returns whether `value` contains the plus symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isPlusSymbolPresent(value: string): boolean {
  return value.includes("+");
}
