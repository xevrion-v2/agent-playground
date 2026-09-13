/**
 * Returns whether `value` contains the forward-slash symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isForwardSlashSymbolPresent(value: string): boolean {
  return value.includes("/");
}
