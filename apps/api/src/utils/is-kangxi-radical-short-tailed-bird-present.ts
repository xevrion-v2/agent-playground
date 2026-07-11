const KANGXI_RADICAL_SHORT_TAILED_BIRD = "\u2fab";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SHORT_TAILED_BIRD);
}
