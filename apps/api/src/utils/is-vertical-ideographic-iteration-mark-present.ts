export function isVerticalIdeographicIterationMarkPresent(input: string): boolean {
  return input.includes("\u{303B}");
}
