const KANGXI_RADICAL_LEEK = "\u2fb2";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_LEEK);
}
