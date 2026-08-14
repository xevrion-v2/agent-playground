export function isKatakanaDigraphKotoPresent(input: string): boolean {
  return input.includes("\u{30FF}");
}
