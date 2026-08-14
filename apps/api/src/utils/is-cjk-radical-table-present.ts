export function isCjkRadicalTablePresent(input: string): boolean {
  return input.includes("\u{2E87}");
}
