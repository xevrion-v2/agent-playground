/**
 * Returns whether `value` contains the close-brace symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isCloseBraceSymbolPresent(value: string): boolean {
  return value.includes("}");
}
