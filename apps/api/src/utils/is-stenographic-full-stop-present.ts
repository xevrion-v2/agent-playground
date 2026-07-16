export function isStenographicFullStopPresent(input: string): boolean {
  return input.includes("\u{2E3C}");
}
