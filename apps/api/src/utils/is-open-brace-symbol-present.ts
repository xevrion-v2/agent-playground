/**
 * Returns whether `value` contains the open-brace symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isOpenBraceSymbolPresent(value: string): boolean {
  return value.includes("{");
}
