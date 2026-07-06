const TOP_HALF_SECTION_SIGN = "\u2e39";

export function isTopHalfSectionSignPresent(input: string): boolean {
  return input.includes(TOP_HALF_SECTION_SIGN);
}
