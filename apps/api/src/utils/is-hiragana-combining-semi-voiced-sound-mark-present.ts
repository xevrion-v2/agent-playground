/**
 * Checks whether the input string contains the Unicode character U+309A.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isHiraganaCombiningSemiVoicedSoundMarkPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12442));
}
