/**
 * Returns true when the value contains Unicode Right Square Bracket With Double Stroke (U+2E58).
 */
export function isRightSquareBracketWithDoubleStrokePresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e58");
}
