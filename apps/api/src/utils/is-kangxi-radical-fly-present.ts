const KANGXI_RADICAL_FLY = "\u2fb6";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_FLY);
}
