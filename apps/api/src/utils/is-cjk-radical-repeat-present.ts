export function isCjkRadicalRepeatPresent(value: string): boolean {
  return value.includes("\u2e80");
}
