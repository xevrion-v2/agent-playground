/**
 * Returns true when the value contains Unicode CJK Radical Cliff (U+2E81).
 */
export function isCjkRadicalCliffPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e81");
}
