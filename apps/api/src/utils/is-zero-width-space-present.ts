export function isZeroWidthSpacePresent(input: string): boolean {
  return input.includes("\u200B");
}
