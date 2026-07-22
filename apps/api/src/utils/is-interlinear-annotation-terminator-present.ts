/**
 * Checks whether the input string contains the Unicode character U+FFFB.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isInterlinearAnnotationTerminatorPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(65531));
}
