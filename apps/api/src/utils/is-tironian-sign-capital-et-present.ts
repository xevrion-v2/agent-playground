/**
 * Returns true when the value contains Unicode Tironian Sign Capital Et (U+2E52).
 */
export function isTironianSignCapitalEtPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e52");
}
