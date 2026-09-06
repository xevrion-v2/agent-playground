export function isIdeographicNumberZeroPresent(input: string): boolean {
  return input.includes("\u{3007}");
}
