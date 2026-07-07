/**
 * Returns true when the value contains Unicode CJK Radical Knife One (U+2E88).
 */
export function isCjkRadicalKnifeOnePresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e88");
}
