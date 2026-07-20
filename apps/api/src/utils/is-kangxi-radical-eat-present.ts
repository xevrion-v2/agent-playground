const KANGXI_RADICAL_EAT = "\u2fb7";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_EAT);
}
