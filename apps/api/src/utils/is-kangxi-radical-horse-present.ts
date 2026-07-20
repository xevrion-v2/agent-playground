const KANGXI_RADICAL_HORSE = "\u2fba";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_HORSE);
}
