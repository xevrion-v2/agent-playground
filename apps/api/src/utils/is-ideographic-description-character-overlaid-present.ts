export function isIdeographicDescriptionCharacterOverlaidPresent(input: string): boolean {
  return input.includes("\u{2FFB}");
}
