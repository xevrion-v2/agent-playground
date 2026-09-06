/**
 * Checks whether the input string contains the Unicode character U+2052.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCommercialMinusSignPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8274));
}
