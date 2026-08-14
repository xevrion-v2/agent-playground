export function isCjkRadicalPersonPresent(input: string): boolean {
  return input.includes("\u{2E85}");
}
