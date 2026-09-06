const KANGXI_RADICAL_SLAVE = "\u2faa";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SLAVE);
}
