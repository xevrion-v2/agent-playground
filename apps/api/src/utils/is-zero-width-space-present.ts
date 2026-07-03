export function isZeroWidthSpacePresent(value: string): boolean {
  return value.includes("\u200B");
}
