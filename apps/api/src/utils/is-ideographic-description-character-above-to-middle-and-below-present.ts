export function isIdeographicDescriptionCharacterAboveToMiddleAndBelowPresent(input: string): boolean {
  return input.includes("\u{2FF3}");
}
