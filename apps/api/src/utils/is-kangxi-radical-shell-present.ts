const KANGXI_RADICAL_SHELL = "\u{2F99}";

export function isKangxiRadicalShellPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SHELL);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalShellPresent(input);
}

export default isKangxiRadicalShellPresent;
