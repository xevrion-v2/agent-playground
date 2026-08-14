const LEFT_TO_RIGHT_MARK = "\u200e";

export function isLeftToRightMarkPresent(input: string): boolean {
  return input.includes(LEFT_TO_RIGHT_MARK);
}
