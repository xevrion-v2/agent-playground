export function isIdeographicClosingMarkPresent(input: string): boolean {
  return input.includes("\u{3006}");
}
