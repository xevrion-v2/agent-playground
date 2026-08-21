/**
 * Returns whether `value` contains the tilde symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isTildeSymbolPresent(value: string): boolean {
  return value.includes("~");
}
