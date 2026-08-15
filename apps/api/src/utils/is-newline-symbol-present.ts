/**
 * Returns whether `value` contains the newline symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isNewlineSymbolPresent(value: string): boolean {
  return value.includes("
");
}
