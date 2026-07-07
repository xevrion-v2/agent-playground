/**
 * Returns true when the value contains Unicode CJK Radical Knife Two (U+2E89).
 */
export function isCjkRadicalKnifeTwoPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e89");
}
