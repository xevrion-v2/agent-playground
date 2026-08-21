/**
 * Returns whether `value` contains the close-paren symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isCloseParenSymbolPresent(value: string): boolean {
  return value.includes(")");
}
