/**
 * Returns whether `value` contains the semicolon symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isSemicolonSymbolPresent(value: string): boolean {
  return value.includes(";");
}
