const LEFT_DOUBLE_PARENTHESIS = "\u2e28";

export function isLeftDoubleParenthesisPresent(input: string): boolean {
  return input.includes(LEFT_DOUBLE_PARENTHESIS);
}
