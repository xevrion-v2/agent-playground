const DOUBLE_STACKED_COMMA = "\u2e49";

export function isDoubleStackedCommaPresent(input: string): boolean {
  return input.includes(DOUBLE_STACKED_COMMA);
}
