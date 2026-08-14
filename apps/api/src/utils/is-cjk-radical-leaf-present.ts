export function isCjkRadicalLeafPresent(input: string): boolean {
  return input.includes("\u{2ED9}");
}
