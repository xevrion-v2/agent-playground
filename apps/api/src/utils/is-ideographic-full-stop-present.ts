export function isIdeographicFullStopPresent(input: string): boolean {
  return input.includes("\u{3002}");
}
