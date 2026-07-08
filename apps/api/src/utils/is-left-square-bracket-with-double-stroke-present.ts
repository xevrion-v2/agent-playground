/**
 * Returns true when the value contains Unicode Left Square Bracket With Double Stroke (U+2E57).
 */
export function isLeftSquareBracketWithDoubleStrokePresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e57");
}
