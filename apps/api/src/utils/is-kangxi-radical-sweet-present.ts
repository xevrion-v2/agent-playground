const KANGXI_RADICAL_SWEET = "\u2f62";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SWEET);
}
