export function isIdeographicCommaPresent(input: string): boolean {
  return input.includes("\u{3001}");
}
