const KANGXI_RADICAL_MOUND = "\u2fa9";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_MOUND);
}
