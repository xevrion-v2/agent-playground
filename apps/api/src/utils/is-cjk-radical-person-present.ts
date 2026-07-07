/**
 * Returns true when the value contains Unicode CJK Radical Person (U+2E85).
 */
export function isCjkRadicalPersonPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e85");
}
