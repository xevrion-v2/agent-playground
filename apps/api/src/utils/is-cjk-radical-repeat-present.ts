/**
 * Returns true when the value contains Unicode CJK Radical Repeat (U+2E80).
 */
export function isCjkRadicalRepeatPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e80");
}
