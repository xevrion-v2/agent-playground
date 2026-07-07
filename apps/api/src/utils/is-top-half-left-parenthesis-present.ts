/**
 * Returns true when the value contains Unicode Top Half Left Parenthesis (U+2E59).
 */
export function isTopHalfLeftParenthesisPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e59");
}
