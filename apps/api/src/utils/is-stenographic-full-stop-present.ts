const STENOGRAPHIC_FULL_STOP = "\u2e3c";

export function isStenographicFullStopPresent(input: string): boolean {
  return input.includes(STENOGRAPHIC_FULL_STOP);
}
