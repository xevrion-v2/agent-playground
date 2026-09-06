export function isIdeographicDescriptionCharacterLeftToRightPresent(input: string): boolean {
  return input.includes("\u{2FF0}");
}
