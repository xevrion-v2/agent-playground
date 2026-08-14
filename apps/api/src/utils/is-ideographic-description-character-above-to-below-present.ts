export function isIdeographicDescriptionCharacterAboveToBelowPresent(input: string): boolean {
  return input.includes("\u{2FF1}");
}
