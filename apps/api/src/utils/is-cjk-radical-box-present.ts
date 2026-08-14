export function isCjkRadicalBoxPresent(input: string): boolean {
  return input.includes("\u{2E86}");
}
