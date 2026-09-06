/**
 * Returns whether `value` contains the period symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isPeriodSymbolPresent(value: string): boolean {
  return value.includes(".");
}
