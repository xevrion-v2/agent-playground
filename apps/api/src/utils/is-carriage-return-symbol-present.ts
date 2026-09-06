/**
 * Returns whether `value` contains the carriage-return symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isCarriageReturnSymbolPresent(value: string): boolean {
  return value.includes("\r");
}
