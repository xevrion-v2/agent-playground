/**
 * Checks if a string contains at least one ASCII letter (a–z, A–Z).
 * @param value - The string to check.
 * @returns true if the string contains any ASCII alphabetic character.
 */
export function hasAsciiLetter(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      return true;
    }
  }
  return false;
}
