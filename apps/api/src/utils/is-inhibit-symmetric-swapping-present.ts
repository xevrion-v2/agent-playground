/**
 * Checks whether the input string contains the Unicode character U+206A.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isInhibitSymmetricSwappingPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8298));
}
