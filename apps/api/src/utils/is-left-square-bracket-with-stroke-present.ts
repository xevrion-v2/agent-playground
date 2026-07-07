/**
 * Returns true when the value contains Unicode Left Square Bracket With Stroke (U+2E55).
 */
export function isLeftSquareBracketWithStrokePresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e55");
}
