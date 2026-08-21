/**
 * Returns whether `value` contains the pipe symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isPipeSymbolPresent(value: string): boolean {
  return value.includes("|");
}
