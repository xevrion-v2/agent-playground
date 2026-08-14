export function isIdeographicDescriptionCharacterSurroundFromLowerRightPresent(input: string): boolean {
  return input.includes("\u{2FFD}");
}
