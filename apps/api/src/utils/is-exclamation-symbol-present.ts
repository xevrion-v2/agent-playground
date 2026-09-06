/**
 * Returns whether `value` contains the exclamation symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isExclamationSymbolPresent(value: string): boolean {
  return value.includes("!");
}
