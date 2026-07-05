const RAISED_DOTTED_INTERPOLATION_MARKER = "\u2e07";

export function isRaisedDottedInterpolationMarkerPresent(input: string): boolean {
  return input.includes(RAISED_DOTTED_INTERPOLATION_MARKER);
}
