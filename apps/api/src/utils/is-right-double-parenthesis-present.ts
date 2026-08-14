const RIGHT_DOUBLE_PARENTHESIS = "\u2e29";

export function isRightDoubleParenthesisPresent(input: string): boolean {
  return input.includes(RIGHT_DOUBLE_PARENTHESIS);
}
