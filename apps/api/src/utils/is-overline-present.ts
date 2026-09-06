/**
 * Checks whether the input string contains the Unicode character U+203E.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isOverlinePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8254));
}
