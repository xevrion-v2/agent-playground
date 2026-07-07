const TWO_EM_DASH = "\u2e3a";

export function isTwoEmDashPresent(input: string): boolean {
  return input.includes(TWO_EM_DASH);
}
