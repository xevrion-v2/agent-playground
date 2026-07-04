const LEFT_TO_RIGHT_OVERRIDE = "\u202d";

export function isLeftToRightOverridePresent(input: string): boolean {
  return input.includes(LEFT_TO_RIGHT_OVERRIDE);
}
