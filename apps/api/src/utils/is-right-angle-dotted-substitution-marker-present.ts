const RIGHT_ANGLE_DOTTED_SUBSTITUTION_MARKER = "\u2e01";

export function isRightAngleDottedSubstitutionMarkerPresent(input: string): boolean {
  return input.includes(RIGHT_ANGLE_DOTTED_SUBSTITUTION_MARKER);
}
