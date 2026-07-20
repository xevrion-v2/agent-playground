export function isKatakanaHiraganaProlongedSoundMarkPresent(input: string): boolean {
  return input.includes("\u30fc");
}
