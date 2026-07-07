/**
 * Returns true when the value contains Unicode Cross Patty With Left Crossbar (U+2E51).
 */
export function isCrossPattyWithLeftCrossbarPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e51");
}
