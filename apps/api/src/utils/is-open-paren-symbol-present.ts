/**
 * Returns whether `value` contains the open-paren symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isOpenParenSymbolPresent(value: string): boolean {
  return value.includes("(");
}
