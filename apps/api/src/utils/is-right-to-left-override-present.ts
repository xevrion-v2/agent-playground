const RIGHT_TO_LEFT_OVERRIDE = "\u202e";

export function isRightToLeftOverridePresent(input: string): boolean {
  return input.includes(RIGHT_TO_LEFT_OVERRIDE);
}
