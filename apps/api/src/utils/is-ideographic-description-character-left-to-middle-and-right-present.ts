export function isIdeographicDescriptionCharacterLeftToMiddleAndRightPresent(input: string): boolean {
  return input.includes("\u{2FF2}");
}
