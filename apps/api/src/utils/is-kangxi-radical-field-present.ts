const KANGXI_RADICAL_FIELD = "\u2f65";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_FIELD);
}
