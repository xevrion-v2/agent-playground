/**
 * Returns true if the provided string contains at least one carriage return
 * character (`\r`, U+000D).
 */
export function isCarriageReturnSymbolPresent(value: string): boolean {
  return value.includes('\r');
}
