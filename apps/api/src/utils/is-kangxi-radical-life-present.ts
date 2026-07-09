const KANGXI_RADICAL_LIFE = "\u2f63";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_LIFE);
}
