export function isCjkRadicalMeatPresent(input: string): boolean {
  return input.includes("\u{2EBC}");
}
