const RIGHT_ANGLE_SUBSTITUTION_MARKER = "\u2e00";

export function isRightAngleSubstitutionMarkerPresent(input: string): boolean {
  return input.includes(RIGHT_ANGLE_SUBSTITUTION_MARKER);
}
