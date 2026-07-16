export function isCjkRadicalRepeatPresent(input: string): boolean {
  return input.includes("\u{2E80}");
}
