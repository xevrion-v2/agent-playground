/**
 * Returns true when the value contains Unicode Bottom Half Left Parenthesis (U+2E5B).
 */
export function isBottomHalfLeftParenthesisPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e5b");
}
