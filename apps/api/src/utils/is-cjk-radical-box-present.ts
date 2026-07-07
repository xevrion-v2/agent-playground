/**
 * Returns true when the value contains Unicode CJK Radical Box (U+2E86).
 */
export function isCjkRadicalBoxPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e86");
}
