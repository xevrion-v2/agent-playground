/**
 * Returns true when the value contains Unicode Medieval Comma (U+2E4C).
 */
export function isMedievalCommaPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e4c");
}
