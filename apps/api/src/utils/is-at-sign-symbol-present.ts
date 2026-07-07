/**
 * Returns true when the value contains the at sign symbol (@).
 */
export function isAtSignSymbolPresent(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.includes("@");
}
