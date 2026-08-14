const OVERLINE = "\u203e";

export function isOverlinePresent(input: string): boolean {
  return input.includes(OVERLINE);
}
