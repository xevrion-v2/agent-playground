const KANGXI_RADICAL_FACE = "\u2faf";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_FACE);
}
