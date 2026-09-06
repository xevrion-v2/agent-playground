const TIRONIAN_SIGN_ET = "\u204a";

export function isTironianSignEtPresent(input: string): boolean {
  return input.includes(TIRONIAN_SIGN_ET);
}
