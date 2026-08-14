const LEFT_TO_RIGHT_ISOLATE = "\u2066";

export function isLeftToRightIsolatePresent(input: string): boolean {
  return input.includes(LEFT_TO_RIGHT_ISOLATE);
}
