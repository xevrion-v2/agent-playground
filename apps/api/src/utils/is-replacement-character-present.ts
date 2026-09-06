export function isReplacementCharacterPresent(input: string): boolean {
  return input.includes("\u{FFFD}");
}
