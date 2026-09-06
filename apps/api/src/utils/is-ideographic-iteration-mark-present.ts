export function isIdeographicIterationMarkPresent(input: string): boolean {
  return input.includes("\u{3005}");
}
