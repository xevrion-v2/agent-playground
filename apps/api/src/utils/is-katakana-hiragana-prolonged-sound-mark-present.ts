export function isKatakanaHiraganaProlongedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{30FC}");
}
