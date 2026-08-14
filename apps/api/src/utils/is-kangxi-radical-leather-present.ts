const KANGXI_RADICAL_LEATHER = "\u2fb0";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_LEATHER);
}
