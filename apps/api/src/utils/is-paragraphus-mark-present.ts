/**
 * Returns true when the value contains Unicode Paragraphus Mark (U+2E4D).
 */
export function isParagraphusMarkPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e4d");
}
