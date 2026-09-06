const RIGHT_TO_LEFT_ISOLATE = "\u2067";

export function isRightToLeftIsolatePresent(input: string): boolean {
  return input.includes(RIGHT_TO_LEFT_ISOLATE);
}
