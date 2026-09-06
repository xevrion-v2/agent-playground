const IDEOGRAPHIC_RISING_TONE_MARK = "\u302B";

export function isIdeographicRisingToneMarkPresent(input: string): boolean {
  return input.includes(IDEOGRAPHIC_RISING_TONE_MARK);
}
