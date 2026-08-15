/**
 * Returns whether `value` contains the backtick symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isBacktickSymbolPresent(value: string): boolean {
  return value.includes("`");
}
