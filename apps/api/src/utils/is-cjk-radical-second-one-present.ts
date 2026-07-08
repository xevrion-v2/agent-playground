/**
 * Returns true when the value contains Unicode CJK Radical Second One (U+2E82).
 */
export function isCjkRadicalSecondOnePresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e82");
}
