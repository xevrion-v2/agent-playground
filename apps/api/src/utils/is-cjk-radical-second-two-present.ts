/**
 * Returns true when the value contains Unicode CJK Radical Second Two (U+2E83).
 */
export function isCjkRadicalSecondTwoPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e83");
}
