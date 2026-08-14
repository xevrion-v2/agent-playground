/**
 * Checks whether the input string contains the Unicode character U+2048.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isQuestionExclamationMarkPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8264));
}
