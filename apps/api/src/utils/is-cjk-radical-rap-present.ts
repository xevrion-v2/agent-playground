export function isCjkRadicalRapPresent(input: string): boolean {
  return input.includes("\u{2E99}");
}
