const IDEOGRAPHIC_DEPARTING_TONE_MARK = "〬";

export function isIdeographicDepartingToneMarkPresent(input: string): boolean {
  return input.includes(IDEOGRAPHIC_DEPARTING_TONE_MARK);
}
