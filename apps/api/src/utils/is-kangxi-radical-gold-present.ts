const KANGXI_RADICAL_GOLD = "\u2fa6";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_GOLD);
}
