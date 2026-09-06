const INVISIBLE_OPERATOR = "\u2062";

export function isInvisibleOperatorPresent(input: string): boolean {
  return input.includes(INVISIBLE_OPERATOR);
}
