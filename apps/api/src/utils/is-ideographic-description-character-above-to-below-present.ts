export function isIdeographicDescriptionCharacterAboveToBelowPresent(
  input: string,
): boolean {
  return input.includes("\u2ff1");
}
