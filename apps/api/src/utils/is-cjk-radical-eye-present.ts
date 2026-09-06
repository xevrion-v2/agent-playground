export function isCjkRadicalEyePresent(input: string): boolean {
  return input.includes("\u{2EAB}");
}
