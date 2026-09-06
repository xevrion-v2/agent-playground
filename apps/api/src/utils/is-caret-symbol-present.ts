/**
 * Returns whether `value` contains the caret symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isCaretSymbolPresent(value: string): boolean {
  return value.includes("^");
}
