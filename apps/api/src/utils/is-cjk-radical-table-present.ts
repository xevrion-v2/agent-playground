/**
 * Returns true when the value contains Unicode CJK Radical Table (U+2E87).
 */
export function isCjkRadicalTablePresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e87");
}
