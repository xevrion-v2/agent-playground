/**
 * Returns whether `value` contains the open-bracket symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isOpenBracketSymbolPresent(value: string): boolean {
  return value.includes("[");
}
