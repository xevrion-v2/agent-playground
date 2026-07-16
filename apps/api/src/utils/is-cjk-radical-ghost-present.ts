export function isCjkRadicalGhostPresent(input: string): boolean {
  return input.includes("\u{2EE4}");
}
