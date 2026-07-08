/**
 * Returns true when the value contains Unicode Oblique Hyphen (U+2E5D).
 */
export function isObliqueHyphenPresent(input: string): boolean {
  if (typeof input !== "string") {
    return false;
  }

  return input.includes("\u2e5d");
}
