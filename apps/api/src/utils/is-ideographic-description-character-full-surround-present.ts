export function isIdeographicDescriptionCharacterFullSurroundPresent(input: string): boolean {
  return input.includes("\u{2FF4}");
}
