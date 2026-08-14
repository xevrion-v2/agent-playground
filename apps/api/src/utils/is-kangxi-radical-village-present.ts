const KANGXI_RADICAL_VILLAGE = "\u2fa5";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_VILLAGE);
}
