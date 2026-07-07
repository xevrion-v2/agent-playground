/**
 * Returns true when the value contains Unicode Medieval Exclamation Mark (U+2E53).
 */
export function isMedievalExclamationMarkPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e53");
}
