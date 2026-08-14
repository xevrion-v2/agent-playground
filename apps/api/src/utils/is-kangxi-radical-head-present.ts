const KANGXI_RADICAL_HEAD = "\u2fb8";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_HEAD);
}
