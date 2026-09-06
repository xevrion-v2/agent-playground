const KANGXI_RADICAL_SOUND = "\u2fb3";

export function $fn(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SOUND);
}
