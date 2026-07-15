export function isCjkRadicalMortarPresent(input: string): boolean {
  return input.includes("\u{2EBD}");
}
