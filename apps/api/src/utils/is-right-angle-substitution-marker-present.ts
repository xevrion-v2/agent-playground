const RIGHT_ANGLE_SUBSTITUTION_MARKER = "\u2e00";

export function $fn(input: string): boolean {
  return input.includes(RIGHT_ANGLE_SUBSTITUTION_MARKER);
}
