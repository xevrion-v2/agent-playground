/**
 * Returns whether `value` contains the double-quote symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isDoubleQuoteSymbolPresent(value: string): boolean {
  return value.includes('"');
}
