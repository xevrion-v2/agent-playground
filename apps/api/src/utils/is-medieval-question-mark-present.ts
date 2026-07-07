/**
 * Returns true when the value contains Unicode Medieval Question Mark (U+2E54).
 */
export function isMedievalQuestionMarkPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e54");
}
