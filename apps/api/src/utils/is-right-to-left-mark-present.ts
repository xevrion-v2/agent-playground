const RIGHT_TO_LEFT_MARK = "\u200f";

export function isRightToLeftMarkPresent(input: string): boolean {
  return input.includes(RIGHT_TO_LEFT_MARK);
}
