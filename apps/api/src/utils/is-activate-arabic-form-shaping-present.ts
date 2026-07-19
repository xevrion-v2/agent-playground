/**
 * Checks whether the input string contains the Unicode character U+206D.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isActivateArabicFormShapingPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8301));
}
