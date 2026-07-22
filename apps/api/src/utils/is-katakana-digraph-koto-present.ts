export function isKatakanaDigraphKotoPresent(input: string): boolean {
  return input.includes("\u30ff");
}
