const HORIZONTAL_ELLIPSIS = "\u2026";

export function isHorizontalEllipsisPresent(input: string): boolean {
  return input.includes(HORIZONTAL_ELLIPSIS);
}
