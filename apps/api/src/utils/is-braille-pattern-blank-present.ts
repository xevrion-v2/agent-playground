export function isBraillePatternBlankPresent(input: string): boolean {
  return input.includes("\u{2800}");
}
