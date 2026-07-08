/**
 * Returns true when the value contains Unicode Cornish Verse Divider (U+2E4F).
 */
export function isCornishVerseDividerPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e4f");
}
