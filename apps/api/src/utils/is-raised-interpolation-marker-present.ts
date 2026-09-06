const RAISED_INTERPOLATION_MARKER = "\u2e06";

export function isRaisedInterpolationMarkerPresent(input: string): boolean {
  return input.includes(RAISED_INTERPOLATION_MARKER);
}
