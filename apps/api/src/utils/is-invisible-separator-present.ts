const INVISIBLE_SEPARATOR = "\u2063";

export function isInvisibleSeparatorPresent(input: string): boolean {
  return input.includes(INVISIBLE_SEPARATOR);
}
