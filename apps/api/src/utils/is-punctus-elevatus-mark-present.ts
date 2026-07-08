/**
 * Returns true when the value contains Unicode Punctus Elevatus Mark (U+2E4E).
 */
export function isPunctusElevatusMarkPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e4e");
}
