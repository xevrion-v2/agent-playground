/**
 * Returns whether `value` contains the colon symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isColonSymbolPresent(value: string): boolean {
  return value.includes(":");
}
