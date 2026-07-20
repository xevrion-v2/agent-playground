const KANGXI_RADICAL_FRAGRANT = "\u2fb9";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_FRAGRANT);
}
