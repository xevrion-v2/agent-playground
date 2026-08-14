export function isCjkRadicalThreadPresent(input: string): boolean {
  return input.includes("\u{2E93}");
}
