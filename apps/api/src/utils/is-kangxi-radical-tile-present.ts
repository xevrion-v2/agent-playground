const KANGXI_RADICAL_TILE = "\u2f61";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_TILE);
}
