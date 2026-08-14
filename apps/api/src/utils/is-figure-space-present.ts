const FIGURE_SPACE = "\u2007";

export function isFigureSpacePresent(value: string): boolean {
  return value.includes(FIGURE_SPACE);
}
