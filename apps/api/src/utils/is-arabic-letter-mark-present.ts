/**
 * Returns true when the value contains Unicode Arabic Letter Mark (U+061C).
 */
export function isArabicLetterMarkPresent(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.includes("\u061c");
}
