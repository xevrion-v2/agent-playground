const COMMERCIAL_MINUS_SIGN = "\u2052";

export function isCommercialMinusSignPresent(input: string): boolean {
  return input.includes(COMMERCIAL_MINUS_SIGN);
}
