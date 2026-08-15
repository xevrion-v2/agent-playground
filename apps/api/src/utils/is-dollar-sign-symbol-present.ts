/**
 * Returns whether `value` contains the dollar-sign symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isDollarSignSymbolPresent(value: string): boolean {
  return value.includes("$");
}
