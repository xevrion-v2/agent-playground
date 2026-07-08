/**
 * Returns true when the value contains Unicode Top Half Right Parenthesis (U+2E5A).
 */
export function isTopHalfRightParenthesisPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e5a");
}
