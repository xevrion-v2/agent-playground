/**
 * Returns true when the value contains the space symbol.
 */
export function isSpaceSymbolPresent(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.includes(" ");
}
