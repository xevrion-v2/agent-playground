/**
 * Returns whether `value` contains the tab symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isTabSymbolPresent(value: string): boolean {
  return value.includes("	");
}
