/**
 * Returns whether `value` contains the close-bracket symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isCloseBracketSymbolPresent(value: string): boolean {
  return value.includes("]");
}
