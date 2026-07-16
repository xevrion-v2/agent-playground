export function isPostalMarkPresent(input: string): boolean {
  return input.includes("\u{3012}");
}
