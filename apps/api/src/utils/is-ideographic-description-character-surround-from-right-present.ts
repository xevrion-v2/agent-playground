export function isIdeographicDescriptionCharacterSurroundFromRightPresent(input: string): boolean {
  return input.includes("\u{2FFC}");
}
