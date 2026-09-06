const DASH_WITH_LEFT_UPTURN = "\u2e43";

export function isDashWithLeftUpturnPresent(input: string): boolean {
  return input.includes(DASH_WITH_LEFT_UPTURN);
}
