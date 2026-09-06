/**
 * Checks if a string contains a close parenthesis character.
 * @param value - The string to check.
 * @returns true if the string contains ')', false otherwise.
 */
export function hasCloseParenthesisCharacter(value: string): boolean {
  return value.includes(')');
}
