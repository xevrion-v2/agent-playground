/**
 * Returns true when the value contains Unicode Triple Dagger (U+2E4B).
 */
export function isTripleDaggerPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e4b");
}
